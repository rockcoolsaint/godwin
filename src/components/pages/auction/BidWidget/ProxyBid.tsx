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
import { useAccountContext } from 'src/providers/AccountProvider'
import { getOrders } from 'src/api/account/getOrders'
import { OrderStatus } from 'src/types'

interface FormInputs {
  bid: number
}

const BidInput = ({ value, onChange, className, ...props }) => {
  const handleIncrement = () => {
    onChange(value + 100)
  }

  const handleDecrement = () => {
    onChange(value - 100)
  }

  return (
    <div className="relative flex">
      <NumericFormat
        {...props}
        className={`${className} pr-8`}
        value={value}
        decimalScale={0}
        onChange={e => {
          onChange(transformCurrencyToNumber(e.target.value))
        }}
      />
      <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-gray-300">
        <button
          type="button"
          onClick={handleIncrement}
          className="flex-1 px-2 hover:bg-gray-100 border-b border-gray-300"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          className="flex-1 px-2 hover:bg-gray-100"
        >
          ▼
        </button>
      </div>
    </div>
  )
}

export default function ProxyBid({
  auction,
  bids,
  current_bid,
  proxy_bid_max,
}: {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
  proxy_bid_max: number
}) {
  const { isSocketReady } = useWebsocketContext()
  const { account, token } = useAccountContext()
  const [loadingPlaceProxyBid, setLoadingPlaceProxyBid] = useState<boolean>(false)
  const [hasValidOrders, setHasValidOrders] = useState<boolean>(false)
  const [checkingOrders, setCheckingOrders] = useState<boolean>(true)

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

  useEffect(() => {
    const checkPastOrders = async () => {
      if (!token || !account) return

      try {
        const orders = await getOrders(token)
        const validStatuses = [
          OrderStatus.PaymentOneComplete,
          OrderStatus.PaymentTwoComplete,
          OrderStatus.DeliveryStarted,
          OrderStatus.DeliveryEnded,
          OrderStatus.EscrowReleased
        ]

        const hasQualifyingOrder = orders.some(order => 
          validStatuses.includes(order.status)
        )

        setHasValidOrders(hasQualifyingOrder || (account.id < 1570))
      } catch (err) {
        console.error('Error checking past orders:', err)
        setHasValidOrders(false)
      } finally {
        setCheckingOrders(false)
      }
    }

    checkPastOrders()
  }, [token, account])

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
    [auction.id, current_bid?.bid, reset, hasValidOrders],
  )

  useEffect(() => {
    setValue('bid', (proxy_bid_max ? proxy_bid_max + 100 : bids[0]?.bid + auction?.proxy_bid_increment) || auction?.starting_bid)
  }, [auction?.proxy_bid_increment, auction?.starting_bid, bids, proxy_bid_max, setValue])

  if (checkingOrders) {
    return <div>Checking eligibility...</div>
  }

  return (
    <>
      <p className="text-base font-semibold text-dark-100">Enter your proxy bid</p>
      <div className="mt-2 flex flex-col">
        <form className="gap-4" onSubmit={handleSubmit(handlePlaceProxyBid)}>
          <Controller
            name="bid"
            control={control}
            render={({ field: { ref, onChange, value, ...rest } }) => {
              return (
                <BidInput
                  decimalScale={0}
                  onChange={onChange}
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
                  value={value}
                  {...rest}
                />
              )
            }}
            rules={{
              required: { value: true, message: 'Bid amount is required' },
              min: {
                value: bids[0]?.bid + 100 || auction.starting_bid,
                message: `Minimum bid is ${
                  Number(bids[0]?.bid + 100).toLocaleString() || Number(auction.starting_bid).toLocaleString()
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
