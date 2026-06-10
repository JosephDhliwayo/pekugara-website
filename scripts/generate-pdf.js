import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'public', 'pekugara-user-documentation.pdf')

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
  noteYellow: '#fffbeb',
  noteBorder: '#f59e0b',
  warnBg:     '#fff5f5',
  warnBorder: '#fc8181',
}

const PW  = 595.28
const PH  = 841.89
const ML  = 56
const W   = PW - ML - 56
const TOP = 52          // content starts here (below 38pt header bar)
const BOT = PH - 44     // content ends here (above footer)

// ── Document setup ────────────────────────────────────────
const doc = new PDFDocument({
  size: [PW, PH],
  autoFirstPage: false,
  // margins tell PDFKit where to auto-paginate text
  margins: { top: TOP, bottom: PH - BOT, left: ML, right: ML },
  info: {
    Title:   'Pekugara User Documentation',
    Author:  'Pekugara',
    Subject: 'Student Housing Platform — User Guide v1.0.0',
    Creator: 'Pekugara',
  },
})
doc.pipe(fs.createWriteStream(OUT))

let pageNum   = 0
let isContent = false   // flag: only decorate content pages, not cover/back

// ── Auto-decorate every content page ─────────────────────
doc.on('pageAdded', () => {
  if (!isContent) return
  pageNum++
  const sy = doc.y
  doc.rect(0, 0, PW, PH).fill(C.white)
  // Header bar
  doc.rect(0, 0, PW, 38).fill(C.ink)
  doc.rect(0, 0, 5, 38).fill(C.green)
  doc.fontSize(8).fillColor(C.green).font('Helvetica-Bold').text('PEKUGARA', ML, 14)
  if (sectionLabel) {
    doc.fontSize(8).fillColor('#8b949e').font('Helvetica').text(sectionLabel, ML + 65, 14)
  }
  doc.fontSize(8).fillColor('#8b949e').font('Helvetica')
    .text(String(pageNum), PW - ML, 14, { width: ML - 4, align: 'right' })
  // Footer bar — drawn at BOT+9 which is past the bottom margin.
  // Temporarily zero the bottom margin so PDFKit doesn't auto-paginate here,
  // which would create infinite recursion inside the pageAdded handler.
  doc.rect(0, BOT + 1, PW, PH - BOT).fill(C.bg)
  doc.moveTo(0, BOT + 1).lineTo(PW, BOT + 1).strokeColor(C.border).lineWidth(0.5).stroke()
  const savedBottom = doc.page.margins.bottom
  doc.page.margins.bottom = 0
  doc.fontSize(7.5).fillColor(C.muted).font('Helvetica')
    .text('pekugara.com  ·  support@pekugara.com  ·  © 2026 Pekugara. All rights reserved.',
      ML, BOT + 9, { width: W })
  doc.page.margins.bottom = savedBottom
  doc.y = sy
})

let sectionLabel = ''

// ── Only break before structural elements (chips/h2) ─────
// For normal text, PDFKit auto-paginates — no need() calls there.
function breakBefore(minSpace) {
  if (doc.y + minSpace > BOT) {
    doc.addPage()   // fires pageAdded → auto-decorates
    doc.y = TOP
  }
}

// ── Typography ────────────────────────────────────────────

function chip(num, label) {
  sectionLabel = `${num}. ${label}`
  breakBefore(50)   // chip + at least one h2 must fit together
  const y = doc.y
  doc.rect(ML, y, W, 30).fill(C.ink)
  doc.rect(ML, y, 5, 30).fill(C.green)
  doc.fontSize(11.5).fillColor(C.green).font('Helvetica-Bold').text(`${num}.`, ML + 14, y + 8)
  doc.fontSize(11.5).fillColor(C.white).font('Helvetica-Bold').text(label, ML + 32, y + 8)
  doc.y = y + 36   // 30 chip + 6 gap
}

