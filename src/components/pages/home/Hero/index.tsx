import { PropsWithChildren } from 'react'

const Hero = ({ children }: PropsWithChildren) => {
  return (
    <section className="mx-4 flex w-full flex-col items-center justify-center md:mb-12 lg:mb-0 lg:w-3/5">
      <div className="mb-2 w-11/12 bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text text-center font-chakra text-4xl font-extrabold text-transparent md:w-10/12 md:text-center md:text-5xl lg:w-8/12 lg:text-center  xl:w-11/12 xl:text-8xl">
        A Bitcoin Mining Marketplace
      </div>
      <div className="mt-4 flex w-11/12 flex-col flex-wrap sm:flex-row sm:items-center sm:justify-center md:w-8/12 lg:w-4/6 xl:w-5/6">
        <p className="mb-2 flex items-start justify-center text-center font-epilogue text-sm font-normal text-black lg:justify-start lg:text-xl xl:text-4xl 2xl:w-11/12">
          Rigly is the first auction marketplace for bitcoin mining hashrate
        </p>
      </div>
      {children}
    </section>
  )
}

export default Hero
