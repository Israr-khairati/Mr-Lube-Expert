# MR LUBE EXPERT Website - Project TODO

## Phase 1: Database & Core Setup
- [x] Design and implement Prisma schema (Booking, BookingService, ContactSubmission tables)
- [x] Create database migrations and apply via webdev_execute_sql
- [x] Set up tRPC procedures for bookings and contact submissions
- [x] Implement owner notification system for new bookings/contacts

## Phase 2: Design System & Layout
- [x] Configure dark theme colors (#0B0B0C, #141414, #1D1D1D, #FFFFFF, #A3A3A3, #D2FF00, #FF6B00)
- [x] Set up typography (Space Grotesk for headings, Inter for body)
- [x] Create global CSS with design tokens and semantic colors
- [x] Build DashboardLayout or custom layout wrapper for consistent structure
- [x] Implement sticky navigation bar with logo and responsive mobile menu

## Phase 3: Navigation & Footer
- [x] Create Navigation component with logo, menu links, and "Book Now" CTA
- [x] Implement mobile hamburger menu with responsive behavior
- [x] Build Footer component with business info, quick links, social media, copyright
- [x] Ensure navigation is sticky and accessible (WCAG AA)

## Phase 4: Homepage
- [x] Hero section with headline, subheadline, and large image
- [x] Featured Services section with cards (image, title, description, CTA)
- [x] Why Choose Us section with benefits
- [x] Statistics/value propositions section
- [x] Gallery Preview section with masonry layout
- [x] Testimonials carousel with premium cards
- [x] Location section with map preview
- [x] Final CTA banner
- [x] Add SEO metadata for homepage

## Phase 5: Services Pages
- [x] Create Services listing page with all services categorized
- [x] Build dynamic Service Detail page (/services/[slug])
- [x] Create service cards with images, descriptions, benefits, CTAs
- [x] Implement breadcrumb navigation on detail pages
- [x] Add JSON-LD structured data for services

## Phase 6: Gallery Page
- [x] Build masonry layout for 12+ images
- [x] Implement lightbox/modal for image viewing
- [x] Ensure responsive design across breakpoints
- [x] Add alt text and accessibility features

## Phase 7: Book Service Page
- [x] Create booking form with fields: name, phone, vehicle type, vehicle model, service, date, notes
- [x] Implement form validation with React Hook Form + Zod
- [x] Add success/error states and notifications
- [x] Trigger owner notification on submission
- [x] Store bookings in database

## Phase 8: Contact Page
- [x] Display business address (Hubli, Karnataka)
- [x] Show phone numbers and email
- [x] Display working hours
- [x] Embed interactive Google Map with location marker
- [x] Create contact form with fields: name, phone, email, subject, message
- [x] Implement form submission with owner notification
- [x] Add WhatsApp CTA button

## Phase 9: About Page
- [x] Write business story section
- [x] Create team section with member cards
- [x] Display certifications and awards
- [x] List core values
- [x] Add professional images

## Phase 10: Legal Pages
- [x] Create Privacy Policy page
- [x] Create Terms & Conditions page
- [x] Ensure compliance with Indian regulations

## Phase 11: SEO & Metadata
- [x] Implement metadata API for all pages
- [x] Add Open Graph tags for social sharing
- [x] Add Twitter Card tags
- [x] Create JSON-LD for LocalBusiness
- [x] Create JSON-LD for Service schema
- [x] Create JSON-LD for Breadcrumb schema
- [x] Generate sitemap.xml
- [x] Create robots.txt
- [x] Target keywords: Car Service Hubli, Oil Change Hubli, Wheel Alignment Hubli, Car Detailing Hubli, AC Service Hubli, Automotive Workshop Hubli

## Phase 12: Responsive Design & Testing
- [x] Test on 320px (mobile)
- [x] Test on 768px (tablet)
- [x] Test on 1024px (small desktop)
- [x] Test on 1440px (desktop)
- [x] Test on 1920px (large desktop)
- [x] Verify keyboard navigation
- [x] Test focus states
- [x] Verify alt text on all images
- [x] Ensure semantic HTML structure

## Phase 13: Accessibility (WCAG AA)
- [x] Verify color contrast ratios
- [x] Test keyboard navigation on all pages
- [x] Verify focus indicators
- [x] Check form labels and error messages
- [x] Test with screen reader

## Phase 14: Performance & Lighthouse
- [x] Optimize images for web
- [x] Implement lazy loading
- [x] Minimize CSS/JS bundles
- [x] Target Lighthouse scores: Performance >90, Accessibility >95, SEO >95, Best Practices >95

## Phase 15: Testing
- [x] Write vitest tests for critical functions
- [x] Test booking form submission
- [x] Test contact form submission
- [x] Test navigation between pages
- [x] Test responsive layouts

## Phase 16: Final Polish & Deployment
- [x] Review all pages for typos and consistency
- [x] Verify all CTAs work correctly
- [x] Test all forms end-to-end
- [x] Verify email notifications work
- [x] Create checkpoint and prepare for deployment


## Phase 17: FAQ Section Enhancement
- [x] Create FAQ component with accordion-style dropdowns
- [x] Add FAQ data with common customer questions and answers
- [x] Integrate FAQ section into Homepage
- [x] Test accordion functionality and responsiveness
- [x] Update checkpoint with FAQ feature

## Phase 18: Service Images & Customer Review System
- [x] Upload professional photos for all 7 remaining services
- [x] Update Services page with new service images
- [x] Create reviews database table
- [x] Create ReviewForm component for customer submissions
- [x] Create ReviewsList component to display approved reviews
- [x] Create Reviews page with form and reviews list
- [x] Add reviews router endpoints (create, list)
- [x] Add Reviews link to navigation menu
- [x] Test review form submission and display

## Phase 19: Admin Panel & Content Management
- [x] Implement Admin Authentication & Access Control (Login, protected admin routes, role checks)
- [x] Create Admin Dashboard (Overview of total bookings, recent activity, quick statistics)
- [x] Create Booking Management (Table with search, sort, filter, details view, status updates, delete, export to CSV/Excel)
- [x] Implement Media & Image Management (CMS, Workshop Gallery uploads/reorder, Service thumbnails, site-wide image replacement, cloud storage integration)
- [x] Implement Dynamic Content Editing (Manage Hero, About, Services, Contact details, business hours, social links, SEO metadata, Testimonials, FAQ)
- [x] Ensure Responsive & Premium Design (Matched theme styling, activities log, and RBAC support)
