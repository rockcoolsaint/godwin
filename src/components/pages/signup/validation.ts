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

const emailRegex = /^(?!.*\.[^.]+\.(?:ru|af|ir|kp|cu|sy)\b)[^\s@]+@[^\s@]+\.(?!(?:ru|af|ir|kp|cu|sy)\b)[^\s@]+$/i

export const useSignUpSchema = (signUpInfo?: signUpInfo) => {
  const schema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, () => 'Email not valid')
            .matches(emailRegex, () => 'Email not valid')
            .required(() => 'Email required'),
          referral_code: yup.string(),
          mining_pool_username: signUpInfo?.poolAccountOwner ? yup.string().trim() : yup.string(),
          mining_pool_address: yup.string().trim(),
        })
        .required(),
    [signUpInfo?.poolAccountOwner],
  )

  return schema
}
