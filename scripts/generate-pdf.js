import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'public', 'pekugara-user-documentation.pdf')

const GREEN  = '#2dcc7a'
const BG     = '#0d1117'
const TEXT   = '#f0f6fc'
const MUTED  = '#8b949e'
const BORDER = '#21262d'

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 60, bottom: 60, left: 60, right: 60 },
  info: {
    Title:    'Pekugara User Documentation',
    Author:   'Pekugara',
    Subject:  'Student Housing Platform — User Guide',
    Keywords: 'pekugara student housing zimbabwe accommodation',
  },
})

doc.pipe(fs.createWriteStream(OUT))

const W = doc.page.width - 120  // usable width

// ── Helpers ──────────────────────────────────────────────

function h1(text) {
  doc.moveDown(0.5)
  doc.fontSize(22).fillColor(GREEN).font('Helvetica-Bold').text(text)
  doc.moveDown(0.3)
  doc.moveTo(60, doc.y).lineTo(60 + W, doc.y).strokeColor(BORDER).lineWidth(1).stroke()
  doc.moveDown(0.5)
}

function h2(text) {
  doc.moveDown(0.8)
  doc.fontSize(14).fillColor(GREEN).font('Helvetica-Bold').text(text)
  doc.moveDown(0.3)
}

function h3(text) {
  doc.moveDown(0.5)
  doc.fontSize(12).fillColor(TEXT).font('Helvetica-Bold').text(text)
  doc.moveDown(0.2)
}

function body(text) {
  doc.fontSize(10).fillColor('#c9d1d9').font('Helvetica').text(text, { lineGap: 4 })
  doc.moveDown(0.3)
}

function bullet(items) {
  items.forEach(item => {
    doc.fontSize(10).fillColor('#c9d1d9').font('Helvetica')
      .text(`• ${item}`, { lineGap: 3, indent: 16 })
  })
  doc.moveDown(0.3)
}

function numbered(items) {
  items.forEach((item, i) => {
    doc.fontSize(10).fillColor('#c9d1d9').font('Helvetica')
      .text(`${i + 1}.  ${item}`, { lineGap: 3, indent: 16 })
  })
  doc.moveDown(0.3)
}

function note(text) {
  const y = doc.y
  doc.rect(60, y, 4, 0).fillColor(GREEN)
  doc.fontSize(9).fillColor(GREEN).font('Helvetica')
    .text(text, 72, y, { width: W - 12, lineGap: 3 })
  doc.moveDown(0.4)
}

function faqItem(q, a) {
  doc.fontSize(10).fillColor(TEXT).font('Helvetica-Bold').text(`Q: ${q}`)
  doc.fontSize(10).fillColor(MUTED).font('Helvetica').text(`A: ${a}`, { lineGap: 3 })
  doc.moveDown(0.5)
}

function tableRow(cols, widths, isHeader = false) {
  const y = doc.y
  let x = 60
  const rowH = 20
  cols.forEach((col, i) => {
    if (isHeader) {
      doc.rect(x, y, widths[i], rowH).fillColor('#1c2128').fill()
    }
    doc.fontSize(9)
      .fillColor(isHeader ? GREEN : '#c9d1d9')
      .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
      .text(col, x + 6, y + 5, { width: widths[i] - 12, ellipsis: true })
    x += widths[i]
  })
  doc.rect(60, y, W, rowH).strokeColor(BORDER).lineWidth(0.5).stroke()
  doc.y = y + rowH
}

// ── Cover Page ────────────────────────────────────────────

doc.rect(0, 0, doc.page.width, doc.page.height).fill(BG)

doc.rect(0, 0, doc.page.width, 8).fill(GREEN)

doc.fontSize(32).fillColor(GREEN).font('Helvetica-Bold')
  .text('Pekugara', 60, 120)

doc.fontSize(18).fillColor(TEXT).font('Helvetica')
  .text('User Documentation', 60, 162)

doc.fontSize(12).fillColor(MUTED).font('Helvetica')
  .text('Version 1.0.0  —  Student housing, simplified.', 60, 190)

doc.moveTo(60, 220).lineTo(60 + W, 220).strokeColor(GREEN).lineWidth(2).stroke()

const sections = [
  '1. What is Pekugara?',
  '2. Why Use Pekugara?',
  '3. Getting Started',
  '4. For Students',
  '5. For Landlords',
  '6. Safety & Moderation',
  '7. Account & Profile Management',
  '8. Notifications',
  '9. Frequently Asked Questions',
]

