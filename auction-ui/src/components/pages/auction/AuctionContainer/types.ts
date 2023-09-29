import { Step } from 'react-joyride'

export interface Tab {
  bids: TabProps
  profile: TabProps
  'live-feed': TabProps
  'hash-price': TabProps
}

export interface TabProps {
  name: string
  index: number
}

export const TAB_PANEL: Tab = {
  bids: { name: 'Bids', index: 0 },
  profile: { name: 'Profile', index: 1 },
  'live-feed': { name: 'Live Feed', index: 2 },
  'hash-price': { name: 'Hash Price', index: 3 },
}

export interface TourState {
  run: boolean
  steps: Step[]
}
