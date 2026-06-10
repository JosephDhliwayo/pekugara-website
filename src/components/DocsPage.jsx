export default function DocsPage() {
  const sections = [
    { id: 'what',     label: '1. What is Pekugara?' },
    { id: 'why',      label: '2. Why Use Pekugara?' },
    { id: 'start',    label: '3. Getting Started' },
    { id: 'students', label: '4. For Students' },
    { id: 'landlords',label: '5. For Landlords' },
    { id: 'safety',   label: '6. Safety & Moderation' },
    { id: 'account',  label: '7. Account & Profile' },
    { id: 'notifs',   label: '8. Notifications' },
    { id: 'faq',      label: '9. FAQ' },
  ]

  return (
    <div className="docs-page">
      {/* Header */}
      <div className="docs-header">
        <a href="/" className="docs-back">← Back to Pekugara</a>
        <div className="docs-title-wrap">
          <img src="/icon.png" alt="Pekugara" className="docs-logo" />
          <div>
            <h1>User Documentation</h1>
            <p>Version 1.0.0 — Student housing, simplified.</p>
          </div>
          <a
            href="/pekugara-user-documentation.pdf"
            download="Pekugara-User-Documentation.pdf"
            className="docs-download-btn"
          >
            ⬇ Download PDF
          </a>
        </div>
      </div>

      <div className="docs-body">
        {/* Sidebar TOC */}
        <aside className="docs-toc">
          <p className="docs-toc-title">Table of Contents</p>
          <nav>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="docs-toc-link">{s.label}</a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="docs-content">

          {/* 1 */}
          <section id="what" className="docs-section">
            <h2>1. What is Pekugara?</h2>
            <p>
              Pekugara is a dedicated student housing platform built to connect university and college
              students in Zimbabwe with verified landlords offering affordable, nearby accommodation.
              The name <em>Pekugara</em> comes from the Shona word meaning <em>"a place to stay"</em> —
              and that is exactly what the platform delivers.
            </p>
            <p>
              Whether you are a student searching for a safe, affordable room close to campus, or a
              landlord looking to fill your property with reliable tenants, Pekugara provides a trusted,
              transparent, and easy-to-use environment to make that connection happen.
            </p>
          </section>

          {/* 2 */}
          <section id="why" className="docs-section">
            <h2>2. Why Use Pekugara?</h2>

            <h3>For Students</h3>
            <p>
              Finding student accommodation in Zimbabwe has traditionally been stressful, unreliable,
              and unsafe. Pekugara solves this by:
            </p>
            <ul>
              <li><strong>Verified listings only</strong> — every property is reviewed and approved by the Pekugara moderation team before appearing in the feed. No fake listings.</li>
              <li><strong>Verified landlords</strong> — landlords can earn a verified badge after identity review, giving students confidence in who they are dealing with.</li>
              <li><strong>Transparent pricing</strong> — rent prices are always displayed upfront. No hidden fees, no surprises.</li>
              <li><strong>Direct communication</strong> — students message landlords directly through in-app chat. No third-party agents, no commissions.</li>
              <li><strong>Safe environment</strong> — a built-in reporting and blocking system protects students from harassment or fraud.</li>
              <li><strong>Campus proximity</strong> — listings display their distance from your university.</li>
            </ul>

            <h3>For Landlords</h3>
            <ul>
              <li><strong>Free listings</strong> — post your property to hundreds of students actively searching for housing, at no cost.</li>
              <li><strong>Organised bookings</strong> — all viewing requests and tenant confirmations are managed in one place.</li>
              <li><strong>Pre-qualified leads</strong> — students pay a small booking fee to confirm serious interest, reducing time-wasters.</li>
              <li><strong>Verified badge</strong> — get a verification badge that increases student trust and improves listing visibility.</li>
              <li><strong>Direct messaging</strong> — communicate with interested students without giving out personal contact details prematurely.</li>
              <li><strong>Occupancy tracking</strong> — see at a glance how many spots are filled and how many are still available.</li>
            </ul>
          </section>

          {/* 3 */}
          <section id="start" className="docs-section">
            <h2>3. Getting Started</h2>

            <h3>3.1 Creating an Account</h3>
            <ol>
              <li>Open the Pekugara app.</li>
              <li>On the Welcome screen, tap:
                <ul>
                  <li><strong>"Find a Room"</strong> — to register as a student.</li>
                  <li><strong>"List your property"</strong> — to register as a landlord.</li>
                  <li><strong>"I already have an account"</strong> — to log in.</li>
                </ul>
              </li>
              <li>Fill in your details — name, email, password, and university (students) or phone number (landlords).</li>
              <li>Read and accept the <strong>Terms of Service and EULA</strong>.</li>
              <li>Tap <strong>"Create Account"</strong>.</li>
            </ol>
            <div className="docs-note">
              Your account is created instantly. Students can browse listings immediately. Landlords can post listings immediately, but listings require admin approval before going live.
            </div>

            <h3>3.2 Logging In</h3>
            <ol>
              <li>Tap <strong>"I already have an account"</strong> on the Welcome screen.</li>
              <li>Enter your registered <strong>email</strong> and <strong>password</strong>.</li>
              <li>Tap <strong>"Sign In"</strong>.</li>
            </ol>

            <h3>3.3 Account Verification</h3>
            <p>
              Getting <strong>verified</strong> adds a visible badge to your profile and increases trust with other users.
            </p>
            <ul>
              <li><strong>Students:</strong> Profile → Account Verification → submit supporting details.</li>
              <li><strong>Landlords:</strong> Profile → Account Verification → admin reviews property and identity details.</li>
            </ul>
            <p>Once approved, a green <strong>Verified</strong> badge will appear on your profile and listings.</p>
          </section>

          {/* 4 */}
          <section id="students" className="docs-section">
            <h2>4. For Students</h2>

            <h3>4.1 Browsing the Home Feed</h3>
            <p>After logging in, you land on the <strong>Home</strong> screen showing all available, admin-approved listings.</p>
            <ul>
              <li>Use the <strong>search bar</strong> to search by city, campus name, or area.</li>
              <li>Use <strong>filter chips</strong> to quickly filter by Near Campus, Furnished, WiFi, or Ensuite.</li>
              <li>Pull down to <strong>refresh</strong> listings.</li>
            </ul>

            <h3>4.2 Advanced Search</h3>
            <p>Tap the <strong>Search</strong> tab for more powerful filtering:</p>
            <ul>
              <li><strong>Price Range</strong> — drag the slider to set a maximum monthly rent.</li>
              <li><strong>City</strong> — Harare, Bulawayo, Mutare, Gweru, Masvingo.</li>
              <li><strong>University</strong> — UZ, MSU, NUST, Midlands State, Africa University.</li>
              <li><strong>Amenities</strong> — Furnished, WiFi, Ensuite, Parking, Utilities Included.</li>
              <li><strong>Sort By</strong> — Newest, Price Low to High, Price High to Low, Closest to Campus.</li>
            </ul>

            <h3>4.3 Saving Listings</h3>
            <p>Tap the <strong>heart icon</strong> on any listing card to save it. Access saved listings from the <strong>Saved</strong> tab.</p>

            <h3>4.4 Viewing a Listing in Detail</h3>
            <p>Tap any listing card to see the full detail screen including image gallery, property info, amenities, landlord card, and available actions.</p>

            <h3>4.5 Booking a Viewing</h3>
            <p>Students pay a <strong>$2 USD booking fee</strong> via EcoCash to request a viewing.</p>
            <ol>
              <li>Tap <strong>"Pay Booking Fee — $2"</strong> on the Detail screen.</li>
              <li>Enter your <strong>EcoCash phone number</strong>.</li>
              <li>Tap <strong>"Send Payment Request"</strong> and approve the prompt on your phone.</li>
              <li>Once confirmed, tap <strong>"Request a Viewing"</strong> and write a short message.</li>
              <li>Tap <strong>"Send Request"</strong>.</li>
            </ol>
            <div className="docs-note">
              The booking fee is a one-time fee that unlocks viewing requests across all listings. You only pay it once.
            </div>

            <h3>4.6 After Your Booking is Confirmed</h3>
            <p>Once a landlord confirms your booking, the Home screen switches to a "Housing Confirmed" view showing your confirmed property details, landlord contact, and a direct message button.</p>

            <h3>4.7 Messaging Landlords</h3>
            <p>Once you have paid the booking fee, tap <strong>"Message Landlord"</strong> on any listing's detail screen. All conversations are accessible from the <strong>Chats</strong> tab.</p>

            <h3>4.8 Viewing Your Booking Requests</h3>
            <p>Go to <strong>Profile → My Viewing Requests</strong> to see all requests and their status:</p>
            <div className="docs-table-wrap">
              <table>
                <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
                <tbody>
                  <tr><td><span className="docs-badge pending">Pending</span></td><td>The landlord has not yet responded.</td></tr>
                  <tr><td><span className="docs-badge confirmed">Confirmed</span></td><td>The landlord accepted your request.</td></tr>
                  <tr><td><span className="docs-badge rejected">Rejected</span></td><td>The landlord declined your request.</td></tr>
                  <tr><td><span className="docs-badge cancelled">Cancelled</span></td><td>You or the landlord cancelled the request.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5 */}
          <section id="landlords" className="docs-section">
            <h2>5. For Landlords</h2>

            <h3>5.1 The Landlord Dashboard</h3>
            <p>After logging in, landlords see a <strong>Dashboard</strong> showing total listings, confirmed bookings, and pending requests.</p>

            <h3>5.2 Adding a New Listing</h3>
            <p>Tap <strong>"Add new listing"</strong> from the dashboard and fill in:</p>
            <ul>
              <li><strong>Basic Info:</strong> title, description, monthly rent in USD.</li>
              <li><strong>Location:</strong> city, address, nearest university, distance in km.</li>
              <li><strong>Rooms:</strong> bedrooms, bathrooms, max tenant capacity.</li>
              <li><strong>Amenities:</strong> Furnished, Ensuite, WiFi, Parking, Utilities Included.</li>
              <li><strong>Photos:</strong> minimum 5, maximum 10. First photo is the cover image.</li>
            </ul>
            <p>Tap <strong>"Publish Listing"</strong> to submit for admin review. Once approved it goes live to all students.</p>

            <h3>5.3 Managing Your Listings</h3>
            <p>Go to <strong>My Listings</strong> to manage properties, view occupancy, and respond to booking requests:</p>
            <div className="docs-table-wrap">
              <table>
                <thead><tr><th>Action</th><th>Result</th></tr></thead>
                <tbody>
                  <tr><td><strong>Confirm</strong></td><td>Student is marked as housed and their feed locks to your property.</td></tr>
                  <tr><td><strong>Reject</strong></td><td>Request is declined. Student can apply elsewhere.</td></tr>
                  <tr><td><strong>Remove</strong></td><td>Removes a confirmed student. Student is notified housing was cancelled.</td></tr>
                </tbody>
              </table>
            </div>

            <h3>5.4 Getting Verified</h3>
            <ol>
              <li>Go to <strong>Profile → Account Verification</strong>.</li>
              <li>Tap <strong>"Request Verification"</strong>.</li>
              <li>Enter supporting notes and submit.</li>
            </ol>
            <p>An admin will review your submission and notify you of the outcome.</p>
          </section>

          {/* 6 */}
          <section id="safety" className="docs-section">
            <h2>6. Safety &amp; Moderation</h2>

            <h3>6.1 Content Moderation</h3>
            <ul>
              <li>All listings are <strong>reviewed by a human admin</strong> before going live.</li>
              <li>The in-app chat has a built-in <strong>offensive language filter</strong> that blocks abusive messages before they are sent.</li>
            </ul>

            <h3>6.2 Reporting a User or Listing</h3>
            <p><strong>To report a listing:</strong></p>
            <ol>
              <li>Open the listing Detail screen.</li>
              <li>Tap the <strong>flag icon</strong> in the top-right corner.</li>
              <li>Select a reason: Inappropriate Content, Spam/Misleading, Fraud/Scam, Harassment/Abuse, or Other.</li>
              <li>Tap <strong>Submit Report</strong>.</li>
            </ol>
            <p><strong>To report a user from chat:</strong></p>
            <ol>
              <li>Open the chat, tap the <strong>⋮ menu</strong>.</li>
              <li>Tap <strong>"Report [Name]"</strong>, select a reason and submit.</li>
            </ol>
            <div className="docs-note">
              All reports are reviewed within 24 hours. False reports made in bad faith may result in action against the reporting account.
            </div>

            <h3>6.3 Blocking a User</h3>
            <ol>
              <li>Open your chat with that user.</li>
              <li>Tap the <strong>⋮ menu → "Block [Name]"</strong>.</li>
              <li>Confirm by tapping <strong>"Block"</strong>.</li>
            </ol>
            <p>Blocking removes their listings from your feed and automatically notifies the moderation team.</p>

            <h3>6.4 Managing Blocked Users</h3>
            <p>Go to <strong>Profile → Safety → Blocked users</strong> to view or unblock anyone you have blocked.</p>
          </section>

          {/* 7 */}
          <section id="account" className="docs-section">
            <h2>7. Account &amp; Profile Management</h2>

            <h3>7.1 Editing Your Profile</h3>
            <ol>
              <li>Go to the <strong>Profile</strong> tab.</li>
              <li>Tap <strong>"Edit"</strong> next to Personal Info.</li>
              <li>Update your name, university (students), or phone number. Email cannot be changed.</li>
              <li>Tap <strong>"Save"</strong>.</li>
            </ol>

            <h3>7.2 Logging Out</h3>
            <p>Go to <strong>Profile</strong> → tap the <strong>logout icon</strong> → confirm <strong>"Log out"</strong>.</p>

            <h3>7.3 Deleting Your Account</h3>
            <div className="docs-warning">
              Account deletion is permanent and cannot be undone. All your data — listings, bookings, messages, and profile — will be erased.
            </div>
            <p>Go to <strong>Profile → Delete Account</strong> and confirm twice in the prompts.</p>
          </section>

          {/* 8 */}
          <section id="notifs" className="docs-section">
            <h2>8. Notifications</h2>
            <p>Pekugara sends both <strong>in-app</strong> and <strong>push notifications</strong> to keep you informed in real time.</p>
            <div className="docs-table-wrap">
              <table>
                <thead><tr><th>Notification</th><th>Who receives it</th><th>Meaning</th></tr></thead>
                <tbody>
                  <tr><td>New booking request</td><td>Landlord</td><td>A student submitted a viewing request.</td></tr>
                  <tr><td>Booking confirmed</td><td>Student</td><td>A landlord accepted your viewing request.</td></tr>
                  <tr><td>Booking rejected</td><td>Student</td><td>A landlord declined your viewing request.</td></tr>
                  <tr><td>Booking cancelled</td><td>Student</td><td>Your confirmed housing was cancelled.</td></tr>
                </tbody>
              </table>
            </div>
            <p>Access all notifications from <strong>Profile → the bell icon</strong> in the top-right corner.</p>
          </section>

          {/* 9 */}
          <section id="faq" className="docs-section">
            <h2>9. Frequently Asked Questions</h2>
            <div className="docs-faq">
              {[
                { q: 'Is Pekugara free to use?', a: 'Yes. Creating an account, browsing listings, saving listings, and messaging landlords are all free. Students pay a one-time $2 USD booking fee via EcoCash to unlock viewing requests.' },
                { q: 'Why do I need to pay a $2 booking fee?', a: 'The booking fee confirms that you are a serious student looking for accommodation. It is a one-time fee and unlocks viewing requests across all listings on the platform.' },
                { q: 'How do I know a listing is genuine?', a: 'Every listing on Pekugara is manually reviewed and approved by our moderation team before it appears in the feed. You can also check whether the landlord has a Verified badge on their profile.' },
                { q: 'I paid the booking fee but the listing was taken. Can I get a refund?', a: 'The $2 booking fee unlocks the ability to send viewing requests across the entire platform — it is not tied to a specific listing. It is not refundable once paid.' },
                { q: 'Can a landlord see my contact details?', a: 'Your profile shows your name and university (students) or phone number (landlords) to the other party once a booking request is made. All earlier communication happens securely within the in-app chat.' },
                { q: 'What happens if a landlord never responds to my request?', a: 'You can cancel a pending request at any time from Profile → My Viewing Requests and send a request to a different property. If a landlord is consistently unresponsive, you may report them.' },
                { q: 'Does it cost anything to list my property as a landlord?', a: 'No. Posting listings on Pekugara is completely free for landlords.' },
                { q: 'How long does admin approval take for a new listing?', a: 'Listings are typically reviewed within 24 hours. You will receive an in-app notification once your listing is approved and live.' },
                { q: 'What should I do if I experience harassment?', a: 'Block the user immediately from the chat screen (⋮ menu → Block). This removes them from your feed and automatically notifies our moderation team, who will review the case within 24 hours.' },
                { q: 'Can I use Pekugara if I am not a student?', a: 'Pekugara is designed specifically for students and landlords serving the student market. General members of the public can register as landlords to list properties.' },
              ].map(({ q, a }) => (
                <div key={q} className="docs-faq-item">
                  <p className="docs-faq-q">{q}</p>
                  <p className="docs-faq-a">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="docs-footer">
            <p>For further support, contact us at <a href="mailto:support@pekugara.com">support@pekugara.com</a></p>
            <p>© 2026 Pekugara. All rights reserved.</p>
          </div>
        </main>
      </div>
    </div>
  )
}
