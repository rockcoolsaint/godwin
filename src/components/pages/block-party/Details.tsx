import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { BlockParty, BlockPartyOrder } from 'src/types'
import { formatMoney } from 'src/utils/currency'
import useSoloMineCalculator from 'src/hooks/useSoloMineCalculator'
import { useSatsToFiat } from 'src/hooks'

function BlockPartyDetails({
  blockParty,
  blockPartyOrders,
  valueToGoal,
}: {
  blockParty: BlockParty
  blockPartyOrders: BlockPartyOrder[]
  valueToGoal: number
}) {
  const { chancePerBlockDay } = useSoloMineCalculator({ customHashrate: blockParty?.hashrate_ths })

  const potentialRewardValue = (6.25 / blockParty.hashrate_ths) * 100_000_000
  const potentialRewardValueInFiat = useSatsToFiat({ initialValue: 0, bid: potentialRewardValue || 0 })

  const rewardValue = 6.25
  const rewardValueInFiat = useSatsToFiat({ initialValue: 0, bid: rewardValue * 100_000_000 || 0 })

  return (
    <section className="flex flex-col items-center">
      <button
        type="button"
        className="inline-flex w-8/12 items-center justify-center gap-x-2 rounded-md px-3.5 py-2.5 text-center text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-6/12"
      >
        <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
          <circle cx={3} cy={3} r={3} />
        </svg>
        {formatMoney(valueToGoal)} TH/s to goal
      </button>
      <ul role="list" className="w-full divide-y divide-gray-100">
        <li className="flex justify-between gap-x-6 py-4">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm leading-6 text-gray-900">Buyers</p>
            </div>
          </div>
          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{formatMoney(blockPartyOrders.length)}</p>
          </div>
        </li>
        <li className="flex justify-between gap-x-6 py-4">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm leading-6 text-gray-900">Hashrate goal</p>
            </div>
          </div>
          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{formatMoney(blockParty.hashrate_ths)} TH/s</p>
          </div>
        </li>
        <li className="flex justify-between gap-x-6 py-4">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <Tooltip placement="top">
                <TooltipTrigger>
                  <p className="flex items-center justify-center text-sm leading-6 text-gray-900">
                    Odds of finding a block <InformationCircleIcon className="ml-2 h-4 w-4" />
                  </p>
                </TooltipTrigger>
                <TooltipContent className="w-2/12 rounded bg-gray-600 p-2 text-xs font-medium text-white">
                  Odds based on mining for 24hrs at 21 PH/s and global hashrate of 420 EH/s with network difficulty of 61.2 T
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">1 in {formatMoney(chancePerBlockDay)}</p>
          </div>
        </li>
        <li className="flex justify-between gap-x-6 py-4">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <Tooltip placement="top">
                <TooltipTrigger>
                  <p className="flex items-center justify-center text-sm leading-6 text-gray-900">
                    Potential block reward <InformationCircleIcon className="ml-2 h-4 w-4" />
                  </p>
                </TooltipTrigger>
                <TooltipContent className="w-2/12 rounded bg-gray-600 p-2 text-xs font-medium text-white">
                  If no block is found during the mining time frame, <b>there is no reward payout</b> Block reward may vary based on
                  transaction fees
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
            <Tooltip placement="top">
              <TooltipTrigger>
                <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">6.25 btc</p>
                </div>
              </TooltipTrigger>
              <TooltipContent className="rounded bg-gray-500 p-2 text-xs  text-white">
                <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6">${formatMoney(rewardValueInFiat)}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </li>
        <li className="flex justify-between gap-x-6 py-4">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="flex items-center justify-center text-sm leading-6 text-gray-900">Potential reward per TH/s</p>
            </div>
          </div>
          <Tooltip placement="top">
            <TooltipTrigger>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{formatMoney(potentialRewardValue)} sats</p>
              </div>
            </TooltipTrigger>
            <TooltipContent className="rounded bg-gray-500 p-2 text-xs  text-white">
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6">${formatMoney(potentialRewardValueInFiat)}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </section>
  )
}

export default BlockPartyDetails
