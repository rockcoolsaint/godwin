import clsx from 'clsx'
import BootstrapButton from 'react-bootstrap/Button'

function Button({
  className,
  children,
  onClick,
  disabled,
  type,
}: {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
}) {
  return (
    <BootstrapButton
      className={clsx(className, 'flex h-12 items-center justify-center rounded-lg bg-gradient px-5 text-white hover:bg-gradient-hover')}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </BootstrapButton>
  )
}
export default Button