function h2(text) {
  breakBefore(42)   // heading + underline + a little content
  doc.y += 8
  doc.fontSize(10.5).fillColor(C.greenDark).font('Helvetica-Bold').text(text, ML, doc.y, { width: W })
  doc.y += 3
  doc.moveTo(ML, doc.y).lineTo(ML + W, doc.y).strokeColor(C.green).lineWidth(1.5).stroke()
  doc.y += 5
}

function h3(text) {
  breakBefore(28)
  doc.y += 5
  doc.fontSize(10).fillColor(C.ink).font('Helvetica-Bold').text(text, ML, doc.y, { width: W })
  doc.y += 3
}

// body: NO breakBefore — PDFKit auto-paginates long text naturally
function body(text) {
  doc.fontSize(10).fillColor(C.body).font('Helvetica')
    .text(text, ML, doc.y, { width: W, lineGap: 2.5, align: 'justify' })
  doc.y += 5
}

// bullets: breakBefore per-item so the dot isn't orphaned
function bullet(items) {
  items.forEach(item => {
    breakBefore(14)
    const y = doc.y
    doc.circle(ML + 6, y + 5.5, 2.5).fill(C.green)
    doc.fontSize(10).fillColor(C.body).font('Helvetica')
      .text(item, ML + 15, y, { width: W - 15, lineGap: 2.5 })
    doc.y += 2
  })
  doc.y += 4
}

// numbered: same — keep badge + text together
function numbered(items) {
  items.forEach((item, i) => {
    breakBefore(14)
    const y = doc.y
    doc.circle(ML + 7, y + 5.5, 7).fill(C.green)
    doc.fontSize(8).fillColor(C.white).font('Helvetica-Bold')
      .text(`${i + 1}`, ML + 3, y + 2, { width: 9, align: 'center' })
    doc.fontSize(10).fillColor(C.body).font('Helvetica')
      .text(item, ML + 20, y, { width: W - 20, lineGap: 2.5 })
    doc.y += 2
  })
  doc.y += 4
}

function note(text, type = 'info') {
  const bg  = type === 'warn' ? C.warnBg     : C.noteYellow
  const brd = type === 'warn' ? C.warnBorder : C.noteBorder
  const tc  = type === 'warn' ? '#c53030'    : '#744210'
  const th  = doc.heightOfString(text, { width: W - 18, fontSize: 9 })
  const bh  = th + 16
  breakBefore(bh + 4)   // note box must not be split across pages
  doc.y += 2
  const y = doc.y
  doc.rect(ML, y, W, bh).fill(bg)
  doc.rect(ML, y, 3, bh).fill(brd)
  doc.fontSize(9).fillColor(tc).font('Helvetica')
    .text(text, ML + 12, y + 7, { width: W - 18, lineGap: 2.5 })
  doc.y = y + bh + 5
}

function tHeader(cols, widths) {
  breakBefore(40)
  const y = doc.y
  let x = ML
  doc.rect(ML, y, W, 22).fill(C.ink)
  cols.forEach((c, i) => {
    doc.fontSize(8.5).fillColor(C.green).font('Helvetica-Bold')
      .text(c.toUpperCase(), x + 7, y + 6, { width: widths[i] - 12 })
    x += widths[i]
  })
  doc.y = y + 22
}

function tRow(cols, widths, alt = false) {
  const rh = Math.max(...cols.map((c, i) =>
    doc.heightOfString(String(c), { width: widths[i] - 14, fontSize: 9 })
  )) + 12
  breakBefore(rh)
  const y = doc.y
  let x = ML
  if (alt) doc.rect(ML, y, W, rh).fill(C.bg)
  doc.rect(ML, y, W, rh).strokeColor(C.border).lineWidth(0.5).stroke()
  cols.forEach((c, i) => {
    doc.fontSize(9).fillColor(C.body).font('Helvetica')
      .text(String(c), x + 7, y + 6, { width: widths[i] - 14, lineGap: 2 })
    x += widths[i]
  })
  doc.y = y + rh
}

// ═══════════════════════════════════════════════════════════
// COVER PAGE  (isContent = false, so pageAdded won't decorate)
// ═══════════════════════════════════════════════════════════
isContent = false
doc.addPage()
pageNum = 1

