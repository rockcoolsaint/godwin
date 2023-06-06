import Image from 'next/image'
import Container from 'src/core/components/Container'
import trustlessMining from 'src/assets/webp/trustless_mining.webp'
import sla from 'src/assets/webp/sla.webp'
import damian from 'src/assets/jpg/damian.jpg'
import karo from 'src/assets/png/karo.png'
import kevin from 'src/assets/png/kevin.png'
import tobi from 'src/assets/png/tobi.png'
import evan from 'src/assets/webp/evan.webp'
import jonas from 'src/assets/webp/jonas.webp'
import nico from 'src/assets/webp/nico.webp'

function AboutUs() {
  return (
    <Container className="mx-0 !p-0 md:w-full">
      <div className="mx-auto pt-24 md:w-4/5">
        <div className="relative isolate overflow-hidden bg-gradient px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">What is Rigly?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Rigly is a safe and simple way to start mining bitcoin right away
          </p>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Mining for everyone</h1>
                <p className="mt-6 text-lg text-gray-600 sm:text-xl">
                  We created Rigly so everyone can enjoy mining bitcoin In the early days of bitcoin, everyone could mine bitcoin on their
                  computer. Over time, bitcoin grew and specialized hardware - GPUs, then FPGAs, and now ASICs - became necessary for mining
                  Today, ASIC mining rigs require significant investment and management, and are often installed close to energy plants.
                  {` `}
                  <b>Rigly allows you buy hashrate from these miners and participate in mining</b>
                </p>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <Image src={sla} alt="Product screenshot" width="1432" height="442" className="-mb-12 w-[37rem] max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-24 overflow-hidden bg-white py-10 sm:py-8">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Mining with less risk</h1>
                <p className="mt-6 text-lg text-gray-600 sm:text-xl">
                  If you buy an ASIC mining rig, you risk losing a lot of money if it goes offline. Rigly solves this problem. Rigly mining
                  plans are backed by security deposits. If your miner goes temporarily offline, your mining is automatically extended. If
                  it goes offline for good, you receive your money back. Simple.
                </p>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <Image src={trustlessMining} alt="Product screenshot" width="1432" height="442" className="-mb-12 w-[37rem] max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Meet our team</h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              We’re a dynamic group of individuals who are passionate about what we do.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
          >
            <li className="rounded-2xl bg-gray-800 px-8 py-10">
              <Image className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" src={evan} width={100} height={100} alt="Evan Baer" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">Evan Baer</h3>
              <p className="text-sm leading-6 text-gray-400">
                Evan iterates on Rigly each day. Previously he led the R&D infrastructure group at a global trading firm. In his early
                career, he built one of the first internet providers in Australia. He has a passion for bitcoin mining.
              </p>
              {/* <ul role="list" className="mt-6 flex justify-center gap-x-6">
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-300">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-300">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul> */}
            </li>
            <li className="rounded-2xl bg-gray-800 px-8 py-10">
              <Image className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" src={nico} width={100} height={100} alt="Nico Preti" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">Nico Preti</h3>
              <p className="text-sm leading-6 text-gray-400">
                Nico grows Rigly each day. Previously he managed communications for Poolin and btc.com. He is a long-time writer in the
                bitcoin space and participant in the bitcoin network.
              </p>
            </li>
            <li className="rounded-2xl bg-gray-800 px-8 py-10">
              <Image className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" src={jonas} width={100} height={100} alt="Adam Jonas" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">Adam Jonas</h3>
              <p className="text-sm leading-6 text-gray-400">
                Jonas spearheads educational initiatives and brings things to life at Chaincode Labs. He previously worked as an engineer in
                the education space after transitioning from his former role developing the talents of professional baseball players. His
                preferred nonce is 42.
              </p>
            </li>
            <li className="rounded-2xl bg-gray-800 px-8 py-10">
              <Image className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" src={kevin} width={100} height={100} alt="Adam Jonas" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">Kevin Karsopawiro</h3>
              <p className="text-sm leading-6 text-gray-400">
                Kevin is an experienced software engineer with over a decade of industry experience. Prior to joining Rigly, he spearheaded
                the development of multiple high-frequency cryptocurrency exchanges. His experience from these endeavors allow him to
                deliver innovative solutions that combine performance, security, and decentralization. After being orange-pilled, he made
                the decision to dedicate the majority of his efforts to building Rigly.
              </p>
            </li>
            <li className="rounded-2xl bg-gray-800 px-8 py-10">
              <Image className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" src={tobi} width={100} height={100} alt="Adam Jonas" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">Tobi Adeyemi</h3>
              <p className="text-sm leading-6 text-gray-400">
                Tobi is a dedicated frontend engineer with a passion for clean and intuitive designs who thrives on crafting seamless user
                experiences. He previously worked as a frontend engineer in one of Africa's biggest fintech before leaving it all behind to
                work in the Bitcoin industry after going through the Chaincode affiliated Qala program.
              </p>
            </li>
            <li className="rounded-2xl bg-gray-800 px-8 py-10">
              <Image className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" src={damian} width={100} height={100} alt="Adam Jonas" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">Damian</h3>
              <p className="text-sm leading-6 text-gray-400">
                Damian, a former heavy equipment operator educated in holistic nutrition, gets the word out about Rigly to all the plebs. He
                works to build the bright orange future as he iterates on his skills and knowledge every day.
              </p>
            </li>
            <li className="rounded-2xl bg-gray-800 px-8 py-10">
              <Image className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" src={karo} width={100} height={100} alt="Adam Jonas" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">Karo Zagorus</h3>
              <p className="text-sm leading-6 text-gray-400">
                Bitcoin Maximalist and Privacy Advocate, Author of Bitcoin and the Trust Problem. Karo previously worked both in the
                Hardware Wallet and the Bitcoin Privacy space. He has a Master&apos;s degree in a Social Psychology related field.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  )
}

export default AboutUs