doc.fontSize(11).fillColor(MUTED).font('Helvetica').text('Table of Contents', 60, 240)
doc.moveDown(0.5)
sections.forEach(s => {
  doc.fontSize(10).fillColor('#c9d1d9').text(`  ${s}`, { lineGap: 4 })
})

doc.fontSize(10).fillColor(MUTED).font('Helvetica')
  .text('support@pekugara.com  |  pekugara.com', 60, doc.page.height - 80)
doc.text('© 2026 Pekugara. All rights reserved.', 60, doc.page.height - 64)

// ── Section 1 ─────────────────────────────────────────────
doc.addPage({ background: BG })
doc.rect(0, 0, doc.page.width, doc.page.height).fill(BG)

h1('1. What is Pekugara?')
body('Pekugara is a dedicated student housing platform built to connect university and college students in Zimbabwe with verified landlords offering affordable, nearby accommodation. The name Pekugara comes from the Shona word meaning "a place to stay" — and that is exactly what the platform delivers.')
body('Whether you are a student searching for a safe, affordable room close to campus, or a landlord looking to fill your property with reliable tenants, Pekugara provides a trusted, transparent, and easy-to-use environment to make that connection happen.')

// ── Section 2 ─────────────────────────────────────────────
h1('2. Why Use Pekugara?')

h3('For Students')
body('Finding student accommodation in Zimbabwe has traditionally been stressful, unreliable, and unsafe. Pekugara solves this by:')
bullet([
  'Verified listings only — every property is reviewed and approved before appearing in the feed.',
  'Verified landlords — landlords earn a verified badge after identity review.',
  'Transparent pricing — rent prices are always displayed upfront. No hidden fees.',
  'Direct communication — students message landlords directly. No agents, no commissions.',
  'Safe environment — built-in reporting and blocking system protects students.',
  'Campus proximity — listings display their distance from your university.',
])

h3('For Landlords')
bullet([
  'Free listings — post your property to hundreds of students at no cost.',
  'Organised bookings — all viewing requests managed in one place.',
  'Pre-qualified leads — students pay a booking fee to confirm serious interest.',
  'Verified badge — increases student trust and improves listing visibility.',
  'Direct messaging — communicate without giving out personal contact details.',
  'Occupancy tracking — see how many spots are filled vs. available.',
])

// ── Section 3 ─────────────────────────────────────────────
doc.addPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill(BG)

h1('3. Getting Started')

h2('3.1 Creating an Account')
numbered([
  'Open the Pekugara app.',
  'On the Welcome screen, tap "Find a Room" (student), "List your property" (landlord), or "I already have an account" (login).',
  'Fill in your details — name, email, password, and university (students) or phone number (landlords).',
  'Read and accept the Terms of Service and EULA.',
  'Tap "Create Account".',
])
note('Your account is created instantly. Students can browse listings immediately. Landlords can post listings immediately, but listings require admin approval before going live.')

h2('3.2 Logging In')
numbered([
  'Tap "I already have an account" on the Welcome screen.',
  'Enter your registered email and password.',
  'Tap "Sign In".',
])

h2('3.3 Account Verification')
body('Getting verified adds a visible badge to your profile and increases trust with other users.')
bullet([
  'Students: Profile → Account Verification → submit supporting details (e.g., student ID).',
  'Landlords: Profile → Account Verification → admin reviews property and identity details.',
])
body('Once approved, a green Verified badge will appear on your profile and all listings.')

// ── Section 4 ─────────────────────────────────────────────
doc.addPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill(BG)

h1('4. For Students')

h2('4.1 Browsing the Home Feed')
body('After logging in, you land on the Home screen showing all available, admin-approved listings.')
bullet([
  'Use the search bar to search by city, campus name, or area.',
  'Use filter chips to quickly filter by Near Campus, Furnished, WiFi, or Ensuite.',
  'Pull down on the feed to refresh listings.',
])

h2('4.2 Advanced Search')
body('Tap the Search tab for more powerful filtering:')
bullet([
  'Price Range — drag the slider to set a maximum monthly rent.',
  'City — Harare, Bulawayo, Mutare, Gweru, Masvingo.',
  'University — UZ, MSU, NUST, Midlands State, Africa University.',
  'Amenities — Furnished, WiFi, Ensuite, Parking, Utilities Included.',
  'Sort By — Newest, Price Low to High, Price High to Low, Closest to Campus.',
])

h2('4.3 Saving Listings')
body('Tap the heart icon on any listing card to save it. Access saved listings from the Saved tab in the bottom navigation.')

h2('4.4 Viewing a Listing in Detail')
body('Tap any listing card to open the full detail screen including image gallery, property info, amenities grid, landlord card, and available actions (save, report, book).')

