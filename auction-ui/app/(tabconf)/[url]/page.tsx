import { Container } from './components/Container'
import Image from 'next/image'
import tabconfImg from 'src/assets/png/tabconf.png'
import styles from './index.module.css'
import BalticSignUp from 'src/components/pages/signup/balticSignup'

export default async function BalticHomePage() {
  return (
    <>
      <Container className="h-screen bg-[#ffffff] ">
        <div className="flex flex-col items-center">
          <Image className="w-3/4" alt="Baltic honeybadger" src={tabconfImg} width={400} height={400} />
          <div className={`${styles['terminal']} mt-24`}>
            <a href="#new-order" className={`${styles['new-order']} relative rounded-sm  px-8 py-4 text-lg font-semibold`}>
              Open new order
            </a>
          </div>
        </div>
      </Container>
      <Container className="h-screen items-center justify-center bg-slate-50 pt-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl">Start mining now</h1>
          <p>Buy 100TH/s of hashrate for a few hours</p>
        </div>
        <div id="new-order">
          <BalticSignUp />
        </div>
      </Container>
    </>
  )
}
