'use client'

import { useState } from 'react'
import { Input, Loader } from 'src/core'
import Container from 'src/core/components/Container'
import { useForm } from 'react-hook-form'
import { unsubscribeNewsletter } from 'src/api/subscribe/subscribe'
import { toast } from 'react-hot-toast'

interface FormInputs {
  email: string
}

export default function Unsubscribe() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormInputs>()

  const onSubmit = async (data: FormInputs) => {
    setLoading(true)
    try {
      await unsubscribeNewsletter(data.email)
      toast.success('Successfully unsubscribed')
    } catch (error) {
      toast.error('Failed to unsubscribe')
    }
    setLoading(false)
  }

  return (
    <Container className="flex justify-center py-20">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-medium">Unsubscribe from Newsletter</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="w-full"
            id="email"
            type="email"
            autoComplete="email"
            errorMessage={errors.email?.message}
            placeholder="Enter your email"
            label="Email address"
            {...register('email', { required: true })}
          />
          <button
            disabled={!isDirty || !isValid || loading}
            type="submit"
            className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
          >
            {loading ? <Loader height={20} width={20} /> : 'Unsubscribe'}
          </button>
        </form>
      </div>
    </Container>
  )
}
