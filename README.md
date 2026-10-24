# Kleanix — Perth's Premier On-Demand Cleaning Platform

A modern, high-performance Next.js 15 frontend application for **Kleanix** — inspired by Cleaner Co Australia. Built with TypeScript, Tailwind CSS, and Redux Toolkit for seamless client state management and mock API interaction ready for backend integration.

---

## 🌟 Key Features

1. **Top Announcement Bar & Header**:
   - Live promotional code banner (`KLEAN15` for 15% off).
   - Phone dispatch quick-dial (`1300 34 60 34`), operating hours (7am - 8pm, 7 days), and email.
   - Dynamic service dropdown with all residential, commercial, and bond clean categories.
   - Desktop and responsive mobile drawer navigation.

2. **Hero Section with Embedded Instant Quote Engine**:
   - Choose service type, bedrooms (1–6+), bathrooms (1–5+), and clean frequency (Weekly, Fortnightly, Monthly, One-off).
   - Live real-time pricing calculation with GST and discount savings badge.
   - Instant "Book This Clean" button that directly pre-populates the booking state.

3. **Complete 4-Step Interactive Booking Engine (`/book`)**:
   - **Step 1: Service & Room Selection** — Interactive service selector, bedroom/bathroom counter, frequency options.
   - **Step 2: Add-On Extras** — Interior Oven Clean ($60), Fridge Wipe ($45), Window Tracks ($75), Balcony Scrub ($50), Carpet Steam ($90), Wall Scuffs ($65), Inside Cabinets ($55).
   - **Step 3: Schedule & Property Access** — Date picker, arrival window slots, Perth address, entry instructions (lockbox, key under mat, concierge, someone home), pet & parking toggles.
   - **Step 4: Review, Coupon & Confirmation** — Live voucher code validator (`KLEAN15`, `PERTH20`, `SPRINGCLEAN`), price breakdown with GST, and asynchronous order submission.
   - **Booking Ticket Screen** — Generates unique booking reference (e.g. `KLX-89421`), appointment breakdown, preparation checklist, and print confirmation.

4. **Service Catalog & Dynamic Details (`/services`, `/services/[slug]`)**:
   - Standard Home Clean, Deep Intensive Clean, Vacate & End of Lease (100% REIWA Bond Back Guarantee), Commercial Office Clean, Airbnb Turnover, Carpet & Oven Specialty.
   - Room-by-room inclusion checklists (Kitchen, Bathrooms, Living Areas, Bedrooms).

5. **Detailed Checklist Comparison Matrix**:
   - Side-by-side interactive comparison matrix comparing Standard vs Deep vs Vacate cleans across all fixtures and rooms.

6. **Interactive Before & After Transformation Slider**:
   - Drag-to-reveal before/after image slider for baked-on oven grease, bathroom shower limescale, and carpet soil extraction.

7. **Perth Suburb & Postcode Coverage Checker (`/suburbs`)**:
   - Search by suburb or 4-digit postcode with instant availability feedback and arrival slot estimates.

8. **Customer Reviews & Ratings (`/reviews`)**:
   - Verified 4.96★ Google rating badge with star rating filter and interactive review submission form connected to Redux.

9. **Help Center & FAQ (`/faq`)**:
   - Accordion addressing supplies, cleaner vetting, bond back guarantee, cancellation policies, and team sizing.

10. **Support Desk & Contact (`/contact`)**:
    - Direct phone, email, headquarters address in South Perth, and responsive enquiry form.

---

## 🏗️ Project Structure

Following the template architecture:

```
Kleanix/
├── src/
│   ├── app/
│   │   ├── animation/             # Motion transition variants
│   │   ├── components/
│   │   │   ├── home-components/   # Hero, Services, BookingFlow, Checklist, BeforeAfter, etc.
│   │   │   └── shared-components/ # NavBar, Footer, Logo, TopAnnouncementBar, QuoteModal
│   │   ├── Containers/            # PageContainer & MarginContainer
│   │   ├── fonts/                 # Next.js Google font configurations (Inter, Playfair)
│   │   ├── services/              # mockApiService.ts (Mock client API & business logic)
│   │   ├── state_management/      # Redux Toolkit State Architecture
│   │   │   ├── hooks.ts           # useAppDispatch and useAppSelector
│   │   │   ├── provider.tsx       # Redux StateProvider wrapper
│   │   │   ├── types/             # Clean TypeScript interfaces
│   │   │   ├── stores/            # store.ts & client-store.ts
│   │   │   └── reducers/client-reducers/
│   │   │       ├── bookingSlice.ts # Multi-step booking, extras, schedule, coupons, submit
│   │   │       ├── quoteSlice.ts   # Instant quote calculations
│   │   │       ├── servicesSlice.ts# Services catalog & active filters
│   │   │       ├── reviewsSlice.ts # Customer reviews & filter states
│   │   │       ├── suburbsSlice.ts # Perth coverage validation
│   │   │       ├── uiSlice.ts      # Modals, mobile menu, toasts
│   │   │       ├── navBgState.ts   # Scroll background state
│   │   │       └── navValue.ts     # Active nav item
│   │   ├── about/                 # About Kleanix & safety standards
│   │   ├── book/                  # Dedicated online booking page
│   │   ├── contact/               # Contact desk & inquiry form
│   │   ├── faq/                   # FAQ accordion page
│   │   ├── pricing/               # Custom calculator & rate card
│   │   ├── reviews/               # Verified reviews & submission form
│   │   ├── services/              # Services catalog
│   │   │   └── [slug]/            # Dynamic service details & room checklist
│   │   ├── suburbs/               # Perth suburbs directory
│   │   ├── globals.css            # Tailwind theme, variables, custom scrollbars
│   │   ├── layout.tsx             # Root layout with metadata and providers
│   │   └── page.tsx               # Homepage
├── package.json
└── tsconfig.json
```

---

## ⚡ Client Redux Architecture & Backend Integration Ready

All client calls are managed cleanly through Redux:
- Asynchronous thunks (`submitBookingThunk`, `validateCouponThunk`, `checkSuburbThunk`, `fetchServicesThunk`) simulate realistic REST endpoints with simulated network delays and error handling.
- To connect to a real backend (e.g. Node.js, Express, NestJS, Supabase, Firebase, or Django), simply update `src/app/services/mockApiService.ts` to call your real API endpoint with `fetch` or `axios`, keeping all component interfaces untouched!

---

## 🚀 Running the App

```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start
```
