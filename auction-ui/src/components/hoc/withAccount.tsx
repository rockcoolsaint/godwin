import AccountProvider from 'src/providers/AccountProvider'

export default function withAccount(Component: any) {
  return function render(props: any) {
    return (
      <AccountProvider>
        <Component {...props} />
      </AccountProvider>
    )
  }
}
