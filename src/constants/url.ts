interface ProgramUrlProps {
  id: string
}

const Urls = {
  collections: () => `/collections`,
  individuals: () => `/individuals`,
  businesses: () => `/businesses`,
  product: ({ id }: ProgramUrlProps) => `product/${id}`,
  profile: () => `/profile`,
  callback: () => `/callback`,
  payment: () => `/payment`,
  winner_payment: ({ id }: ProgramUrlProps) => `winner_payment/${id}`,
}

export { Urls }
