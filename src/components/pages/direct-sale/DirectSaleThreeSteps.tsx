import ThreeStepProcess from 'src/components/shared/ThreeSteps'
import StepOneImage from 'src/images/set-mining-pool-screenshot.png'
import StepTwoImage from 'src/images/buy-screenshot.png'
import StepThreeImage from 'src/images/dashboard-screenshot.jpeg'

const DirectSaleThreeSteps = () => (
  <ThreeStepProcess
    steps={[
      {
        image: StepOneImage,
        imageAlt: 'Account Settings Screenshot',
        title: 'Set Pool Account',
        text: 'Login to Rigly and enter your pool account under your Account Profile.',
      },
      {
        image: StepTwoImage,
        imageAlt: 'Buy page screenshot',
        title: 'Buy',
        text: 'Select your hashrate, duration, and <b>click to buy</b>.  You can pay via Lightning or on-chain.',
      },
      {
        image: StepThreeImage,
        imageAlt: 'Dashboard screenshot',
        title: 'Receive your hashrate',
        text: 'Check your pool account to verify your hashrate delivery.',
      },
    ]}
  />
)

export default DirectSaleThreeSteps
