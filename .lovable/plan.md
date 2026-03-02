

## Complete Redesign of /preview as Sales Landing Page + New /book Page

### Overview
Replace the current Typeform-style lead funnel on `/preview` with a full sales landing page inspired by creme.digital's clean, dark, premium aesthetic. Also create a new `/book` page with HubSpot calendar embed. All CTAs point to the HubSpot booking link.

### Important Note
The current `/preview` page has a lead capture funnel that saves data to the database (`preview_leads` and `incomplete_leads` tables). This will be completely replaced -- the new page is purely a sales landing page with external booking links. The existing thank-you page at `/thank-you/preview` will no longer be used by this flow.

---

### New Files to Create

**1. `src/pages/Preview.tsx`** (complete rewrite ~600-800 lines)
- Self-contained sales landing page with 10 sections
- Uses dark backgrounds (`#0a0a0a`, `#111`, `#1a1a1a`) with brand accent (`#8BC34A`)
- Intersection Observer for scroll-triggered fade-in/slide-up animations
- Does NOT use the standard `<Layout>` wrapper (custom sticky header + custom footer section)
- All "Book a Call" buttons link to: `https://meetings-eu1.hubspot.com/acamacho?uuid=c5d18399-7c20-4ff8-8754-92e138e05f08`
- "See Our Work" button smooth-scrolls to the case studies section

**Sections:**
1. **Hero** -- Dark bg, large bold headline, subheadline, two CTAs, 3 animated stat counters (200+ Clients, 20+ Years, $30M+ Generated)
2. **VSL Video** -- 16:9 placeholder with play button overlay, CTA below
3. **How It Works** -- 3 step cards with icons (Eye, Hammer, Rocket from lucide)
4. **Results / Case Studies** -- 9 project cards using portfolio screenshots, each with business type, result text, and "Visit Site" link
5. **Pricing** -- Two side-by-side cards (Website $3,000 one-time / Google Ads $1,250/mo) with feature lists
6. **Why Hipervinculo** -- 6 feature cards in a 2x3 grid
7. **Founder Story** -- Photo placeholder + Miguel's quote
8. **FAQ** -- Accordion with 6 questions using Radix accordion
9. **Final CTA** -- Dark section with urgency headline + booking button
10. **Footer** -- Minimal dark footer matching the page aesthetic

**2. `src/pages/Book.tsx`** (~80 lines)
- Dark-themed page with headline, subheadline
- HubSpot calendar iframe embed (with fallback direct link)
- Trust badges below (200+ Businesses | 20+ Years | $30M+)

---

### Files to Modify

**3. `src/App.tsx`**
- Import new `Book` component
- Add route: `<Route path="/book" element={<Book />} />`

---

### Design System Details

- **Background**: `#0a0a0a` (near-black) for main sections, alternating `#111` and `#0a0a0a`
- **Text**: White (`#fff`) for headings, `#a1a1a1` for body text
- **Accent**: Brand lime green `#8BC34A` for CTAs, highlights, icons
- **Cards**: `#1a1a1a` background, `#2a2a2a` border, rounded-2xl, subtle hover glow
- **Typography**: Keep Inter font, large bold headings (text-5xl/6xl on desktop)
- **Animations**: Intersection Observer triggers `opacity-0 translate-y-8` to `opacity-100 translate-y-0` on scroll
- **Sticky header**: Compact dark header with logo + "Book a Call" button, visible on scroll

### Case Study Cards Data (hardcoded in component)
Maps each to existing portfolio images and live URLs:
- Stillwater Day Spa -> "From 2-3 calls/day to 20+ calls/day"
- Rasetta Innovations -> "800+ leads/month, 20 properties closed/month"  
- Delios Home -> "0 to 10 qualified leads/month, 60% close rate in 90 days"
- And 6 more with the specified result text

### Technical Notes
- No database interaction needed (pure static landing page)
- The old lead capture logic (Supabase inserts, session tracking) is removed entirely
- Uses framer-motion (already installed) for counter animations and scroll reveals
- Mobile-responsive: single column on mobile, grid layouts on desktop
- The page opts out of the standard Layout component to have full control over header/footer styling

