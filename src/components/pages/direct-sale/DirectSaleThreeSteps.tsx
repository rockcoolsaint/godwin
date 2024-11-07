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
        text: 'In your <a href=\"/account/general\"> Account Profile</a>',
      },
      {
        image: StepTwoImage,
        imageAlt: 'Buy page screenshot',
        title: 'Buy',
        text: 'You can pay on-chain or via Lightning',
      },
      {
        image: StepThreeImage,
        imageAlt: 'Dashboard screenshot',
        title: 'Receive your hashrate',
        text: 'Your mining rewards are paid from your mining pool',
      },
    ]}
  />
)

export default DirectSaleThreeSteps
