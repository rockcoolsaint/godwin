import { Chakra_Petch, Epilogue } from 'next/font/google'

export const chakra = Chakra_Petch({
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-chakra',
})

export const epilogue = Epilogue({
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-epilogue',
})
