import Image from 'next/image'
import box1Image from 'src/assets/png/box1.png'
import box2Image from 'src/assets/png/box2.png'
import box3Image from 'src/assets/png/box3.png'

const TrustlessMining: React.FC = () => {
  const boxes = [
    {
      text: "You bid on hashrate to join our block party",
      image: box1Image
    },
    {
      text: "Upend the odds by earning bonus hashrate",
      image: box2Image
    },
    {
      text: "If we mine a block, we split the reward",
      image: box3Image
    }
  ];

  return (
<section className="w-full py-9 flex flex-col items-center justify-center px-3 md:px-0">
{/*  <div className="w-8/12 bg-gradient-to-r from-[#ef9327] to-[#f08222] bg-clip-text text-center font-chakra text-3xl font-extrabold text-transparent sm:mb-1.5 sm:w-3/12 sm:pb-3 md:w-4/12 md:text-4xl lg:w-6/12 lg:text-center xl:w-8/12 xl:text-7xl 2xl:w-6/12">
 **   How Block Party Works
 ** </div>
*/}
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
