/* eslint-disable no-restricted-imports */
import NextLink, { LinkProps } from 'next/link'
import { forwardRef, PropsWithChildren } from 'react'
import clsx from 'clsx'

type PropsToExtend = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
interface Props extends PropsToExtend {
  styled?: boolean
}

const Link = forwardRef<HTMLAnchorElement, Props>(function LinkInner(
  { children, styled = false, className = '', ...props }: PropsWithChildren<Props>,
  ref,
) {
  return (
    <NextLink className={clsx(`${styled && `text-primary underline outline-primary`}`, className)} {...props} ref={ref}>
      {children}
    </NextLink>
  )
})

export default Link
