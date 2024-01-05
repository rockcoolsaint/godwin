import Warp from 'src/assets/svg/warp.svg'

const Hero = () => {
  return (
    <section className="mx-4 flex w-full flex-col items-center justify-center md:mb-12 lg:mb-0 lg:w-3/5">
      <div className="mb-2 w-11/12 bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text text-center font-chakra text-4xl font-extrabold text-transparent md:w-10/12 md:text-center md:text-5xl lg:w-8/12 lg:text-center  xl:w-11/12 xl:text-8xl">
        A Bitcoin Mining Marketplace
      </div>
      <div className="mt-4 flex w-11/12 flex-col flex-wrap sm:flex-row sm:items-center sm:justify-center md:w-8/12 lg:w-4/6 xl:w-5/6">
        <p className="mb-2 flex items-start justify-center text-center font-epilogue text-sm font-normal text-black lg:justify-start lg:text-xl xl:text-4xl 2xl:w-8/12">
          Rigly is the first auction marketplace for bitcoin mining hashrate
        </p>
      </div>
      <div className="mb-20 mt-6 flex w-full flex-col items-center justify-center font-chakra font-bold sm:flex-row lg:mt-12">
        <button
          type="submit"
          className="mb-5 flex w-11/12 items-center justify-center rounded-full bg-hero-gradient px-5 py-4 text-sm text-white outline-none hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:mb-0 lg:h-20 lg:w-9/12 lg:text-3xl xl:w-6/12"
        >
          Try it out
        </button>
        <button
          type="submit"
          className="flex w-11/12 items-center justify-center rounded-full bg-gradient px-5 py-4 text-sm text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:ml-16 lg:h-20 lg:w-9/12 lg:text-3xl xl:w-6/12"
        >
          Buy Hashrate
        </button>
      </div>

      <Warp />

      <div className="mt-8 w-7/12 bg-clip-text text-center font-chakra text-2xl font-extrabold leading-10 text-navy md:w-10/12 md:text-center lg:w-8/12 lg:text-center lg:text-5xl xl:w-11/12 xl:text-7xl">
        Trustless bitcoin mining for <span className="text-primary">everyone</span>
      </div>
    </section>
  )
}

export default Hero