doc.rect(0, 0, PW, PH).fill(C.white)
doc.rect(0, 0, PW, 8).fill(C.green)
doc.rect(0, 0, 205, PH).fill(C.ink)
doc.rect(0, 0, 5, PH).fill(C.green)
doc.circle(102, 295, 115).fill('#1a2332')
doc.circle(102, 295, 78).fill('#1e2d40')
doc.circle(102, 295, 42).fill(C.green)
doc.fontSize(25).fillColor(C.white).font('Helvetica-Bold').text('Pekugara', 20, 76, { width: 170 })
doc.fontSize(9.5).fillColor(C.green).font('Helvetica').text('Student housing, simplified.', 20, 108, { width: 170 })
doc.moveTo(20, 128).lineTo(185, 128).strokeColor(C.green).lineWidth(1.5).stroke()
doc.fontSize(7.5).fillColor('#8b949e').font('Helvetica-Bold').text('CONTENTS', 20, 142)
const toc = [
  ['01','What is Pekugara?'],['02','Why Use Pekugara?'],['03','Getting Started'],
  ['04','For Students'],     ['05','For Landlords'],    ['06','Safety & Moderation'],
  ['07','Account & Profile'],['08','Notifications'],    ['09','FAQ'],
]
let ty = 156
toc.forEach(([n, l]) => {
  doc.fontSize(7.5).fillColor(C.green).font('Helvetica-Bold').text(n, 20, ty, { width: 18 })
  doc.fontSize(7.5).fillColor('#c9d1d9').font('Helvetica').text(l, 40, ty, { width: 155 })
  ty += 14
})
doc.fontSize(7.5).fillColor('#4a5568').font('Helvetica')
  .text('Version 1.0.0', 20, PH - 72, { width: 170 })
  .text('© 2026 Pekugara', 20, PH - 58, { width: 170 })
doc.fontSize(34).fillColor(C.ink).font('Helvetica-Bold').text('User', 232, 114)
doc.fontSize(34).fillColor(C.green).font('Helvetica-Bold').text('Documentation', 232, 154)
doc.moveTo(232, 200).lineTo(232 + 316, 200).strokeColor(C.green).lineWidth(2).stroke()
doc.fontSize(11).fillColor(C.body).font('Helvetica')
  .text('A complete guide to finding student accommodation\nin Zimbabwe using the Pekugara app.', 232, 210, { width: 316, lineGap: 4 })
const pills = ['500+ Listings', '10+ Cities', 'Verified Landlords', 'Free to Download']
let px = 232, py = 262
pills.forEach(pill => {
  const pw2 = doc.widthOfString(pill, { fontSize: 8.5 }) + 18
  if (px + pw2 > 232 + 316) { px = 232; py += 24 }
  doc.roundedRect(px, py, pw2, 19, 9).fill(C.greenLight)
  doc.fontSize(8.5).fillColor(C.greenDark).font('Helvetica-Bold').text(pill, px + 9, py + 4)
  px += pw2 + 7
})
doc.save().opacity(0.035)
doc.fontSize(230).fillColor(C.ink).font('Helvetica-Bold').text('P', 300, 350)
doc.restore()
doc.rect(0, PH - 52, PW, 52).fill(C.bg)
doc.moveTo(0, PH - 52).lineTo(PW, PH - 52).strokeColor(C.border).lineWidth(0.5).stroke()
doc.fontSize(9).fillColor(C.muted).font('Helvetica')
  .text('support@pekugara.com', 232, PH - 38).text('pekugara.com', 232, PH - 24)

// ═══════════════════════════════════════════════════════════
// CONTENT  (isContent = true → pageAdded auto-decorates)
// ═══════════════════════════════════════════════════════════
isContent = true
doc.addPage()   // fires pageAdded, draws decorations, pageNum becomes 2
doc.y = TOP

