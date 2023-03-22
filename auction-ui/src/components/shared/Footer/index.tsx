import Link from 'src/components/shared/Link'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import LogoSvg from 'src/assets/svg/logo_dark.svg'
import LinkedInSvg from 'src/assets/svg/linkedin.svg'
import TwitterSvg from 'src/assets/svg/twitter.svg'

const Footer = () => {
  return (
    <section>
      <div>
        <div>
          <div className="mb-16 flex items-center justify-between border-t border-gray-200 pt-16">
            <div className="flex items-center">
              <LogoSvg />
              <div className="ml-3 border-l pl-3">
                <span className="block text-dark-200/[.7]">Bitcoin Mining</span>
                <span className="block text-dark-200/[.7]">Auction</span>
              </div>
            </div>
            <div className="flex">
              <Link className=" flex items-center justify-center rounded-lg bg-gray-100 p-3 hover:bg-gray-100/[.5]" href="/">
                <LinkedInSvg className="h-6 w-6" />
              </Link>
              <Link className="ml-2 flex items-center justify-center rounded-lg bg-gradient p-3 hover:bg-gradient-hover" href="/">
                <TwitterSvg className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grid-cols-5 flex-col gap-4 md:grid">
        <div>
          <div>
            <h4 className="mb-5 text-lg font-medium text-dark-200">Contact</h4>
            <ul>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="mailto:hello@rigly.io">
                   hello@rigly.io
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="quicklink">
            <h4 className="mb-5 text-lg font-medium text-dark-200">Quick Link</h4>
            <ul>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="/">
                  Auctions
                </Link>
              </li>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="/">
                  About us
                </Link>
              </li>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="/">
                  How it Works
                </Link>
              </li>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="/">
                  Contact us
                </Link>
              </li>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="/">
                  Learn
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="quicklink">
            <h4 className="mb-5 text-lg font-medium text-dark-200">Support</h4>
            <ul>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="/">
                  Help Center
                </Link>
              </li>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="/">
                  Create Account
                </Link>
              </li>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="/">
                  Privacy policy
                </Link>
              </li>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="/">
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-3">
                <Link className="font-normal text-dark-100 hover:underline" href="/">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-2 ">
          <div className="subscribe-bx">
            <h4 className="mb-5 text-lg font-medium text-dark-200">Sign up for updates</h4>
            <form className="flex">
              <div className="w-full">
                <input
                  type="text"
                  name=""
                  placeholder="Enter your email"
                  className="h-input-tall w-full rounded-lg border px-4 placeholder:text-dark-100 focus:border-gradient focus:ring-0"
                />
              </div>
              <button
                className=" ml-2 flex items-center justify-center rounded-lg bg-gradient px-4 text-white hover:bg-gradient-hover"
                type="submit"
              >
                <span>Send</span>
                <ArrowLongRightIcon className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-16 flex items-center justify-center border-t border-gray-200 py-7 ">
        <p>
          @2022 Copyright All Right Reserved by <span className="text-primary">Rigly</span>
        </p>
      </div>
    </section>
  )
}

export default Footer
