import Container from 'src/core/components/Container'

export default function PrivacyPolicy() {
  return (
    <Container className="my-24">
      <div className="mb-14">
        <div className="relative isolate overflow-hidden bg-gradient px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Privacy Policy</h2>
        </div>
      </div>
      <div className="text-gray-700">
        <p className="mb-4 text-base">
          This Privacy Policy describes how rigly.io (the “Site” or “we”) collects, uses, and discloses your Personal Information when you
          visit or make a purchase from the Site.
        </p>
        <h1 className="mb-4 text-2xl">Collecting Personal Information</h1>
        <p>
          When you visit the Site, we collect certain information about your device, your interaction with the Site, and information
          necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this
          Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as
          “Personal Information”. See the list below for more information about what Personal Information we collect and why.
        </p>
        <p className="my-4">
          <u>Device information</u>
        </p>
        <ul className="pl-4">
          <li>
            <strong>Examples of Personal Information collected:</strong> version of web browser, IP address, time zone, cookie information,
            which product listings you view, search terms, and how you interact with the Site
          </li>
          <li>
            <strong>Purpose of collection:</strong> to load the Site accurately for you, and to perform analytics on Site usage to optimize
            our Site
          </li>
          <li>
            <strong>Source of collection:</strong> Collected automatically when you access our Site using cookies, log files, web beacons,
            tags, or pixels
          </li>
          {/* <li>
            <strong>Disclosure for a business purpose:</strong> shared with our processor Shopify and Google (Google Analytics)
          </li> */}
        </ul>
        <p className="my-4">
          <u>Order information</u>
        </p>
        <ul className="pl-4">
          <li>
            <strong>Examples of Personal Information collected:</strong> name, email address, bitcoin address
          </li>
          <li>
            <strong>Purpose of collection:</strong> to provide services to you to fulfill our contract, to process your payment information,
            arrange&nbsp;for service delivery
          </li>
          <li>
            <strong>Source of collection:</strong> collected from you
          </li>
          {/* <li>
            <strong>Disclosure for a business purpose:</strong> shared with our processors Shopify and Webkul Software
          </li> */}
        </ul>
        <p className="my-4">
          <u>Customer support information</u>
        </p>
        <ul className="pl-4">
          <li>
            <strong>Examples of Personal Information collected:</strong>&nbsp;name, email address, bitcoin address
          </li>
          <li>
            <strong>Purpose of collection:</strong> to provide customer support
          </li>
          <li>
            <strong>Source of collection:</strong> collected from you
          </li>
          <li>
            <strong>Disclosure for a business purpose:</strong>&nbsp;shared with our processor Google
          </li>
        </ul>
        <h2 className="my-4 text-2xl">Minors</h2>
        <p>
          The Site is not intended for individuals under the age of 16. We do not intentionally collect Personal Information from children.
          If you are the parent or guardian and believe your child has provided us with Personal Information, please contact us at the
          address below to request deletion.
        </p>
        <h1 className="my-4 text-2xl font-normal">Using Personal Information</h1>
        <p>
          We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments,
          shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.
        </p>
        <p className="my-4">
          <strong>Lawful basis</strong>
        </p>
        <p className="mb-4">
          Pursuant to the General Data Protection Regulation (“GDPR”), if you are a resident of the European Economic Area (“EEA”), we
          process your personal information under the following lawful bases:
        </p>
        <ul className="pl-4">
          <li>Your consent;</li>
          <li>The performance of the contract between you and the Site;</li>
          <li>Compliance with our legal obligations;</li>
          <li>To protect your vital interests;</li>
          <li>To perform a task carried out in the public interest;</li>
          <li>For our legitimate interests, which do not override your fundamental rights and freedoms.</li>
        </ul>
        <h2 className="my-4 text-2xl">Retention</h2>
        <p>
          When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to
          erase this information. For more information on your right of erasure, please see the ‘Your rights’ section below.
        </p>
        <h2 className="my-4 text-2xl">Automatic decision-making</h2>
        <p>
          If you are a resident of the EEA, you have the right to object to processing based solely on automated decision-making (which
          includes profiling), when that decision-making has a legal effect on you or otherwise significantly affects you.
        </p>
        <p>
          We DO NOT&nbsp;engage in fully automated decision-making that has a legal or otherwise significant effect using customer data.
        </p>
        {/* <>
          <h1 className="my-4 text-2xl">Your rights</h1>
          <h2 className="my-4 text-2xl">GDPR</h2>
          <p>
            If you are a resident of the EEA, you have the right to access the Personal Information we hold about you, to port it to a new
            service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights,
            please contact us through the contact information below.
          </p>
          <p>
            Your Personal Information will be initially processed in Ireland and then will be transferred outside of Europe for storage and
            further processing, including to Canada and the United States. For more information on how data transfers comply with the GDPR,
            see Shopify’s GDPR Whitepaper:{' '}
            <a href="https://help.shopify.com/en/manual/your-account/privacy/GDPR" target="_blank">
              https://help.shopify.com/en/manual/your-account/privacy/GDPR
            </a>
            .
          </p>
          <h2 className="my-4 text-2xl">CCPA</h2>
          <p>
            If you are a resident of California, you have the right to access the Personal Information we hold about you (also known as the
            ‘Right to Know’), to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If
            you would like to exercise these rights, please contact us through the contact information below.
          </p>
          <p>
            If you would like to designate an authorized agent to submit these requests on your behalf, please contact us at the address
            below.
          </p>
          <h1 className="my-4 text-2xl font-normal">Cookies</h1>
          <p>
            A cookie is a small amount of information that’s downloaded to your computer or device when you visit our Site. We use a number
            of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your
            browsing experience better by allowing the website to remember your actions and preferences (such as login and region
            selection). This means you don’t have to re-enter this information each time you return to the site or browse from one page to
            another. Cookies also provide information on how people use the website, for instance whether it’s their first time visiting or
            if they are a frequent visitor.
          </p>
          <p>We use the following cookies to optimize your experience on our Site and to provide our services.</p>
          <h2 className="my-4 text-2xl">Cookies Necessary for the Functioning of the&nbsp;website</h2>
          <table>
            <thead>
              <tr>
                <th>
                  <strong>Name</strong>
                </th>
                <th>
                  <strong>Function</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ab</td>
                <td>Used in connection with access to admin.</td>
              </tr>
              <tr>
                <td>_secure_session_id</td>
                <td>Used in connection with navigation</td>
              </tr>
              <tr>
                <td>cart</td>
                <td>Used in connection with shopping cart.</td>
              </tr>
              <tr>
                <td>cart_sig</td>
                <td>Used in connection with checkout.</td>
              </tr>
              <tr>
                <td>cart_ts</td>
                <td>Used in connection with checkout.</td>
              </tr>
              <tr>
                <td>checkout_token</td>
                <td>Used in connection with checkout.</td>
              </tr>
              <tr>
                <td>secret</td>
                <td>Used in connection with checkout.</td>
              </tr>
              <tr>
                <td>secure_customer_sig</td>
                <td>Used in connection with customer login.</td>
              </tr>
              <tr>
                <td>storefront_digest</td>
                <td>Used in connection with customer login.</td>
              </tr>
              <tr>
                <td>_shopify_u</td>
                <td>Used to facilitate updating customer account information.</td>
              </tr>
            </tbody>
          </table>
          <h2></h2>
          <h2 className="my-4 text-2xl">Reporting and Analytics</h2>
          <table>
            <tbody>
              <tr>
                <th>
                  <strong>Name</strong>
                </th>
                <th>
                  <strong>Function</strong>
                </th>
              </tr>
              <tr>
                <td>_tracking_consent</td>
                <td>Tracking preferences.</td>
              </tr>
              <tr>
                <td>_landing_page</td>
                <td>Track landing pages</td>
              </tr>
              <tr>
                <td>_orig_referrer</td>
                <td>Track landing pages</td>
              </tr>
              <tr>
                <td>_s</td>
                <td>Shopify analytics.</td>
              </tr>
              <tr>
                <td>_shopify_s</td>
                <td>Shopify analytics.</td>
              </tr>
              <tr>
                <td>_shopify_sa_p</td>
                <td>Shopify analytics relating to marketing &amp; referrals.</td>
              </tr>
              <tr>
                <td>_shopify_sa_t</td>
                <td>Shopify analytics relating to marketing &amp; referrals.</td>
              </tr>
              <tr>
                <td>_shopify_y</td>
                <td>Shopify analytics.</td>
              </tr>
              <tr>
                <td>_y</td>
                <td>Shopify analytics.</td>
              </tr>
            </tbody>
          </table>
          <p>&nbsp;</p>
          <p>
            The length of time that a cookie remains on your computer or mobile device depends on whether it is a “persistent” or “session”
            cookie. Session cookies last until you stop browsing and persistent cookies last until they expire or are deleted. Most of the
            cookies we use are persistent and will expire between 30 minutes and two years from the date they are downloaded to your device.
          </p>
          <p>
            You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact
            your user experience and parts of our website may no longer be fully accessible.
          </p>
          <p>
            Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser controls,
            often found in your browser’s “Tools” or “Preferences” menu. For more information on how to modify your browser settings or how
            to block, manage or filter cookies can be found in your browser’s help file or through such sites as{' '}
            <a href="www.allaboutcookies.org" target="_blank">
              www.allaboutcookies.org
            </a>
            .
          </p>
          <p>
            Additionally, please note that blocking cookies may not completely prevent how we share information with third parties such as
            our advertising partners. To exercise your rights or opt-out of certain uses of your information by these parties, please follow
            the instructions in the “Behavioural Advertising” section above.
          </p>
          <h2 className="my-4 text-2xl">Do Not Track</h2>
          <p>
            Please note that because there is no consistent industry understanding of how to respond to “Do Not Track” signals, we do not
            alter our data collection and usage practices when we detect such a signal from your browser.
          </p>
        </> */}
        <h1 className="my-4 text-2xl font-normal">Changes</h1>
        <p>
          We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other
          operational, legal, or regulatory reasons.
        </p>
        <h1 className="my-4 text-2xl font-normal">Contact</h1>
        <p>
          For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact
          us by e-mail at&nbsp;<strong>rigly@rigly.io</strong> or by mail using the details provided below:
        </p>
        <p className="my-4">
          <strong>99 Hudson St, 5th Floor, New York NY 10013, United States</strong>
        </p>
        <p className="my-4">
          Last updated: <strong>August 30, 2022</strong>
        </p>
        <p>
          If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the relevant data
          protection authority. You can contact your local data protection authority, or our supervisory authority here:&nbsp;
          <strong>https://dos.ny.gov/file-consumer-complaint</strong>
        </p>
        <p>&nbsp;</p>
      </div>
    </Container>
  )
}
