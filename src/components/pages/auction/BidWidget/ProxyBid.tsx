import { useCallback, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ws from 'src/lib/ws'
import { Input } from 'src/core'
import { useWebsocketContext } from 'src/providers/WebsocketProvider'
import { Auction, BidsEntityOrCurrentBid } from 'src/api/auction/types'
import { transformCurrencyToNumber } from 'src/utils/currency'
import { NumericFormat } from 'react-number-format'
import clsx from 'clsx'

interface FormInputs {
  bid: number
}

export default function ProxyBid({
  auction,
  bids,
  current_bid,
}: {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
}) {
  const { isSocketReady } = useWebsocketContext()
  const [loadingPlaceProxyBid, setLoadingPlaceProxyBid] = useState<boolean>(false)

  const {
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormInputs>({
    defaultValues: {
      bid: bids[0]?.bid || auction?.starting_bid,
    },
  })

  const handlePlaceProxyBid: SubmitHandler<FormInputs> = useCallback(
    async value => {
      try {
        setLoadingPlaceProxyBid(true)

        const res: any = await ws.request('place_proxy_bid', {
          auction_id: auction.id,
          amount: transformCurrencyToNumber(value.bid),
        })

        if (res.error) {
          throw new Error(res.error)
        }

        reset({ bid: current_bid?.bid }, { keepTouched: false, keepDirty: false })
        toast.success(res.message)
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setLoadingPlaceProxyBid(false)
      }
    },
    [auction.id, current_bid?.bid, reset],
  )

  useEffect(() => {
    setValue('bid', bids[0]?.bid + auction?.proxy_bid_threshold || auction?.starting_bid)
  }, [auction?.proxy_bid_threshold, auction?.starting_bid, bids, setValue])

  return (
    <>
      <p className="text-base font-semibold text-dark-100">Enter your proxy bid</p>
      <div className="mt-2 flex flex-col">
        <form className="gap-4" onSubmit={handleSubmit(handlePlaceProxyBid)}>
          <Controller
            name="bid"
            control={control}
            render={({ field: { ref, onChange, ...rest } }) => {
              return (
                <NumericFormat
                  decimalScale={0}
                  onChange={e => {
                    onChange(() => setValue('bid', transformCurrencyToNumber(e.target.value)))
                  }}
                  style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                  className={clsx(
                    errors.bid
                      ? 'rounded-lg border border-error outline-none focus:border-none focus:border-error focus:ring-0'
                      : 'rounded-lg border border-gray-500',
                  )}
                  getInputRef={ref}
                  suffix=" Sats"
                  thousandSeparator={true}
                  allowNegative={false}
                  customInput={Input}
                  {...rest}
                />
              )
            }}
            rules={{
              required: { value: true, message: 'Bid amount is required' },
              min: {
                value: bids[0]?.bid + 1000 || auction.starting_bid,
                message: `Minimum bid is ${
                  Number(bids[0]?.bid + 1000).toLocaleString() || Number(auction.starting_bid).toLocaleString()
                } sats`,
              },
            }}
          />
          {!!errors && (
            <span className="line-clamp-2 translate-y-2 text-sm text-error transition-opacity">{errors.bid?.message as string}</span>
          )}
          <button
            className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
            type="submit"
            disabled={loadingPlaceProxyBid || !isSocketReady}
          >
            Place proxy bid
          </button>
        </form>
      </div>
    </>
  )
}