// ─── 1 ───────────────────────────────────────────────────
chip('1', 'What is Pekugara?')
body('Pekugara is a dedicated student housing platform built to connect university and college students in Zimbabwe with verified landlords offering affordable, nearby accommodation. The name Pekugara comes from the Shona word meaning "a place to stay" — and that is exactly what the platform delivers.')
body('Whether you are a student searching for a safe, affordable room close to campus, or a landlord looking to fill your property with reliable tenants, Pekugara provides a trusted, transparent, and easy-to-use environment to make that connection happen.')

// ─── 2 ───────────────────────────────────────────────────
chip('2', 'Why Use Pekugara?')
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
  'Pre-qualified leads — students pay a booking fee to confirm serious interest, reducing time-wasters.',
  'Verified badge — increases student trust and improves your listing visibility in search results.',
  'Direct messaging — communicate with students without sharing personal contact details prematurely.',
  'Occupancy tracking — see how many spots are filled vs. available at a glance.',
])

// ─── 3 ───────────────────────────────────────────────────
chip('3', 'Getting Started')
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

// ─── 4 ───────────────────────────────────────────────────
chip('4', 'For Students')
h2('4.1  Browsing the Home Feed')
body('After logging in, you land on the Home screen showing all available, admin-approved listings.')
bullet([
  'Use the search bar at the top to search by city, campus name, or area.',
  'Use filter chips (Near Campus, Furnished, WiFi, Ensuite) to narrow results quickly.',
  'Pull down on the feed to refresh listings.',
])
h2('4.2  Advanced Search')
body('Tap the Search tab in the bottom navigation for powerful filtering:')
bullet([
  'Price Range — drag the slider to set a maximum monthly rent.',
  'City — Harare, Bulawayo, Mutare, Gweru, Masvingo.',
  'University — UZ, MSU, NUST, Midlands State, Africa University.',
  'Amenities — Furnished, WiFi, Ensuite, Parking, Utilities Included.',
  'Sort By — Newest, Price Low to High, Price High to Low, Closest to Campus.',
])
h2('4.3  Saving Listings')
body('Tap the heart icon on any listing card to save it. Access all saved listings from the Saved tab. Tap the heart again to unsave.')
h2('4.4  Viewing a Listing in Detail')
body('Tap any listing card to open the full Detail screen: swipeable image gallery, property title, address, distance to campus, bedroom/bathroom count, monthly rent, landlord card with verification status, and available actions.')
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
note('The booking fee is a one-time fee that unlocks viewing requests across all listings. You only pay it once per account.')
h2('4.6  After Your Booking is Confirmed')
body('Once a landlord confirms your request, the Home screen switches to a "Housing Confirmed" view showing your property details, the landlord\'s name and phone number, and a direct message button.')
h2('4.7  Messaging Landlords')
body('Once the booking fee is paid, tap "Message Landlord" on any listing\'s detail screen. Messages are delivered in real time. All conversations are in the Chats tab. Messages are monitored for guideline violations.')
h2('4.8  Viewing Your Booking Requests')
body('Go to Profile → My Viewing Requests to track all requests and their current status:')
const sw = [W * 0.28, W * 0.72]
tHeader(['Status', 'Meaning'], sw)
tRow(['Pending',   'The landlord has not yet responded to your request.'], sw, false)
tRow(['Confirmed', 'The landlord accepted your request — you have housing!'], sw, true)
tRow(['Rejected',  'The landlord declined your request. You may apply elsewhere.'], sw, false)
tRow(['Cancelled', 'You or the landlord cancelled the request.'], sw, true)
doc.y += 5

