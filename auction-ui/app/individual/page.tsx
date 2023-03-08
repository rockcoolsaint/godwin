import BuyerHowItWorks from 'src/components/BuyerHowItWorks'
import InnerSection from 'src/components/InnerSection'

export default async function IndividualPage() {
  return (
    <>
      <InnerSection title={'How it Works?'} breadcrumb={'How it Works?'} />
      <BuyerHowItWorks />
    </>
  )
}
