import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'public', 'pekugara-user-documentation.pdf')

// ── Palette ───────────────────────────────────────────────
const C = {
  green:      '#2dcc7a',
  greenDark:  '#1a7a49',
  greenLight: '#e8f8ef',
  ink:        '#0f1923',
  body:       '#2d3748',
  muted:      '#718096',
  border:     '#e2e8f0',
  bg:         '#f7fafc',
  white:      '#ffffff',
  accent:     '#1a4731',
  noteYellow: '#fffbeb',
  noteBorder: '#f59e0b',
  warnBg:     '#fff5f5',
  warnBorder: '#fc8181',
}

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 72, bottom: 72, left: 64, right: 64 },
  bufferPages: true,
  info: {
    Title:    'Pekugara User Documentation',
    Author:   'Pekugara',
    Subject:  'Student Housing Platform — User Guide v1.0.0',
    Keywords: 'pekugara student housing zimbabwe accommodation guide',
    Creator:  'Pekugara Documentation System',
  },
})

doc.pipe(fs.createWriteStream(OUT))

const PW = doc.page.width   // 595
const PH = doc.page.height  // 842
const ML = 64               // left margin
const MR = 64               // right margin
const W  = PW - ML - MR     // 467

let currentSection = ''

// ── Running header / footer ───────────────────────────────
function addPageDecorations(title = '') {
  const savedY = doc.y

  // Top bar
  doc.rect(0, 0, PW, 40).fill(C.ink)
  doc.rect(0, 0, 6, 40).fill(C.green)

  // Header logo text
  doc.fontSize(9).fillColor(C.green).font('Helvetica-Bold')
    .text('PEKUGARA', ML, 14)
  doc.fontSize(9).fillColor('#8b949e').font('Helvetica')
    .text(title || currentSection, ML + 70, 14)

  // Page number (right-aligned in header)
  const pageNum = doc.bufferedPageRange
    ? `Page ${doc.bufferedPageRange().start + doc._pageBuffer.length}`
    : ''

  // Bottom footer
  doc.rect(0, PH - 36, PW, 36).fill(C.bg)
  doc.moveTo(0, PH - 36).lineTo(PW, PH - 36).strokeColor(C.border).lineWidth(0.5).stroke()
  doc.fontSize(8).fillColor(C.muted).font('Helvetica')
    .text('pekugara.com  ·  support@pekugara.com  ·  © 2026 Pekugara. All rights reserved.',
      ML, PH - 22, { width: W, align: 'left' })

  doc.y = savedY
}

// ── Helpers ───────────────────────────────────────────────

function sectionChip(num, label) {
  currentSection = `${num}. ${label}`
  doc.moveDown(0.8)
  const y = doc.y
  // Pill background
  doc.rect(ML, y, W, 36).fill(C.ink).stroke()
  doc.rect(ML, y, 6, 36).fill(C.green)
  doc.fontSize(13).fillColor(C.green).font('Helvetica-Bold')
    .text(`${num}.`, ML + 18, y + 10)
  doc.fontSize(13).fillColor(C.white).font('Helvetica-Bold')
    .text(label, ML + 36, y + 10)
  doc.y = y + 46
}

function h2(text) {
  doc.moveDown(0.7)
  doc.fontSize(11).fillColor(C.greenDark).font('Helvetica-Bold').text(text)
  doc.moveDown(0.15)
  doc.moveTo(ML, doc.y).lineTo(ML + W, doc.y)
    .strokeColor(C.green).lineWidth(1.5).stroke()
  doc.moveDown(0.35)
}

function h3(text) {
  doc.moveDown(0.5)
  doc.fontSize(10).fillColor(C.ink).font('Helvetica-Bold').text(text)
  doc.moveDown(0.2)
}

function body(text) {
  doc.fontSize(10).fillColor(C.body).font('Helvetica')
    .text(text, { lineGap: 3.5, align: 'justify' })
  doc.moveDown(0.35)
}

