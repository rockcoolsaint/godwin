'use client'

import { useEffect, useState } from 'react'
import Link from 'src/components/shared/Link'

import HashPriceLoader from './Loader'
import { getTotalHashrateData } from 'src/api/ckpool/getHashrateData'
import { HashrateDataType } from 'src/api/hashrate/types'
import { formatMoney } from 'src/utils/currency'
import { getBitcoinPrice } from 'src/utils/bitcoin'

// Replace the EpochTable component with BlockPartyExplanation
function BlockPartyExplanation() {
  return (
    <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-xl font-semibold text-gray-900">How Block Party Works</h3>
        <p className="mt-4 text-lg text-gray-500">
          You buy hashrate at auction, which is added to the block party's hashrate and sent to <Link href="https://solo.ckpool.org/" styled>CK Pool</Link> to solo mine.
        </p>
        <p className="mt-4 text-lg text-gray-500">
          The mining's payout address is set to our multisig escrow address.</p>
        <p className="mt-4 text-lg text-gray-500">
          If we find a block, payment will be split up by hashrate contribution and sent to your payout address in your account profile.
        </p>
        <p className="mt-4 text-lg text-gray-500">
          You are in the party for the duration of your auction's mining term - eg. 3 hours, 6 hours, etc.
        </p>
        <p className="mt-4 text-lg text-gray-500">
          Monitor the block party on the <Link href="/pages/dashboard" styled>Live View</Link>.
        </p>
        <p className="mt-4 text-lg text-gray-500">
          The more people who join the party, the more hashrate we have, which improves our chances.
        </p>
        <br/>
        <h3 className="text-xl font-semibold text-gray-900">Bonus Hashrate</h3>
        <p className="mt-4 text-lg text-gray-500">
          High bids over the base hashrate cost are matched by the auctioneer (Evan)
        </p>
        <p className="mt-4 text-lg text-gray-500">
          These funds buy bonus hashrate for <b>moar speed</b> to improve our odds.
        </p>
      </div>
    </div>
  )
}

export default function HashPriceStats() {

  return (
    <>
        <div className="h-full w-11/12 py-3">
          <BlockPartyExplanation />
        </div>
    </>
  )
}