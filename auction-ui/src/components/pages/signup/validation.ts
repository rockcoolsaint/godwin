import { useMemo } from 'react'
import * as yup from 'yup'

interface signUpInfo {
  email: string
  mining_pool_address: string
  mining_pool_username: string
  referral_code: string
  poolAccountOwner: boolean
  create_pool_account: boolean
}

export const useSignUpSchema = (signUpInfo?: signUpInfo) => {
  const schema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, () => 'Email not valid')
            .required(() => 'Email required'),
          refferal_code: yup.string(),
          mining_pool_username: signUpInfo?.poolAccountOwner
            ? yup
                .string()
                .trim()
                .required(() => 'Mining pool username is required')
            : yup
                .string()
                .nullable()
                .transform((curr, orig) => (orig === '' ? null : curr)),
          mining_pool_address: yup
            .string()
            .trim()
            .required(() => 'Mining pool address is required'),
        })
        .required(),
    [signUpInfo?.poolAccountOwner],
  )

  return schema
}
