import ThreeStepProcess from 'src/components/shared/ThreeSteps'
import StepOneImage from 'src/images/buy-screenshot.png'
import StepTwoImage from 'src/images/account-details-screenshot.png'
import StepThreeImage from 'src/images/dashboard-screenshot.jpeg'

const TestDriveThreeSteps = () => (
  <ThreeStepProcess
    steps={[
      {
        image: StepOneImage,
        imageAlt: 'Buy screen screenshot',
        title: 'Buy',
        text: 'Enter your email address below, then <b>click to buy</b> via Lightning or on-chain.',
      },
      {
        image: StepTwoImage,
        imageAlt: 'Welcome email screenshot',
        title: 'Login to Your Pool Account',
        text: 'After payment <b>you will receive an email</b> w/details for your new mining pool account at Braiins Pool.',
      },
      {
        image: StepThreeImage,
        imageAlt: 'Dashboard screenshot',
        title: "You're mining now!",
        text: 'Check your hashrate - and then <b>update your pool password</b> and <b>set your payout address</b> to receive your mining rewards.',
      },
    ]}
  />
)

export default TestDriveThreeSteps
