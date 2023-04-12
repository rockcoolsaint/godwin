/* eslint-disable react/jsx-no-bind */
'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Container, Form, Input } from 'src/core'
import Icon from 'src/core/components/Icon'
import { useAccountContext } from 'src/providers/AccountProvider'

enum LoginView {
  Login = 0,
  EmailSent = 1,
}

export default function Login() {
  const searchParams = useSearchParams()
  const { login } = useAccountContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [view, setView] = useState(LoginView.Login)

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      const returnUrl = searchParams.get('return_url')
      const loginSuccess = await login(data.email, returnUrl)

      if (loginSuccess) {
        setEmail(data.email)
        setView(LoginView.EmailSent)
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="flex h-full justify-center py-40">
      {view === LoginView.Login && (
        <div className="flex flex-col">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Sign in</h1>
          <div className="flex items-center justify-start gap-1">
            <span className="text-sm text-gray-500">To sign in enter your email and you&apos;ll receive a magic login link.</span>
          </div>
          <Form className="mt-8 min-w-[30vw] items-start gap-8" onSubmit={handleSubmit} disabled={loading}>
            <Form.Field className="w-full" required>
              <Form.Field.Label htmlFor="email">E-mail</Form.Field.Label>
              <Input type="email" name="email" placeholder="satoshi@gmx.com" />
            </Form.Field>

            <Form.Submit className="w-full">Sign in</Form.Submit>
          </Form>
        </div>
      )}
      {view === LoginView.EmailSent && (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <Icon icon="envelopeCircleCheck" className="h-20 w-20 text-gray-300" />
          <span className="text-center text-gray-500">
            An e-mail containing your login url
            <br />
            has been sent to <b className="text-primary">{email}</b>
          </span>
        </div>
      )}
    </Container>
  )
}

// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
// import { Button, Container, Loader } from 'src/core'
// import Link from 'src/components/shared/Link'

// const LOGIN_REDIRECT_TIMEOUT = Number(process.env.NEXT_PUBLIC_LOGIN_REDIRECT_TIMEOUT) || 0

// // { searchParams }: { searchParams: { code: string; state: string } }
// export default function Login({ searchParams }: { searchParams: { error?: string; error_description?: string } }) {
//   const router = useRouter()

//   useEffect(() => {
//     if (!searchParams.error) {
//       setTimeout(() => {
//         router.push('/')
//       }, LOGIN_REDIRECT_TIMEOUT)
//     }
//   }, [searchParams.error, router])

//   return (
//     <Container>
//       {searchParams.error && (
//         <div className="flex flex-col items-start gap-4">
//           <span className="text-lg text-red-500">{searchParams.error_description}</span>
//           <Link href="/login">
//             <Button>Sign in</Button>
//           </Link>
//         </div>
//       )}

//       {!searchParams.error && (
//         <div className="flex flex-col items-center justify-center">
//           <Loader />
//           <span className="mt-8">Redirecting after {LOGIN_REDIRECT_TIMEOUT / 1000} seconds</span>
//         </div>
//       )}
//     </Container>
//   )
// }
