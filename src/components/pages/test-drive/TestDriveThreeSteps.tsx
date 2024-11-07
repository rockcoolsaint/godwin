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
        title: 'Signup and Buy',
        text: 'Enter your email address below',

      },
      {
        image: StepTwoImage,
        imageAlt: 'Welcome email screenshot',
        title: 'Braiins Pool Account',
        text: 'Check email for mining pool account details',
      },
      {
        image: StepThreeImage,
        imageAlt: 'Dashboard screenshot',
        title: "You're mining now!",
        text: 'Set a payout address at Braiins to receive your mining rewards',
      },
    ]}
  />
)

export default TestDriveThreeSteps
