import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'

import ws from 'src/lib/ws'
import { Input } from 'src/core'
import { useWebsocketContext } from 'src/providers/WebsocketProvider'
import { Auction, BidsEntityOrCurrentBid } from 'src/api/auction/types'
import { getAuctionBySlug } from 'src/api/auction/getAuctionBySlug'
import { useAccountContext } from 'src/providers/AccountProvider'

interface FormInputs {
  bid: number
}

const validationSchema = (value = 5000) => {
  if (value <= 5000) {
    value = 5000
  } else {
    value += 1000
  }

  return yup.object().shape({
    bid: yup.number().integer().positive().min(value).required().typeError('bid must be a number'),
  })
}

export default function ProxyBid({
  auction,
  bids,
  current_bid,
  handleSetProxyBid
}: {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
  handleSetProxyBid: any
}) {
  const { isSocketReady } = useWebsocketContext()
  const { account, isLoading } = useAccountContext()
  const [loadingPlaceProxyBid, setLoadingPlaceProxyBid] = useState<boolean>(false)

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema(bids[0]?.bid || auction?.starting_bid)),
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
          amount: value.bid,
        })

        if (res.error) {
          throw new Error(res.error)
        }

        const result = await getAuctionBySlug(auction.slug)
        const proxy = result.proxy_bid.find((bid) => account?.id === bid.account.id)
        handleSetProxyBid(proxy)
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
    setValue('bid', bids[0]?.bid + 1000 || auction?.starting_bid)
  }, [auction?.starting_bid, bids, setValue])

  return (
    <>
      <p className="text-base font-semibold text-dark-100">Enter your proxy bid</p>
      <div className="mt-2 flex flex-col">
        <form className="gap-4" onSubmit={handleSubmit(handlePlaceProxyBid)}>
          <Input
            id="bid"
            defaultValue={bids[0]?.bid + 1000 || auction.starting_bid}
            errorMessage={errors.bid?.message}
            placeholder="Proxy bid amount"
            {...register('bid')}
          />
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
