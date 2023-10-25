import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import ws from 'src/lib/ws'
import { Input } from 'src/core'
import { useWebsocketContext } from 'src/providers/WebsocketProvider'
import { Auction, BidsEntityOrCurrentBid } from 'src/api/auction/types'
import { NumericFormat } from 'react-number-format'
import clsx from 'clsx'
import { transformCurrencyToNumber } from 'src/utils/currency'

interface FormInputs {
  bid: number
}

export default function RegularBid({
  auction,
  bids,
  current_bid,
}: {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
}) {
  const { isSocketReady } = useWebsocketContext()
  const [loadingPlaceBid, setLoadingPlaceBid] = useState<boolean>(false)

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

  const handlePlaceBid: SubmitHandler<FormInputs> = useCallback(
    async value => {
      try {
        setLoadingPlaceBid(true)

        const res: any = await ws.request('place_bid', {
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
        setLoadingPlaceBid(false)
      }
    },
    [auction.id, current_bid?.bid, reset],
  )

  useEffect(() => {
    setValue('bid', bids[0]?.bid + 1000 || auction?.starting_bid)
  }, [auction?.starting_bid, bids, setValue])

  return (
    <>
      <p className="text-base font-semibold text-dark-100">Enter your bid</p>
      <div className="mt-2 flex flex-col">
        <form data-test-id="step-bid-input" className="gap-4" onSubmit={handleSubmit(handlePlaceBid)}>
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
            disabled={loadingPlaceBid || !isSocketReady}
          >
            Place bid
          </button>
        </form>
      </div>
    </>
  )
}
