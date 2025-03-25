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

    // Check if today is Saturday
    const isSaturday = new Date().getDay() === 6

    // If it's Saturday, return null (don't render anything)
    if (isSaturday) {
      return null
    }
    
    // Get referral link based on account status
    const referralLink = account?.referral_code 
    ? `https://upendo.rigly.io/register?referral=${account.referral_code}`
    : 'https://upendo.rigly.io'

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    async function fetchUpcomingPartyData() {
      try {
        // Fetch upcoming block party auctions
        const upcomingAuctions = await getAllAuctions({
          limit: 50,
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
          <div className="bg-orange-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">
              New bidders earn 200 TH/s bonus hashrate in their first auction win.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">Refer your friends to earn free party hashrate.</p>
            
            {/* Add referral link with copy button */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="text-sm bg-gray-50 rounded p-2 flex-grow"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy()
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {copied ? (
                  <CheckIcon className="h-5 w-5 text-green-600" />
                ) : (
                  <ClipboardIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalReferralBox;