/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

interface Props {
  heading: string
  description: string
  button: string
  button_arg?: string
}

const AlertDismissible = ({ heading, description, button, button_arg }: Props) => {
  const [show, setShow] = useState(true)

  const router = useRouter()
  const handleLogin = async () => {
    // TODO: Refactor using new auth system
    // await loginWithRedirect({
    //   appState: {
    //     returnTo: '/payment',
    //   },
    // })
  }

  function handleClick(button_arg: string) {
    setShow(false)
    if (button_arg === 'login') {
      handleLogin()
    } else if (button_arg === 'payment') {
      router.push('/payment')
    }
  }

  return (
    <>
      <Alert show={show} variant="primary" className="w-100 mb-3">
        <Alert.Heading>{heading}</Alert.Heading>
        <p>{description}</p>
        <br />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              handleClick(button_arg ? button_arg : '')
            }}
            className="btn btn-primary w-75 cb-bid-btn mt-4 py-2"
          >
            {button}
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  )
}

export default AlertDismissible
