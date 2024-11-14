import { useState } from 'react'
import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import { url } from 'src/utils/url'  // Add this import
import { toast } from 'react-hot-toast';
import Link from 'src/components/shared/Link'

interface FormData {
  name: string
  hashrate: string
  location: string
  energySource: string
  email: string
  phone: string
}

function SellingOnRigly() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    hashrate: '',
    location: '',
    energySource: '',
    email: '',
    phone: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for empty values
    const hasEmptyFields = Object.values(formData).some(value => !value.trim());
    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
      return;
    }
  
    // Add email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
  
    // Add phone validation (basic)
    const phoneRegex = /^\+?[\d\s-()]{8,}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }
      
    try {
      const response = await fetch(url('/api/sellers/inquiry'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.status}`);
      }
  
      toast.success('Inquiry submitted successfully!');
      setFormData({
        name: '',
        email: '',
        hashrate: '',
        location: '',
        energySource: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <LearnCategoryTitle>Sell Your Hashrate</LearnCategoryTitle>
      <LearnCategoryText>
        Running a mining farm has many challenges. Rigly can help.
      </LearnCategoryText>

      <LearnCategorySubTitle>How it works</LearnCategorySubTitle>
      <LearnCategoryText>
        Rigly offers you the flexibility to earn more or get paid upfront for your hashrate.
      </LearnCategoryText>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Spot Premium</h3>
          <p className="text-gray-600">Receive a premium to FPPS hashprice, and get paid on-delivery (same as a mining pool)</p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Take the Auction Price</h3>
          <p className="text-gray-600">You receive 50% upfront and the remaining 50% in escrow, paid out over the duration of the auction agreement.</p>
        </div>
      </div>

      <LearnCategorySubTitle>How much can I earn?</LearnCategorySubTitle>
      <LearnCategoryText>
        For the spot premium, Rigly offers a 4% premium to FPPS daily hashprice. We use the Luxor <Link href="https://hashrateindex.com" styled>Hashrate Index</Link> as the source of the FPPS benchmark price.
        <br /><br />
        For the auctions, let's take a hypothetical example:
        <br /><br />
        21 PH/s<br />
        6 month forward<br />
        63 sats per TH/s/day hashprice
        <br /><br />
        Let's say the auctions sell at an average of 15% discount to today's spot hashprice, netting 2.38 btc in sale proceeds. You can withdraw 50% right away (so 1.19 btc) and based on today's bitcoin price (~$89k) that would give you $106,000 in upfront liquidity.
        <br /><br />
        The balance is paid out on hashrate delivery, same as a mining pool.
      </LearnCategoryText>

      <LearnCategorySubTitle>What's in it for the buyer?</LearnCategorySubTitle>
      <LearnCategoryText>
       Rigly connects bitcoiners with the hashrate they need to secure their network.
       <br/><br/>
       In terms of incentives, buyers bid on auctions with the aim of earning a profit. Mining also produces fresh bitcoin right from the protocol, which is valued by many for its <Link href="https://www.reddit.com/r/Bitcoin/comments/17vs1na/whats_the_advantage_of_non_kyc_bitcoin" styled>privacy aspects</Link>.
       <br/><br/>
       Rigly allows mining farm owners with <b>high time preference</b> (to pay bills and grow faster) to trade with buyers with <b>low time preference</b> (earn more bitcoin, over time) to mutual benefit.
      </LearnCategoryText>

      <LearnCategorySubTitle>Build your Rigly reputation</LearnCategorySubTitle>
      <LearnCategoryText>
        We plan to build a reputation score system. Established sellers - with proven delivery history - gain access to sell higher volumes of hashrate, for longer durations, and your hashrate may fetch a premium price at auction.
      </LearnCategoryText>

      <LearnCategorySubTitle>Get Started</LearnCategorySubTitle>
      <LearnCategoryText>
        We are onboarding small volumes of hashrate from select mining farms to bootstrap our marketplace.
        <br/><br/>
        If this sounds good to you, and you are willing to share feedback w/ us, then get in touch:
      </LearnCategoryText>

      <form onSubmit={handleSubmit} className="mt-8 mb-16">
        {submitted ? (
          <div className="bg-green-50 p-6 rounded-xl">
            <p className="text-green-800 text-center">Thank you for your interest! We'll be in touch soon.</p>
          </div>
        ) : (
          <>
          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}  // Add this
              required
              className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="hashrate"
              placeholder="Amount of Hashrate"
              value={formData.hashrate}  // Add this
              required
              className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}  // Add this
              required
              className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="energySource"
              placeholder="Electricity Source"
              value={formData.energySource}  // Add this
              required
              className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}  // Add this
              required
              className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Contact Phone"
              value={formData.phone}  // Add this
              required
              className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>
            <button
              type="submit"
              className="w-full mt-8 bg-blue-600 text-white py-4 px-8 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </>
  )
}

export default SellingOnRigly