import { ClockIcon } from '@heroicons/react/24/outline'
import { AuctionStatus, Auction } from 'src/api/auction/types'
import { zeroPad } from 'react-countdown'

interface CountdownWidgetProps {
  days: string | number
  hours: string | number
  minutes: string | number
  seconds: string | number
  completed?: boolean | number
}

export const CountdownWidget = ({ days, hours, minutes, seconds, completed }: CountdownWidgetProps, auction: Auction): JSX.Element => {
  if (completed) {
    if (auction.status === AuctionStatus.Scheduled) {
      return <></>
    }

    return <span className="text-center text-red-400">Auction ended</span>
  } else {
    return (
      <section className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center">
          <ClockIcon className="h-5 w-5 text-dark-100" />
          <p className="ml-2 flex items-center">
            <span className="gradient-text text-2xl font-semibold">{days}</span> <span className="ml-1 text-sm text-dark-100">days</span>
          </p>
          <p className="ml-2 flex items-center">
            <span className="gradient-text text-2xl font-semibold">{hours}</span> <span className="ml-1 text-sm text-dark-100">hours</span>
          </p>
          <p className="ml-2 flex items-center">
            <span className="gradient-text text-2xl font-semibold">{zeroPad(minutes)}</span>{' '}
            <span className="ml-1 text-sm text-dark-100">min</span>
          </p>
          <p className="ml-2 flex items-center">
            <span className="gradient-text w-8 text-2xl font-semibold">{zeroPad(seconds)}</span>{' '}
            <span className="ml-1 text-sm text-dark-100">sec</span>
          </p>
        </div>
      </section>
    )
  }
}
