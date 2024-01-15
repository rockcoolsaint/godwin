import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { forwardRef } from 'react'
import { styled } from '@slicknode/stylemapper'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  /**
   * The label above the input
   */
  label?: string
  /**
   * Error message for an invalid value
   */
  errorMessage?: React.ReactNode

  isDisabled?: boolean
}

const StyledInput = styled(
  'input',
  'mb-0 flex h-12 w-full items-center justify-center rounded-lg border border-gray-300 px-3 outline-none placeholder:text-sm placeholder:opacity-75 disabled:bg-gray-300 disabled:text-gray-500 focus:ring-0',
  {
    variants: {
      error: {
        true: 'border-error focus:border-error',
        false: 'focus:border-gray-500',
      },
    },
  },
)

const StyledErrorMessage = styled(
  'div',
  'line-clamp-2 absolute inset-x-0 -bottom-1 mx-1 translate-y-full text-error text-sm transition-opacity',
  {
    variants: {
      error: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
  },
)

const Input = forwardRef<HTMLInputElement, InputProps>(function InputComponentInner(
  { className, errorMessage, label, disabled, isDisabled, ...props }: InputProps,
  ref,
) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={props.id} className="mb-2 mt-8 flex justify-start gap-1 text-sm text-gray-500">
          {label}
        </label>
      )}
      <div className="relative rounded-md">
        <StyledInput disabled={isDisabled || disabled} error={Boolean(errorMessage)} type="text" ref={ref} {...props} />
        {Boolean(errorMessage) && props.type !== 'date' && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-error" />
          </div>
        )}
        <StyledErrorMessage error={Boolean(errorMessage)}>{errorMessage}</StyledErrorMessage>
      </div>
    </div>
  )
})
Input.displayName = 'Input'

export default Input
