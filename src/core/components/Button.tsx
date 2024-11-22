import clsx from 'clsx'

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
    <button
      className={clsx(className, 'flex items-center justify-center rounded-lg text-white outline-none', {
        'bg-[#f08222] hover:bg-[#d97420]': !disabled, // Replace bg-gradient and hover:bg-gradient-hover
        'pointer-events-none bg-gray-300': disabled,
        'h-12 px-5': !small,
        'h-8 px-2': small,
      })}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}
export default Button
