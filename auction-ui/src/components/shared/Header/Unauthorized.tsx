/* eslint-disable react/jsx-no-bind */
import { useAuth0 } from '@auth0/auth0-react'

export default function Unauthorized() {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect()
  }

  return (
    <button
      className="ml-8 flex items-center justify-center rounded-lg bg-gradient p-3 px-5 text-white hover:bg-gradient-hover"
      onClick={handleLogin}
    >
      <span>Sign in</span>
    </button>
  )
}
