import { PropsWithChildren } from 'react'

const Hero = ({ children }: PropsWithChildren) => {
  return (
    <section className="mx-4 flex w-full flex-col items-center justify-center md:mb-12 lg:mb-0 lg:w-3/5">
      <div className="w-10/12 bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text text-center font-chakra text-4xl font-extrabold text-transparent sm:mb-2 sm:w-4/12 sm:pb-4 md:w-6/12 md:border-green-500 md:text-center md:text-5xl lg:w-8/12 lg:text-center xl:w-10/12 xl:text-8xl 2xl:w-8/12">
        We're not cloud mining,
      </div>
      <div className="flex w-11/12 flex-col flex-wrap sm:flex-row sm:items-center sm:justify-center md:w-8/12 lg:w-4/6 xl:w-5/6">
        <p className="mb-2 text-center font-epilogue text-sm font-normal text-black lg:text-xl xl:text-4xl 2xl:w-11/12">
          we're a bitcoin mining marketplace.
        </p>
      </div>
      {children}
    </section>
  )
}

export default Hero