h2('4.5 Booking a Viewing')
body('Students pay a $2 USD booking fee via EcoCash to request a viewing. This confirms serious interest.')
numbered([
  'Tap "Pay Booking Fee — $2" on the Detail screen.',
  'Enter your EcoCash phone number.',
  'Tap "Send Payment Request" and approve the prompt on your phone.',
  'The app confirms payment automatically within 3 minutes.',
  'Tap "Request a Viewing" and write a short message to the landlord.',
  'Tap "Send Request".',
])
note('The booking fee is a one-time fee that unlocks viewing requests across all listings. You only pay it once.')

h2('4.6 After Your Booking is Confirmed')
body('Once a landlord confirms your booking, the Home screen switches to a "Housing Confirmed" view showing your confirmed property details, landlord contact, and a direct message button.')

h2('4.7 Messaging Landlords')
body('Once you have paid the booking fee, tap "Message Landlord" on any listing\'s detail screen. All conversations are accessible from the Chats tab in the bottom navigation.')

h2('4.8 Viewing Your Booking Requests')
body('Go to Profile → My Viewing Requests to see all requests and their status:')
const statusW = [W * 0.3, W * 0.7]
tableRow(['Status', 'Meaning'], statusW, true)
tableRow(['Pending',   'The landlord has not yet responded.'], statusW)
tableRow(['Confirmed', 'The landlord accepted your request.'], statusW)
tableRow(['Rejected',  'The landlord declined your request.'], statusW)
tableRow(['Cancelled', 'You or the landlord cancelled the request.'], statusW)
doc.moveDown(0.5)

// ── Section 5 ─────────────────────────────────────────────
doc.addPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill(BG)

h1('5. For Landlords')

h2('5.1 The Landlord Dashboard')
body('After logging in, landlords see a Dashboard showing total listings, confirmed bookings, and pending viewing requests. Quick action cards navigate to My Listings or Add New Listing.')

h2('5.2 Adding a New Listing')
body('Tap "Add new listing" from the dashboard and fill in all required fields:')
bullet([
  'Basic Info: property title, description, monthly rent in USD.',
  'Location: city, full address, nearest university, distance in km.',
  'Rooms: number of bedrooms, bathrooms, and maximum tenant capacity.',
  'Amenities: Furnished, Ensuite, WiFi, Parking, Utilities Included.',
  'Photos: minimum 5, maximum 10. The first photo becomes the cover image.',
])
body('Tap "Publish Listing" to submit for admin review. Once approved the listing goes live to all students.')

h2('5.3 Managing Your Listings')
body('Go to My Listings to manage properties, view occupancy, and respond to booking requests:')
const actionW = [W * 0.2, W * 0.8]
tableRow(['Action', 'Result'], actionW, true)
tableRow(['Confirm', 'Student is marked as housed and their feed locks to your property. They receive a push notification.'], actionW)
tableRow(['Reject',  'Request is declined. Student receives a rejection notification and can apply elsewhere.'], actionW)
tableRow(['Remove',  'Removes a confirmed student. Student is notified that their housing was cancelled.'], actionW)
doc.moveDown(0.5)

h2('5.4 Getting Verified')
numbered([
  'Go to Profile → Account Verification.',
  'Tap "Request Verification".',
  'Enter supporting notes (e.g., property ownership details).',
  'Submit your request — an admin will review and notify you of the outcome.',
])

// ── Section 6 ─────────────────────────────────────────────
doc.addPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill(BG)

h1('6. Safety & Moderation')

h2('6.1 Content Moderation')
bullet([
  'All listings are reviewed by a human admin before going live.',
  'The in-app chat has a built-in offensive language filter that blocks abusive messages before they are sent.',
])

h2('6.2 Reporting a Listing')
numbered([
  'Open the listing Detail screen.',
  'Tap the flag icon in the top-right corner.',
  'Select a reason: Inappropriate Content, Spam/Misleading, Fraud/Scam, Harassment/Abuse, or Other.',
  'Optionally add a description, then tap Submit Report.',
])

h2('6.3 Reporting a User from Chat')
numbered([
  'Open the chat with that user.',
  'Tap the ⋮ menu in the top-right corner.',
  'Tap "Report [Name]", select a reason and submit.',
])
note('All reports are reviewed within 24 hours. False reports made in bad faith may result in action against the reporting account.')

h2('6.4 Blocking a User')
numbered([
  'Open your chat with that user.',
  'Tap the ⋮ menu → "Block [Name]".',
  'Confirm by tapping "Block" in the prompt.',
])
body('Blocking immediately removes their listings from your feed and automatically notifies the moderation team.')