function bullet(items) {
  items.forEach(item => {
    const y = doc.y
    // Green dot
    doc.circle(ML + 7, y + 5.5, 2.5).fill(C.green)
    doc.fontSize(10).fillColor(C.body).font('Helvetica')
      .text(item, ML + 18, y, { width: W - 18, lineGap: 3 })
  })
  doc.moveDown(0.35)
}

function numbered(items) {
  items.forEach((item, i) => {
    const y = doc.y
    doc.fontSize(9).fillColor(C.white).font('Helvetica-Bold')
    doc.circle(ML + 8, y + 5.5, 7).fill(C.green)
    doc.text(`${i + 1}`, ML + 5, y + 1.5, { width: 14, align: 'center' })
    doc.fontSize(10).fillColor(C.body).font('Helvetica')
      .text(item, ML + 22, y, { width: W - 22, lineGap: 3 })
  })
  doc.moveDown(0.4)
}

function note(text, type = 'info') {
  const bg     = type === 'warn' ? C.warnBg     : C.noteYellow
  const border = type === 'warn' ? C.warnBorder : C.noteBorder
  const icon   = type === 'warn' ? '⚠' : 'ℹ'
  doc.moveDown(0.2)
  const y = doc.y
  const lines = doc.heightOfString(text, { width: W - 28, fontSize: 9 })
  const boxH = lines + 20
  doc.rect(ML, y, W, boxH).fill(bg)
  doc.rect(ML, y, 3, boxH).fill(border)
  doc.fontSize(9).fillColor(border).font('Helvetica-Bold').text(icon, ML + 8, y + 6)
  doc.fontSize(9).fillColor('#744210').font('Helvetica')
    .text(text, ML + 20, y + 6, { width: W - 28, lineGap: 2.5 })
  doc.y = y + boxH + 6
  doc.moveDown(0.2)
}

function tableHeader(cols, widths) {
  const y = doc.y
  let x = ML
  doc.rect(ML, y, W, 22).fill(C.ink)
  cols.forEach((col, i) => {
    doc.fontSize(9).fillColor(C.green).font('Helvetica-Bold')
      .text(col.toUpperCase(), x + 8, y + 6, { width: widths[i] - 16 })
    x += widths[i]
  })
  doc.y = y + 22
}

function tableRow(cols, widths, alt = false) {
  const y = doc.y
  const textH = Math.max(...cols.map((c, i) =>
    doc.heightOfString(String(c), { width: widths[i] - 16, fontSize: 9 })
  ))
  const rowH = textH + 14
  let x = ML
  if (alt) doc.rect(ML, y, W, rowH).fill(C.bg)
  doc.rect(ML, y, W, rowH).strokeColor(C.border).lineWidth(0.5).stroke()
  cols.forEach((col, i) => {
    doc.fontSize(9).fillColor(C.body).font('Helvetica')
      .text(String(col), x + 8, y + 7, { width: widths[i] - 16, lineGap: 2 })
    x += widths[i]
  })
  doc.y = y + rowH
}

function divider() {
  doc.moveDown(0.8)
  doc.moveTo(ML, doc.y).lineTo(ML + W, doc.y)
    .strokeColor(C.border).lineWidth(0.5).stroke()
  doc.moveDown(0.8)
}

function newPage(sectionTitle) {
  doc.addPage()
  doc.rect(0, 0, PW, PH).fill(C.white)
  addPageDecorations(sectionTitle)
  doc.y = 58
}

// ═══════════════════════════════════════════════════════════
// COVER PAGE
// ═══════════════════════════════════════════════════════════

doc.rect(0, 0, PW, PH).fill(C.white)

// Top accent strip
doc.rect(0, 0, PW, 10).fill(C.green)

// Left dark panel
doc.rect(0, 0, 220, PH).fill(C.ink)
doc.rect(0, 0, 6, PH).fill(C.green)

// Decorative circles on left panel
doc.circle(110, 280, 130).fill('#1a2332').stroke()
doc.circle(110, 280, 90).fill('#1e2d40').stroke()
doc.circle(110, 280, 50).fill(C.green).stroke()

// App name on left panel
doc.fontSize(28).fillColor(C.white).font('Helvetica-Bold')
  .text('Pekugara', 24, 80, { width: 180 })
