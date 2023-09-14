import { useCallback } from 'react'
import Modal from 'src/core/components/Modal'
import { TrashIcon } from '@heroicons/react/24/solid'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import { useCollectionsFilterSchema } from './validation'
import { AllAuctionsResponse } from 'src/api/auction/types'

interface FormInputs {
  auctionType: string
  auctionStatus: string
}

interface Props {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  setAuctions: (auctions: AllAuctionsResponse) => void
  setLoading: (loading: boolean) => void
}

export default function CollectionsFilter({ showModal, setShowModal, setAuctions, setLoading }: Props) {
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const filterInfo = {
    auction_type: '',
    auction_status: '',
  }

  const signUpSchema = useCollectionsFilterSchema()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormInputs>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      ...filterInfo,
      auctionStatus: '',
      auctionType: '',
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    async value => {
      try {
        setLoading(true)
        const res = await getAllAuctions({ limit: 21, auction_status: value.auctionStatus, auction_type: value.auctionType })

        setAuctions(res)

        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    },
    [setAuctions, setLoading],
  )

  return (
    <Modal className="w-1/4 border border-green-700 p-2" open={showModal} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>
            <div className="w-3/3 flex items-center justify-between py-4">
              <span>Filter by</span>
            </div>
          </Modal.Title>
          <Modal.Close>
            <TrashIcon onClick={() => reset()} title="clear" className="mr-2 h-4 w-4 hover:cursor-pointer" />
          </Modal.Close>
        </Modal.Header>
        <Modal.Content className="p-4">
          <div className="mt-5 flex flex-col">
            <span className="text-base font-normal">Auction Type</span>
            <div className="flex flex-col">
              <label className="mt-3 inline-flex items-center text-sm text-dark-200">
                <input type="radio" className="form-radio text-gray-600" value="forward_date" {...register('auctionType')} />
                <span className="ml-2">Forward date</span>
              </label>
              <label className="mt-3 inline-flex items-center text-sm text-dark-200">
                <input type="radio" className="form-radio text-gray-600" value="immediate_delivery" {...register('auctionType')} />
                <span className="ml-2">Immediate delivery</span>
              </label>
              <label className="mt-3 inline-flex items-center text-sm text-dark-200">
                <input type="radio" className="form-radio text-gray-600" value="upfront_payment" {...register('auctionType')} />
                <span className="ml-2">Upfront payment</span>
              </label>
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            <span className="text-base font-normal">Auction Status</span>
            <div className="flex flex-col">
              <label className="mt-3 inline-flex items-center text-sm text-dark-200">
                <input type="radio" className="form-radio text-gray-600" value="scheduled" {...register('auctionStatus')} />
                <span className="ml-2">Scheduled</span>
              </label>
              <label className="mt-3 inline-flex items-center text-sm text-dark-200">
                <input type="radio" className="form-radio text-gray-600" value="active" {...register('auctionStatus')} />
                <span className="ml-2">Active</span>
              </label>
              <label className="mt-3 inline-flex items-center text-sm text-dark-200">
                <input type="radio" className="form-radio text-gray-600" value="completed" {...register('auctionStatus')} />
                <span className="ml-2">Completed</span>
              </label>
            </div>
          </div>
          {/* <div>{JSON.stringify(watch(), null, 2)}</div> */}
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full justify-end border-green-900 py-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="inline-flex items-center rounded bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200"
            >
              <span>Cancel</span>
            </button>
            <button
              disabled={!isValid}
              type="submit"
              className="ml-2 inline-flex items-center rounded bg-primary/[0.8] px-4 py-2 text-sm text-white hover:bg-primary/[0.9] disabled:cursor-not-allowed disabled:bg-gradient-disabled disabled:text-gray-600"
            >
              <span>Filter</span>
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