h2('6.5 Managing Blocked Users')
body('Go to Profile → Safety → Blocked users to view all users you have blocked. Tap "Unblock" next to any user to remove the block.')

// ── Section 7 ─────────────────────────────────────────────
h1('7. Account & Profile Management')

h2('7.1 Editing Your Profile')
numbered([
  'Go to the Profile tab.',
  'Tap "Edit" next to Personal Info.',
  'Update your name, university (students), or phone number. Note: email cannot be changed.',
  'Tap "Save" to apply changes.',
])

h2('7.2 Logging Out')
body('Go to Profile → tap the logout icon (arrow pointing out) in the top-right corner → confirm "Log out".')

h2('7.3 Deleting Your Account')
note('Account deletion is permanent and cannot be undone. All your data — listings, bookings, messages, and profile — will be permanently erased.')
body('Go to Profile → scroll to the bottom → tap "Delete Account" → confirm twice in the prompts that appear.')

// ── Section 8 ─────────────────────────────────────────────
doc.addPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill(BG)

h1('8. Notifications')
body('Pekugara sends both in-app notifications and push notifications to keep you informed in real time.')

const nW = [W * 0.35, W * 0.25, W * 0.4]
tableRow(['Notification', 'Recipient', 'Meaning'], nW, true)
tableRow(['New booking request',  'Landlord', 'A student submitted a viewing request.'], nW)
tableRow(['Booking confirmed',    'Student',  'A landlord accepted your viewing request.'], nW)
tableRow(['Booking rejected',     'Student',  'A landlord declined your viewing request.'], nW)
tableRow(['Booking cancelled',    'Student',  'Your confirmed housing was cancelled.'], nW)
doc.moveDown(0.5)

body('Access all notifications from Profile → the bell icon in the top-right corner. All notifications are marked as read automatically when you open the Notifications screen.')

// ── Section 9 ─────────────────────────────────────────────
h1('9. Frequently Asked Questions')

const faqs = [
  ['Is Pekugara free to use?', 'Yes. Creating an account, browsing listings, saving listings, and messaging landlords are all free. Students pay a one-time $2 USD booking fee via EcoCash to unlock viewing requests.'],
  ['Why do I need to pay a $2 booking fee?', 'The booking fee confirms that you are a serious student looking for accommodation. It is a one-time fee and unlocks viewing requests across all listings on the platform.'],
  ['How do I know a listing is genuine?', 'Every listing is manually reviewed and approved by our moderation team before it appears in the feed. You can also check whether the landlord has a Verified badge on their profile.'],
  ['I paid the booking fee but the listing was taken. Can I get a refund?', 'The $2 booking fee unlocks the ability to send viewing requests across the entire platform — it is not tied to a specific listing and is not refundable once paid.'],
  ['Can a landlord see my contact details?', 'Your profile shows your name and university (students) or phone number (landlords) to the other party once a booking request is made. All earlier communication happens securely within the in-app chat.'],
  ['What happens if a landlord never responds to my request?', 'You can cancel a pending request at any time from Profile → My Viewing Requests and send a request to a different property. If a landlord is consistently unresponsive, you may report them.'],
  ['Does it cost anything to list my property as a landlord?', 'No. Posting listings on Pekugara is completely free for landlords.'],
  ['How long does admin approval take for a new listing?', 'Listings are typically reviewed within 24 hours. You will receive an in-app notification once your listing is approved and live.'],
  ['What should I do if I experience harassment?', 'Block the user immediately from the chat screen (⋮ menu → Block). This removes them from your feed and automatically notifies our moderation team who will review the case within 24 hours.'],
  ['Can I use Pekugara if I am not a student?', 'Pekugara is designed for students and landlords serving the student market. General members of the public can register as landlords to list properties, but the platform is optimised for student housing in Zimbabwe.'],
]

faqs.forEach(([q, a]) => faqItem(q, a))

// ── Last page footer ──────────────────────────────────────
doc.moveDown(2)
doc.moveTo(60, doc.y).lineTo(60 + W, doc.y).strokeColor(BORDER).lineWidth(1).stroke()
doc.moveDown(0.5)
doc.fontSize(10).fillColor(MUTED).font('Helvetica')
  .text('For further support, contact us at support@pekugara.com', { align: 'center' })
doc.fontSize(10).fillColor(MUTED)
  .text('pekugara.com  |  © 2026 Pekugara. All rights reserved.', { align: 'center' })

doc.end()
console.log('PDF generated:', OUT)