// ─── 5 ───────────────────────────────────────────────────
chip('5', 'For Landlords')
h2('5.1  The Landlord Dashboard')
body('After logging in, landlords see a Dashboard showing total active listings, confirmed bookings, and pending viewing requests. Quick action cards navigate to My Listings or Add New Listing.')
h2('5.2  Adding a New Listing')
body('Tap "Add new listing" from the dashboard or the + button on My Listings and fill in all required fields:')
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
  'Add a minimum of 5 photos, maximum of 10. The first photo becomes the cover image.',
  'Photos should clearly show rooms, bathroom, kitchen, and exterior.',
])
body('Tap "Publish Listing" to submit for admin review. Once approved, your listing goes live and is visible to all students immediately.')
note('Listings with misleading photos or false descriptions will be rejected. Ensure all information is accurate before submitting.')
h2('5.3  Managing Your Listings')
body('Go to My Listings to manage properties, view occupancy, and respond to booking requests:')
const aw = [W * 0.2, W * 0.8]
tHeader(['Action', 'Result'], aw)
tRow(['Confirm', 'Student is marked as housed. Their feed locks to your property. They receive an instant push notification.'], aw, false)
tRow(['Reject',  'Request is declined. Student receives a notification and can apply elsewhere.'], aw, true)
tRow(['Remove',  'Removes a confirmed student (e.g. moved out). Student is notified housing was cancelled.'], aw, false)
doc.y += 5
h2('5.4  Getting Verified')
body('A Verified badge on your profile and listings significantly increases student trust and improves your visibility in search results.')
numbered([
  'Go to Profile → Account Verification.',
  'Tap "Request Verification".',
  'Enter supporting notes (e.g. property ownership details, registration info).',
  'Submit. An admin reviews and notifies you of the outcome.',
])
body('If your request is rejected, the reason will be shown and you may reapply after addressing the issue.')

// ─── 6 ───────────────────────────────────────────────────
chip('6', 'Safety & Moderation')
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
note('All reports are reviewed within 24 hours. If substantiated, the reported user may be suspended or permanently removed.')
h2('6.4  Blocking a User')
numbered([
  'Open your chat with the user.',
  'Tap the ⋮ menu → "Block [Name]".',
  'Confirm by tapping "Block" in the prompt.',
])
bullet([
  'Their listings are immediately removed from your Home feed.',
  'An automatic report is filed and the moderation team is notified instantly.',
])
h2('6.5  Managing Blocked Users')
body('Go to Profile → Safety → Blocked users to view all blocked users. Tap "Unblock" next to any user to remove the block.')

// ─── 7 ───────────────────────────────────────────────────
chip('7', 'Account & Profile Management')
h2('7.1  Editing Your Profile')
numbered([
  'Go to the Profile tab.',
  'Tap "Edit" next to Personal Info.',
  'Update your name, university (students), or phone number. Note: email cannot be changed.',
  'Tap "Save" to apply changes.',
])
h2('7.2  Logging Out')
body('Go to Profile → tap the logout icon in the top-right corner → confirm "Log out".')
h2('7.3  Deleting Your Account')
note('Account deletion is permanent and cannot be undone. All data — listings, bookings, messages, and profile — will be permanently erased.', 'warn')
body('Go to Profile → scroll to the bottom → tap "Delete Account" → confirm twice in the prompts that appear.')

// ─── 8 ───────────────────────────────────────────────────
chip('8', 'Notifications')
body('Pekugara sends both in-app notifications and push notifications to keep you informed in real time. Access all notifications from Profile → the bell icon in the top-right corner.')
const nw = [W * 0.36, W * 0.22, W * 0.42]
tHeader(['Notification', 'Recipient', 'Meaning'], nw)
tRow(['New booking request', 'Landlord', 'A student submitted a viewing request.'], nw, false)
tRow(['Booking confirmed',   'Student',  'A landlord accepted your viewing request.'], nw, true)
tRow(['Booking rejected',    'Student',  'A landlord declined your viewing request.'], nw, false)
tRow(['Booking cancelled',   'Student',  'Your confirmed housing was cancelled.'], nw, true)
doc.y += 5
body('All notifications are marked as read automatically when you open the Notifications screen.')