doc.fontSize(11).fillColor(C.green).font('Helvetica')
  .text('Student housing, simplified.', 24, 116, { width: 180 })

// Divider line on left
doc.moveTo(24, 140).lineTo(196, 140).strokeColor(C.green).lineWidth(1.5).stroke()

// TOC on left panel
doc.fontSize(8).fillColor('#8b949e').font('Helvetica-Bold')
  .text('CONTENTS', 24, 155)
doc.moveDown(0.4)

const toc = [
  ['01', 'What is Pekugara?'],
  ['02', 'Why Use Pekugara?'],
  ['03', 'Getting Started'],
  ['04', 'For Students'],
  ['05', 'For Landlords'],
  ['06', 'Safety & Moderation'],
  ['07', 'Account & Profile'],
  ['08', 'Notifications'],
  ['09', 'FAQ'],
]

toc.forEach(([num, label]) => {
  const ty = doc.y
  doc.fontSize(8).fillColor(C.green).font('Helvetica-Bold').text(num, 24, ty, { width: 20 })
  doc.fontSize(8).fillColor('#c9d1d9').font('Helvetica').text(label, 46, ty, { width: 164 })
  doc.moveDown(0.45)
})

// Version / date at bottom of left panel
doc.fontSize(8).fillColor('#4a5568').font('Helvetica')
  .text('Version 1.0.0', 24, PH - 80, { width: 180 })
  .text('© 2026 Pekugara', 24, PH - 66, { width: 180 })

// Right panel content
doc.fontSize(36).fillColor(C.ink).font('Helvetica-Bold')
  .text('User', 256, 120)
doc.fontSize(36).fillColor(C.green).font('Helvetica-Bold')
  .text('Documentation', 256, 162)

doc.moveTo(256, 212).lineTo(256 + 290, 212).strokeColor(C.green).lineWidth(2).stroke()

doc.fontSize(11).fillColor(C.body).font('Helvetica')
  .text(
    'A complete guide to finding student accommodation\nin Zimbabwe using the Pekugara app.',
    256, 225, { width: 290, lineGap: 4 }
  )

// Feature pills
const pills = ['500+ Listings', '10+ Cities', 'Verified Landlords', 'Free to Download']
let px = 256
let py = 285
pills.forEach(pill => {
  const pw2 = doc.widthOfString(pill, { fontSize: 9 }) + 20
  if (px + pw2 > 256 + 290) { px = 256; py += 26 }
  doc.roundedRect(px, py, pw2, 20, 10).fill(C.greenLight)
  doc.fontSize(9).fillColor(C.greenDark).font('Helvetica-Bold').text(pill, px + 10, py + 5)
  px += pw2 + 8
})

// Large decorative "P" watermark
doc.fontSize(220).fillColor('#f0f0f0').font('Helvetica-Bold')
  .text('P', 330, 380, { opacity: 0.3 })

// Bottom right contact
doc.rect(0, PH - 60, PW, 60).fill(C.bg)
doc.moveTo(0, PH - 60).lineTo(PW, PH - 60).strokeColor(C.border).lineWidth(0.5).stroke()
doc.fontSize(9).fillColor(C.muted).font('Helvetica')
  .text('support@pekugara.com', 256, PH - 42)
  .text('pekugara.com', 256, PH - 27)

// ═══════════════════════════════════════════════════════════
// PAGE 2 — Sections 1 & 2
// ═══════════════════════════════════════════════════════════
newPage('What is Pekugara?')

sectionChip('1', 'What is Pekugara?')
body('Pekugara is a dedicated student housing platform built to connect university and college students in Zimbabwe with verified landlords offering affordable, nearby accommodation. The name Pekugara comes from the Shona word meaning "a place to stay" — and that is exactly what the platform delivers.')
body('Whether you are a student searching for a safe, affordable room close to campus, or a landlord looking to fill your property with reliable tenants, Pekugara provides a trusted, transparent, and easy-to-use environment to make that connection happen.')

