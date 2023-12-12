const Hero = () => {
  return (
    <div className="mx-4 flex flex-col items-center justify-center md:mb-12 md:mr-0 lg:mb-0 lg:w-3/5 ">
      <div className="mb-2 bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text text-center font-chakra text-5xl font-extrabold text-transparent md:w-10/12 md:text-center lg:w-8/12 lg:text-center xl:w-11/12 xl:text-8xl">
        A Bitcoin Mining Marketplace
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row sm:items-center  sm:justify-center">
        <div className="flex flex-col flex-wrap sm:flex-row sm:items-center sm:justify-center">
          <p className="mb-2 flex items-start justify-center text-center font-epilogue text-xl font-normal text-black md:w-8/12 lg:w-4/6 lg:justify-start xl:w-5/6 xl:text-4xl 2xl:w-8/12">
            Rigly is the first auction marketplace for bitcoin mining hashrate
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
