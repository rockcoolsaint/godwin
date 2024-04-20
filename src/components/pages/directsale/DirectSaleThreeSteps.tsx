import ThreeStepProcess from 'src/components/shared/ThreeSteps'
import StepOneImage from 'src/images/direct_sale_1.png'
import StepTwoImage from 'src/images/direct_sale_2.png'
import StepThreeImage from 'src/images/direct_sale_3.jpeg'

const DirectSaleThreeSteps = () => (
  <ThreeStepProcess
    steps={[
      {
        image: StepOneImage,
        imageAlt: 'Account Settings Screenshot',
        title: '1. Set Pool Account',
        text: 'Login to Rigly and enter your pool account under your Account Profile.',
      },
      {
        image: StepTwoImage,
        imageAlt: 'Buy page screenshot',
        title: '2. Buy',
        text: 'Select your hashrate, duration, and <b>click to buy</b>.  You can pay via Lightning or on-chain.',
      },
      {
        image: StepThreeImage,
        imageAlt: 'Dashboard screenshot',
        title: '3. Receive your hashrate',
        text: 'Check your pool account to verify your hashrate delivery.',
      },
    ]}
  />
)

export default DirectSaleThreeSteps