sectionChip('2', 'Why Use Pekugara?')

h2('For Students')
body('Finding student accommodation in Zimbabwe has traditionally been stressful, unreliable, and unsafe. Students often rely on word of mouth, social media groups, or unverified agents — leading to fraud, unsafe living conditions, and wasted money. Pekugara solves this by:')
bullet([
  'Verified listings only — every property is reviewed and approved before appearing in the feed. No fake listings.',
  'Verified landlords — landlords earn a verified badge after identity review, giving you confidence.',
  'Transparent pricing — rent prices are always displayed upfront. No hidden fees, no surprises.',
  'Direct communication — message landlords through in-app chat. No agents, no commissions.',
  'Safe environment — built-in reporting and blocking protects you from fraud and harassment.',
  'Campus proximity — listings display their distance from your university.',
])

h2('For Landlords')
bullet([
  'Free listings — post your property to hundreds of searching students at no cost.',
  'Organised bookings — all viewing requests managed in one place with real-time notifications.',
  'Pre-qualified leads — students pay a booking fee to confirm serious interest.',
  'Verified badge — increases student trust and improves your listing visibility.',
  'Direct messaging — communicate with students without sharing personal contact details early.',
  'Occupancy tracking — see how many spots are filled vs. available at a glance.',
])

// ═══════════════════════════════════════════════════════════
// PAGE 3 — Section 3: Getting Started
// ═══════════════════════════════════════════════════════════
newPage('Getting Started')

sectionChip('3', 'Getting Started')

h2('3.1  Creating an Account')
numbered([
  'Open the Pekugara app.',
  'On the Welcome screen tap "Find a Room" (student), "List your property" (landlord), or "I already have an account" (login).',
  'Fill in your details — name, email, password, and university (students) or phone number (landlords).',
  'Read and accept the Terms of Service and EULA.',
  'Tap "Create Account".',
])
note('Your account is created instantly. Students can browse listings immediately. Landlords can post listings right away, but listings require admin approval before going live.')

h2('3.2  Logging In')
numbered([
  'Tap "I already have an account" on the Welcome screen.',
  'Enter your registered email and password.',
  'Tap "Sign In".',
])

h2('3.3  Account Verification')
body('Getting verified adds a visible green badge to your profile and increases trust with other users significantly.')
bullet([
  'Students: Profile → Account Verification → submit supporting details (e.g. student ID description).',
  'Landlords: Profile → Account Verification → an admin reviews your property and identity details.',
])
body('Once approved, a green Verified badge appears on your profile and all your listings.')

// ═══════════════════════════════════════════════════════════
// PAGE 4 — Section 4: For Students
// ═══════════════════════════════════════════════════════════
newPage('For Students')

sectionChip('4', 'For Students')

h2('4.1  Browsing the Home Feed')
body('After logging in, you land on the Home screen which shows all available, admin-approved listings.')
bullet([
  'Use the search bar at the top to search by city, campus name, or area.',
  'Use filter chips (Near Campus, Furnished, WiFi, Ensuite) to narrow results quickly.',
  'Pull down on the feed to refresh listings.',
])

h2('4.2  Advanced Search')
body('Tap the Search tab in the bottom navigation for powerful filtering options:')
bullet([
  'Price Range — slide to set a maximum monthly rent.',
  'City — Harare, Bulawayo, Mutare, Gweru, Masvingo.',
  'University — UZ, MSU, NUST, Midlands State, Africa University.',
  'Amenities — Furnished, WiFi, Ensuite, Parking, Utilities Included.',
  'Sort By — Newest, Price Low to High, Price High to Low, Closest to Campus.',
])

h2('4.3  Saving Listings')
body('Tap the heart icon on any listing card to save it. Access all saved listings from the Saved tab. Tap the heart again to unsave.')

h2('4.4  Viewing a Listing in Detail')
body('Tap any listing card to open the full Detail screen including: swipeable image gallery, property title, address, distance to campus, bedroom/bathroom count, monthly rent, landlord card with verification status, and available actions.')

