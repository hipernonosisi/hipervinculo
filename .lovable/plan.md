

# Hipervínculo Website Replication Plan

## Overview
A complete recreation of the Hipervínculo digital growth agency website with full bilingual support (English/Spanish), working contact forms with database storage, and all existing pages and functionality.

---

## 1. Foundation & Branding

### Design System Setup
- **Color Palette**: Dark green (#304D30) for primary/headings, lime green (#9DC209) for accents/CTAs, white/light gray backgrounds, dark gray for body text
- **Typography**: Modern sans-serif fonts with bold headlines
- **Components**: Rounded buttons, card components with subtle shadows, decorative curved background lines
- **Logo**: The HV symbol with "Hipervínculo" text in brand colors

---

## 2. Navigation & Layout

### Header
- Logo (left side)
- Navigation links: About Us, Services, Pricing, FAQs, Get in Touch
- Language toggle button (ES/EN)
- "Get Free Audit" CTA button (green)

### Footer
- Company info and logo
- Quick links
- Contact information
- Social media links (if applicable)

---

## 3. Pages to Build

### Homepage
- **Hero Section**: "Your growth partner for ambitious eCommerce" headline, supporting text, two CTAs (Request Free Audit, View Our Services)
- **Metrics Card**: Floating card showing Revenue Growth +250%, ROAS Improvement +180%
- **Proven Results**: Bullet points of key achievements ($92M tracked sales, 10+ years experience, etc.)
- **Services Overview**: 6 service cards (Paid Media, Creative Services, CRO, Analytics, Amazon, Strategy)
- **What Makes Us Different**: Performance-Obsessed Experts and Radical Transparency sections
- **Playbook Download**: Advantage+ Growth Playbook download section with PDF
- **Performance Guarantee**: "No Results, No Fee" guarantee section with 2.5x minimum ROAS
- **Pricing Preview**: Two pricing cards (Performance Retainer, Growth Partnership) with link to full pricing
- **Partner Logos**: Google, Meta, Amazon, Helium 10, Elevar, MNTN, Polar, Shopify certifications
- **FAQ Section**: Expandable accordion with common questions
- **Final CTA**: "Ready to scale your brand?"

### About Us Page
- Company philosophy and story
- "Most businesses don't fail because they lack marketing" quote highlight
- Problem identification (website doesn't convert, funnel issues, etc.)
- "We Don't Run Campaigns in Isolation" section
- "Built for Businesses That Want Stability" section

### Services Page
- Page hero with services overview
- **Lead Generation Systems** card with features
- **Conversion Website Development** card
- **Google Ads** section
- **Tracking & Attribution** section
- **eCommerce Growth Partners** section
- Bottom CTA for free audit

### Pricing Page
- Three-tier pricing cards:
  1. **Lead Generation System** - $2,500 setup + $1,000/month
  2. **Performance Retainer** - 2.5x Min Net ROAS
  3. **Growth Partnership** - 5% of Net Shopify Sales
- Each with included features and CTAs
- Important notes/disclaimers at bottom

### FAQs Page
- Accordion-style expandable questions:
  - What is the starting investment?
  - What is net ROAS?
  - Difference between TACOS and ACoS?
  - What is Performance Max?
  - What makes a good Meta Ads creative?
  - What if we don't reach ROAS target?
  - Do you build stores or run email marketing?
- "Still Have Questions?" section with contact CTA

### Get In Touch Page
- **Contact Form**: Full Name, Company Name, Email, Dropdown (How can we help?), Message textarea
- **Contact Information**: Email, Phone, Office Address, Business Hours
- Form submissions stored in database

### Get Free Audit Page (Multi-step Form)
- 7-question wizard-style form with progress indicator
- Questions about company name, website, business type, revenue, goals, etc.
- Back/Next navigation
- Keyboard support ("press Enter")
- Form submissions stored in database

---

## 4. Backend & Database

### Database Tables
- **contact_submissions**: Stores Get In Touch form submissions
- **audit_requests**: Stores the 7-step audit form submissions

### Lovable Cloud Setup
- Enable Lovable Cloud for database functionality
- Create tables to store form submissions
- No authentication required (public forms)

---

## 5. Multilingual Support (EN/ES)

### Language System
- Language toggle in header
- Store language preference in localStorage
- All text content available in both English and Spanish
- All pages fully translated

---

## 6. Downloadable Playbook

### Implementation
- Upload area ready for your PDF file
- Download button that triggers file download
- Visual playbook card design matching current site

---

## 7. Mobile Responsiveness

- Fully responsive design for all screen sizes
- Mobile hamburger menu
- Optimized touch targets for buttons/links
- Proper spacing and typography scaling

---

## Next Steps After Implementation

1. You'll upload the Advantage+ Growth Playbook PDF
2. You'll provide any logo/image assets from the zip file
3. Review Spanish translations and adjust as needed
4. Connect a custom domain if desired

