import clsx from 'clsx'
import BootstrapButton from 'react-bootstrap/Button'

function Button({
  className,
  children,
  onClick,
  disabled,
  type,
  small,
}: {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  small?: boolean
}) {
  return (
    <BootstrapButton
      className={clsx(className, 'flex items-center justify-center rounded-lg text-white outline-none', {
        'bg-gradient hover:bg-gradient-hover': !disabled,
        'pointer-events-none bg-gray-300': disabled,
        'h-12 px-5': !small,
        'h-8 px-2': small,
      })}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </BootstrapButton>
  )
}
export default Button
