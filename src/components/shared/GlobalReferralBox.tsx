// src/components/shared/GlobalReferralBox.tsx
'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useAccountContext } from 'src/providers/AccountProvider'
import { ClipboardIcon, CheckIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import Link from 'src/components/shared/Link'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import { getNextSaturdayPartyLeaderboard } from 'src/api/party/getLeaderboard'
import { formatMoney } from 'src/utils/currency'

const GlobalReferralBox = () => {
  const { account, token } = useAccountContext()
  const [copied, setCopied] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [upcomingPartyData, setUpcomingPartyData] = useState<{
    totalHashrate: number;
  } | null>(null)

  useEffect(() => {
    async function fetchUpcomingPartyData() {
      try {
        // Fetch upcoming block party auctions
        const upcomingAuctions = await getAllAuctions({
          limit: 1000,
          auction_status: 'active',
          auction_type: 'blockparty_auction'
        });

        // Fetch next Saturday's party leaderboard data
        const nextSatPartyLeaderboard = await getNextSaturdayPartyLeaderboard();

        if (upcomingAuctions?.results) {
          const partyAuctions = upcomingAuctions.results.filter(auction => {
            if (!auction.delivery_date) return false;
            const deliveryDate = new Date(auction.delivery_date);
            return !isNaN(deliveryDate.getTime());
          });

          // Calculate auction hashrate
          const auctionHashrate = partyAuctions.reduce(
            (sum, auction) => sum + (auction.auction_meta.hashrate || 0),
            0
          );

          // Calculate party table hashrate from next Saturday's data
          const partyTableHashrate = nextSatPartyLeaderboard.reduce((sum, entry) => {
            return sum + 
              (entry.total_hashrate || 0) + 
              (entry.total_bid_bonus || 0) + 
              (entry.total_auctioneer_match_bonus || 0);
          }, 0);

          setUpcomingPartyData({
            totalHashrate: Math.max(auctionHashrate + partyTableHashrate, 0.01)
          });
        }
      } catch (error) {
        console.error('Error fetching upcoming party data:', error);
      }
    }

    fetchUpcomingPartyData();
    // Refresh data every minute
    const interval = setInterval(fetchUpcomingPartyData, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };


  return (
    <div className="w-full rounded-xl bg-white shadow-lg border border-gray-200 mb-4">
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={toggleMinimize}>
        <p>Party hashrate <span className="font-bold text-orange-600">
                {upcomingPartyData ? formatMoney(upcomingPartyData.totalHashrate) : '...'} TH/s
              </span> </p>
        <div className="flex items-center gap-2">
          {isMinimized ? (
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronUpIcon className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      
      {!isMinimized && (
        <div className="px-4 pb-4">
          {/* Add projected hashrate message */}
          <div className="bg-orange-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600">
            We could mine with 
              <span className="font-bold text-orange-600"> {upcomingPartyData ? formatMoney((upcomingPartyData.totalHashrate*1.5)) : '...'} TH/s
              </span> if you tell 3 people</p>
          </div>
          <div><p className="text-sm text-gray-600">Bonus hashrate comes from new bidders.</p></div>
        </div>
      )}
    </div>
  );
};

export default GlobalReferralBox;