// ─── 9 ───────────────────────────────────────────────────
chip('9', 'Frequently Asked Questions')
const faqs = [
  ['Is Pekugara free to use?',
   'Yes. Creating an account, browsing listings, saving listings, and messaging landlords are all free. Students pay a one-time $2 USD booking fee via EcoCash to unlock viewing requests.'],
  ['Why do I need to pay a $2 booking fee?',
   'The booking fee confirms you are a serious student. It is a one-time fee that unlocks viewing requests across all listings — you do not pay per listing.'],
  ['How do I know a listing is genuine?',
   'Every listing is manually reviewed and approved by our moderation team before it appears. Check for the landlord\'s green Verified badge for extra assurance.'],
  ['I paid the booking fee but the listing was taken. Refund?',
   'The $2 fee unlocks viewing requests across the entire platform — it is not tied to one listing and is not refundable once paid.'],
  ['Can a landlord see my contact details?',
   'Your name and university (students) or phone number (landlords) is shared only after a booking request is made. All earlier communication stays within the secure in-app chat.'],
  ['What if a landlord never responds to my request?',
   'Cancel the pending request from Profile → My Viewing Requests at any time and apply to a different property. Consistently unresponsive landlords can be reported.'],
  ['Does listing a property cost anything?',
   'No. Posting listings on Pekugara is completely free for landlords.'],
  ['How long does listing approval take?',
   'Listings are typically reviewed within 24 hours. You receive an in-app notification once your listing is approved and live.'],
  ['What if I experience harassment?',
   'Block the user immediately (⋮ menu → Block in chat). This removes them from your feed and automatically notifies moderation, who review the case within 24 hours.'],
  ['Can non-students use Pekugara?',
   'General members of the public may register as landlords to list properties. The platform is optimised for the student housing market in Zimbabwe.'],
]
faqs.forEach(([q, a], i) => {
  const qh  = doc.heightOfString(`Q  ${q}`, { width: W - 20, fontSize: 10 })
  const ah  = doc.heightOfString(a,          { width: W - 20, fontSize: 9.5 })
  const bh  = qh + ah + 20
  breakBefore(bh + 4)   // keep whole FAQ card together
  const y = doc.y
  doc.rect(ML, y, W, bh).fill(i % 2 === 0 ? C.white : C.bg)
  doc.rect(ML, y, W, bh).strokeColor(C.border).lineWidth(0.5).stroke()
  doc.rect(ML, y, 4, bh).fill(C.green)
  doc.fontSize(10).fillColor(C.ink).font('Helvetica-Bold')
    .text(`Q  ${q}`, ML + 13, y + 7, { width: W - 20 })
  const qActual = doc.heightOfString(`Q  ${q}`, { width: W - 20, fontSize: 10 })
  doc.fontSize(9.5).fillColor(C.body).font('Helvetica')
    .text(a, ML + 13, y + 8 + qActual, { width: W - 20, lineGap: 2 })
  doc.y = y + bh + 4
})

// ═══════════════════════════════════════════════════════════
// BACK COVER  (isContent = false again)
// ═══════════════════════════════════════════════════════════
isContent = false
doc.addPage()
doc.rect(0, 0, PW, PH).fill(C.ink)
doc.rect(0, 0, PW, 7).fill(C.green)
doc.rect(0, PH - 7, PW, 7).fill(C.green)
doc.circle(PW / 2, PH / 2, 165).fill('#1a2332')
doc.circle(PW / 2, PH / 2, 112).fill('#1e2d40')
doc.circle(PW / 2, PH / 2, 60).fill(C.green)
doc.fontSize(30).fillColor(C.white).font('Helvetica-Bold')
  .text('Pekugara', 0, PH / 2 - 42, { align: 'center', width: PW })
doc.fontSize(11).fillColor(C.greenLight).font('Helvetica')
  .text('Student housing, simplified.', 0, PH / 2 + 5, { align: 'center', width: PW })
doc.fontSize(9).fillColor('#8b949e').font('Helvetica')
  .text('support@pekugara.com', 0, PH - 74, { align: 'center', width: PW })
  .text('pekugara.com',         0, PH - 58, { align: 'center', width: PW })
  .text('© 2026 Pekugara. All rights reserved.', 0, PH - 42, { align: 'center', width: PW })

doc.end()
console.log('✅  PDF generated:', OUT)