h2('4.5  Booking a Viewing')
body('Students pay a $2 USD booking fee via EcoCash to request a viewing. This confirms serious interest and protects landlords from time-wasters.')
numbered([
  'On the Detail screen, tap "Pay Booking Fee — $2".',
  'Enter your EcoCash phone number.',
  'Tap "Send Payment Request" — approve the USSD prompt on your phone.',
  'The app confirms your payment automatically within 3 minutes.',
  'Tap "Request a Viewing" and write a short message to the landlord.',
  'Tap "Send Request".',
])
note('The booking fee is a one-time fee that unlocks viewing requests across all listings on the platform. You only pay it once per account.')

h2('4.6  After Your Booking is Confirmed')
body('Once a landlord confirms your request, the Home screen switches to a "Housing Confirmed" view showing your confirmed property details, your landlord\'s name and phone number, and a direct message button.')

h2('4.7  Messaging Landlords')
body('Once the booking fee is paid, tap "Message Landlord" on any listing\'s detail screen. Messages are delivered in real time. All conversations are accessible from the Chats tab. Messages are monitored for community guideline violations.')

h2('4.8  Viewing Your Booking Requests')
body('Go to Profile → My Viewing Requests to track all requests and their current status:')

const sw = [W * 0.28, W * 0.72]
tableHeader(['Status', 'Meaning'], sw)
tableRow(['Pending',   'The landlord has not yet responded to your request.'], sw, false)
tableRow(['Confirmed', 'The landlord accepted your request — you have housing!'], sw, true)
tableRow(['Rejected',  'The landlord declined your request. You may apply elsewhere.'], sw, false)
tableRow(['Cancelled', 'You or the landlord cancelled the request.'], sw, true)
doc.moveDown(0.5)

// ═══════════════════════════════════════════════════════════
// PAGE 5 — Section 5: For Landlords
// ═══════════════════════════════════════════════════════════
newPage('For Landlords')

sectionChip('5', 'For Landlords')

h2('5.1  The Landlord Dashboard')
body('After logging in, landlords see a Dashboard on the Home screen showing total active listings, total confirmed bookings, and total pending viewing requests awaiting response. Quick action cards navigate directly to My Listings or Add New Listing.')

h2('5.2  Adding a New Listing')
body('Tap "Add new listing" from the dashboard or the + button on My Listings. Fill in all required fields:')

h3('Basic Information')
bullet([
  'Property title — e.g. "Furnished Room Near UZ Campus".',
  'Description — describe the property, nearby landmarks, and any house rules.',
  'Monthly rent in USD.',
])

h3('Location')
bullet([
  'City, full street address, nearest university or college.',
  'Distance from that university in kilometres.',
])

h3('Rooms & Amenities')
bullet([
  'Number of bedrooms, bathrooms, and maximum tenant capacity.',
  'Toggle amenities on/off: Furnished, Ensuite, WiFi, Parking, Utilities Included.',
])

h3('Photos')
bullet([
  'Add a minimum of 5 photos, maximum of 10.',
  'The first photo is automatically set as the cover image.',
  'Photos should clearly show rooms, bathroom, kitchen, and exterior.',
])

body('Tap "Publish Listing" to submit for admin review. Once approved, your listing goes live and is visible to all students immediately.')
note('Listings with misleading photos or false descriptions will be rejected by the admin team. Ensure all information is accurate.')

h2('5.3  Managing Your Listings')
body('Go to My Listings to manage all posted properties. For each listing you can see occupancy, confirmed students, pending requests, and remaining spots. Expand any listing card to view and respond to booking requests:')

const aw = [W * 0.2, W * 0.8]
tableHeader(['Action', 'Result'], aw)
tableRow(['Confirm', 'Student is marked as housed. Their feed locks to your property. They receive an instant push notification.'], aw, false)
tableRow(['Reject',  'Request is declined. Student receives a notification and can apply elsewhere.'], aw, true)
tableRow(['Remove',  'Removes a confirmed student (e.g. moved out). Student is notified that housing was cancelled.'], aw, false)
doc.moveDown(0.5)

