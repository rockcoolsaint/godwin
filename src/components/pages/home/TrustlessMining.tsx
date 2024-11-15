import Image from 'next/image'
import box1Image from 'src/assets/png/box1.png'
import box2Image from 'src/assets/png/box2.png'
import box3Image from 'src/assets/png/box3.png'

const TrustlessMining: React.FC = () => {
  const boxes = [
    {
      text: "Mining farms get 50% payment upfront and 50% after hashrate delivery",
      image: box1Image
    },
    {
      text: "The 2:2 escrow address is shown in the auction profile",
      image: box2Image
    },
    {
      text: "High value auctions support 2:3 multisig. Funds released after you sign",
      image: box3Image
    }
  ];

  return (
<section className="w-full py-9 flex flex-col items-center justify-center px-3 md:px-0">
  <div className="w-8/12 bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text text-center font-chakra text-3xl font-extrabold text-transparent sm:mb-1.5 sm:w-3/12 sm:pb-3 md:w-4/12 md:text-4xl lg:w-6/12 lg:text-center xl:w-8/12 xl:text-7xl 2xl:w-6/12">
    Don't trust, verify.
  </div>
      
      <p className="mt-6 text-center text-xl text-navy md:w-8/12 lg:w-6/12 font-epilogue">
        The root problem with conventional hosted mining is all the trust that's required to make it work. This trust leads to rug pulls.
      </p>

      <p className="mt-6 text-center text-xl text-navy md:w-8/12 lg:w-6/12 font-epilogue">
        Rigly fixes this.
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl">
        {boxes.map((box, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg"
          >
            <div className="relative w-[285px] h-[187px] mb-4">  {/* Reduced from w-[380px] h-[250px] */}
              <Image 
                src={box.image}
                alt={`Trustless Mining Feature ${index + 1}`}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <p className="text-center text-lg text-navy font-epilogue text-base">
              {box.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustlessMining;
