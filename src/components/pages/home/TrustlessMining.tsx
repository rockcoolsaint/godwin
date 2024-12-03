import Image from 'next/image'
import box1Image from 'src/assets/png/box1.png'
import box2Image from 'src/assets/png/box2.png'
import box3Image from 'src/assets/png/box3.png'

const TrustlessMining: React.FC = () => {
  const boxes = [
    {
      text: "Mining as a team is 100x+ better odds than solo mining with a Bitaxe.",
      image: box1Image
    },
    {
      text: "You bid on hashrate to join - upend other bidders to get your spot",
      image: box2Image
    },
    {
      text: "If we win a block, the reward is equally split by hashrate",
      image: box3Image
    }
  ];

  return (
<section className="w-full py-9 flex flex-col items-center justify-center px-3 md:px-0">
  <div className="w-8/12 bg-gradient-to-r from-[#ef9327] to-[#f08222] bg-clip-text text-center font-chakra text-3xl font-extrabold text-transparent sm:mb-1.5 sm:w-3/12 sm:pb-3 md:w-4/12 md:text-4xl lg:w-6/12 lg:text-center xl:w-8/12 xl:text-7xl 2xl:w-6/12">
    How Block Party Works
  </div>
      
      <p className="mt-6 text-center text-xl text-navy md:w-8/12 lg:w-6/12 font-epilogue">
        Mining is a game. Join our team and play to win. 
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
