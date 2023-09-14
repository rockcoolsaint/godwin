import { useMemo } from 'react'
import * as yup from 'yup'

export const useCollectionsFilterSchema = () => {
  const schema = useMemo(
    () =>
      yup
        .object({
          auctionType: yup.string().required(),
          auctionStatus: yup.string().required(),
        })
        .required(),
    [],
  )

  return schema
}