h2('5.4  Getting Verified')
body('A Verified badge on your profile and listings significantly increases student trust and improves your visibility in search results.')
numbered([
  'Go to Profile → Account Verification.',
  'Tap "Request Verification".',
  'Enter supporting notes — e.g. property ownership details, registration info.',
  'Submit your request. An admin will review and notify you of the outcome.',
])
body('If your request is rejected, the reason will be shown and you may reapply after addressing the issue.')

// ═══════════════════════════════════════════════════════════
// PAGE 6 — Section 6: Safety & Section 7: Account
// ═══════════════════════════════════════════════════════════
newPage('Safety & Moderation')

sectionChip('6', 'Safety & Moderation')

h2('6.1  Content Moderation')
bullet([
  'All listings are reviewed by a human admin before going live. No unverified listing ever appears to students.',
  'The in-app chat has a built-in offensive language filter that blocks abusive messages before they are sent.',
])

h2('6.2  Reporting a Listing')
numbered([
  'Open the listing Detail screen.',
  'Tap the flag icon (⚑) in the top-right corner.',
  'Select a reason: Inappropriate Content, Spam/Misleading, Fraud/Scam, Harassment/Abuse, or Other.',
  'Optionally add a description for the moderation team.',
  'Tap Submit Report.',
])

h2('6.3  Reporting a User from Chat')
numbered([
  'Open the chat with the user.',
  'Tap the ⋮ menu in the top-right corner.',
  'Tap "Report [Name]", select a reason, and submit.',
])
note('All reports are reviewed by the moderation team within 24 hours. If substantiated, the reported user may be suspended or permanently removed.')

h2('6.4  Blocking a User')
numbered([
  'Open your chat with the user.',
  'Tap the ⋮ menu → "Block [Name]".',
  'Confirm by tapping "Block" in the prompt.',
])
bullet([
  'Their listings are immediately removed from your Home feed.',
  'An automatic report is filed with the moderation team.',
  'The moderation team is notified instantly.',
])

h2('6.5  Managing Blocked Users')
body('Go to Profile → Safety → Blocked users to view all blocked users. Tap "Unblock" next to any user to remove the block and restore their listings in your feed.')

divider()

sectionChip('7', 'Account & Profile Management')

h2('7.1  Editing Your Profile')
numbered([
  'Go to the Profile tab.',
  'Tap "Edit" next to Personal Info.',
  'Update your name, university (students), or phone number. Note: email cannot be changed.',
  'Tap "Save" to apply changes.',
])

h2('7.2  Logging Out')
body('Go to Profile → tap the logout icon (arrow pointing out of a box) in the top-right corner → confirm "Log out".')

h2('7.3  Deleting Your Account')
note('Account deletion is permanent and cannot be undone. All data — listings, bookings, messages, and profile — will be permanently erased. This action cannot be reversed.', 'warn')
body('Go to Profile → scroll to the bottom → tap "Delete Account" → confirm twice in the prompts that appear.')

// ═══════════════════════════════════════════════════════════
// PAGE 7 — Sections 8 & 9
// ═══════════════════════════════════════════════════════════
newPage('Notifications & FAQ')

sectionChip('8', 'Notifications')
body('Pekugara sends both in-app notifications and push notifications to keep you informed in real time. Access all notifications from Profile → the bell icon in the top-right corner.')

const nw = [W * 0.36, W * 0.22, W * 0.42]
tableHeader(['Notification', 'Recipient', 'Meaning'], nw)
tableRow(['New booking request',  'Landlord', 'A student submitted a viewing request.'], nw, false)
tableRow(['Booking confirmed',    'Student',  'A landlord accepted your viewing request.'], nw, true)
tableRow(['Booking rejected',     'Student',  'A landlord declined your viewing request.'], nw, false)
tableRow(['Booking cancelled',    'Student',  'Your confirmed housing was cancelled.'], nw, true)
doc.moveDown(0.6)
body('All notifications are marked as read automatically when you open the Notifications screen.')

divider()

sectionChip('9', 'Frequently Asked Questions')

