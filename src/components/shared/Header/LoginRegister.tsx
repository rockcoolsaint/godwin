import Link from 'src/components/shared/Link'
import Icon from 'src/core/components/Icon'
import { useAccountContext } from 'src/providers/AccountProvider'

interface LoginRegisterProps {
  handleLogoutClick: () => void
  handleLoginClick: () => void
  handleRegisterClick: () => void
}

const LoginRegister = ({ handleLogoutClick, handleLoginClick, handleRegisterClick }: LoginRegisterProps) => {
  const { account } = useAccountContext()
  if (account) {
    return (
      <>
        <div className="border-y border-gray-300">
          <Link
            className="flex items-center justify-start gap-3 px-5 py-4 text-sm text-dark-300 hover:text-blue-500"
            href="/account/general"
          >
            <Icon icon="user" className="h-3 w-3 text-gray-600" />
            <span>View my account</span>
          </Link>
          <div className="p-5 text-sm">
            Signed in as <span className="text-blue-500">{account.email}</span>
          </div>
        </div>
        <div className="p-5">
          <button
            onClick={handleLogoutClick}
            className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 px-3 text-sm text-blue-400 hover:text-blue-600"
          >
            <span className="whitespace-nowrap">Sign Out</span>
          </button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="grid grid-cols-2 gap-5 border-t border-gray-300 p-5">
          <button
            onClick={handleLoginClick}
            className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 px-3 text-sm text-blue-400 hover:text-blue-600"
          >
            <span className="whitespace-nowrap">Sign In</span>
          </button>
          <button
            onClick={handleRegisterClick}
            className="flex h-10 w-full items-center justify-center rounded-lg bg-gradient px-3 text-sm text-white hover:bg-gradient-hover"
          >
            <span className="whitespace-nowrap font-normal">Sign up</span>
          </button>
        </div>
      </>
    )
  }
}

export default LoginRegister
