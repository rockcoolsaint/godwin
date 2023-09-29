import { useMemo } from 'react'
import * as yup from 'yup'

export const useCollectionsFilterSchema = () => {
  const schema = useMemo(
    () =>
      yup
        .object({
          auctionType: yup.string().oneOf(['immediate_delivery', 'forward_date', 'upfront_payment']).required(),
          auctionStatus: yup.string().oneOf(['scheduled', 'active', 'completed']).required(),
          sortBy: yup.string().oneOf(['epoch', 'created_at', 'hashrate', 'time_remaining', 'highest_bid', 'going_hashprice']).required(),
        })
        .required(),
    [],
  )

  return schema
}