const faqs = [
  ['Is Pekugara free to use?',
   'Yes. Creating an account, browsing listings, saving listings, and messaging landlords are all free. Students pay a one-time $2 USD booking fee via EcoCash to unlock viewing requests.'],
  ['Why do I need to pay a $2 booking fee?',
   'The booking fee confirms you are a serious student. It is a one-time fee and unlocks viewing requests across all listings. You do not pay per listing.'],
  ['How do I know a listing is genuine?',
   'Every listing is manually reviewed and approved by our moderation team before it appears. Check for the landlord\'s green Verified badge for extra assurance.'],
  ['I paid the booking fee but the listing was taken. Refund?',
   'The $2 fee unlocks viewing requests across the entire platform — it is not tied to one listing and is not refundable once paid.'],
  ['Can a landlord see my contact details?',
   'Your name and university (students) or phone (landlords) is shared only after a booking request is made. All earlier communication happens within the secure in-app chat.'],
  ['What if a landlord never responds to my request?',
   'Cancel the pending request from Profile → My Viewing Requests at any time and send a request to a different property. Consistently unresponsive landlords can be reported.'],
  ['Does listing a property cost anything?',
   'No. Posting listings on Pekugara is completely free for landlords.'],
  ['How long does listing approval take?',
   'Listings are typically reviewed within 24 hours. You receive an in-app notification once approved and live.'],
  ['What if I experience harassment?',
   'Block the user immediately (⋮ menu → Block in chat). This removes them from your feed and notifies moderation, who review within 24 hours.'],
  ['Can non-students use Pekugara?',
   'General members of the public may register as landlords to list properties. The platform is optimised for the student housing market in Zimbabwe.'],
]

faqs.forEach(([q, a], i) => {
  if (doc.y > PH - 160) { newPage('FAQ continued') }
  const y = doc.y
  const qH = doc.heightOfString(`Q  ${q}`, { width: W - 24, fontSize: 10 })
  const aH = doc.heightOfString(a, { width: W - 24, fontSize: 9.5 })
  const boxH = qH + aH + 24

  // Card background with left accent
  doc.rect(ML, y, W, boxH).fill(i % 2 === 0 ? C.white : C.bg).stroke()
  doc.rect(ML, y, 4, boxH).fill(C.green)

  doc.fontSize(10).fillColor(C.ink).font('Helvetica-Bold')
    .text(`Q  ${q}`, ML + 14, y + 8, { width: W - 24 })
  const qActualH = doc.heightOfString(`Q  ${q}`, { width: W - 24, fontSize: 10 })
  doc.fontSize(9.5).fillColor(C.body).font('Helvetica')
    .text(a, ML + 14, y + 10 + qActualH, { width: W - 24, lineGap: 2.5 })

  doc.y = y + boxH + 6
})

// ── Back cover ────────────────────────────────────────────
doc.addPage()
doc.rect(0, 0, PW, PH).fill(C.ink)
doc.rect(0, 0, PW, 8).fill(C.green)
doc.rect(0, PH - 8, PW, 8).fill(C.green)

// Large decorative circle
doc.circle(PW / 2, PH / 2, 180).fill('#1a2332')
doc.circle(PW / 2, PH / 2, 130).fill('#1e2d40')
doc.circle(PW / 2, PH / 2, 80).fill(C.green)

doc.fontSize(32).fillColor(C.white).font('Helvetica-Bold')
  .text('Pekugara', 0, PH / 2 - 48, { align: 'center', width: PW })
doc.fontSize(12).fillColor(C.greenLight).font('Helvetica')
  .text('Student housing, simplified.', 0, PH / 2 + 2, { align: 'center', width: PW })

doc.fontSize(10).fillColor('#8b949e').font('Helvetica')
  .text('support@pekugara.com', 0, PH - 80, { align: 'center', width: PW })
  .text('pekugara.com', 0, PH - 62, { align: 'center', width: PW })
  .text('© 2026 Pekugara. All rights reserved.', 0, PH - 44, { align: 'center', width: PW })

// ── Finalize ──────────────────────────────────────────────
doc.end()
console.log('✅  PDF generated:', OUT)
