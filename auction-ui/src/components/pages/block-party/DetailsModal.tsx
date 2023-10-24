'use client'

import Input from 'src/core/components/Input'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Loader, Modal } from 'src/core'
import { useCallback, useMemo, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateAccount } from 'src/api/auth/updateAccount'
import toast from 'react-hot-toast'
import { useAccountContext } from 'src/providers/AccountProvider'
import addressUtils from 'src/utils/addressUtils'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip, TooltipTrigger, TooltipContent } from 'src/components/shared/Tooltip'

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface FormInputs {
  username: string
  walletAddress: string
}

const useSchema = () => {
  const schema = useMemo(
    () =>
      yup
        .object({
          username: yup.string().required(),
          walletAddress: yup
            .string()
            .trim()
            .required()
            .test('isValidAddress', 'Invalid wallet address', value => {
              return addressUtils.isValidBitcoinAddress(value, false)
            }),
        })
        .required(),
    [],
  )

  return schema
}

const DetailsModal = ({ isOpen, onClose }: Props) => {
  const { token, account, refresh } = useAccountContext()
  const [loading, setLoading] = useState(false)

  const info = {
    username: '',
    walletAddress: '',
  }

  const detailSchema = useSchema()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(detailSchema),
    defaultValues: {
      ...info,
      username: account?.username,
      walletAddress: account?.refund_address,
    },
  })

  const handleFormSubmit: SubmitHandler<FormInputs> = useCallback(
    async value => {
      try {
        if (!token) {
          return
        }

        setLoading(true)

        const updateSuccess = await updateAccount(
          {
            username: value.username,
            refund_address: value.walletAddress,
          },
          token,
        )
        toast.success('Successfully added details!')

        if (!updateSuccess) {
          toast.error('Unable to add details')
        }

        setLoading(false)
        onClose()
        refresh()
      } catch (err) {
        setLoading(false)
        toast.error('Error adding details')
      }
    },
    [onClose, token],
  )

  return (
    <Modal className="w-1/4 border border-green-700 p-2" open={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>
          <div className="w-3/3 flex items-center justify-between py-4">
            <span>Your details</span>
          </div>
        </Modal.Title>
        <Modal.Close />
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col px-2 py-4">
        <Modal.Content>
          <label htmlFor="username" className="mb-1 block text-sm">
            Username
          </label>
          <Input
            type="text"
            id="username"
            defaultValue={info.username}
            placeholder="username"
            errorMessage={errors.username?.message}
            style={{ fontSize: '0.85rem' }}
            {...register('username')}
          />
          {errors?.username && <span className="text-danger">Username is required</span>}

          <label htmlFor="walletAddress" className="mb-1 mt-4 block text-sm">
            <Tooltip placement="right-end">
              <TooltipTrigger>
                <p className="flex items-center justify-center text-sm font-semibold leading-6 text-gray-900">
                  Bitcoin address <InformationCircleIcon className="ml-1 h-4 w-4" />
                </p>
              </TooltipTrigger>
              <TooltipContent className="z-[2000] w-2/12 rounded bg-gray-600 p-2 text-xs font-medium text-white">
                Enter your share Bitcoin address to receive your share of the reward, if a block is found
              </TooltipContent>
            </Tooltip>
          </label>
          <Input
            type="text"
            id="walletAddress"
            defaultValue={info.walletAddress}
            placeholder="bc1qhamlf3nz9q36zmmj99rzu7yhjax5fxhfun8yk8"
            className="mb-6"
            errorMessage={errors.walletAddress?.message}
            style={{ fontSize: '0.85rem' }}
            {...register('walletAddress')}
          />
        </Modal.Content>
        <Modal.Footer>
          <button
            disabled={loading}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
            type="submit"
          >
            {loading ? <Loader height={20} width={20} /> : <>Save</>}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default DetailsModal
