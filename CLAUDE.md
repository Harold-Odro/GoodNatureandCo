# Good Nature Website

## Project Overview
Multi-brand website for Good Nature, featuring Floral Artistry (full site) and Body Care (coming soon). Built with React, Tailwind CSS v4, and Vite.

## Tech Stack
- React 18+
- Tailwind CSS v4 (CSS-first configuration)
- Vite
- React Router v6
- React Helmet Async (SEO)
- EmailJS (contact forms)

## Commands
- `npm install` — Install dependencies
- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## Project Structure
- `/src/components/common/` — Shared components (Header, Footer, Button, etc.)
- `/src/components/gateway/` — Gateway landing page components
- `/src/components/floral/` — Floral Artistry specific components
- `/src/components/bodycare/` — Body Care specific components
- `/src/pages/` — Page components mapped to routes
- `/src/layouts/` — Layout wrappers for different sections
- `/src/hooks/` — Custom React hooks
- `/src/data/` — Static data (services, portfolio items)

## Architecture Decisions

### Routing Structure
- `/` — Gateway (choose Floral or Body Care)
- `/floral-artistry` — Floral Artistry Home
- `/floral-artistry/portfolio` — Portfolio/Gallery
- `/floral-artistry/contact` — Contact page
- `/body-care` — Coming Soon page

### Navigation Logic
- Gateway: Logo is static (already at root)
- Floral Artistry: Logo links back to gateway `/`
- Body Care: Logo links back to gateway `/`

### Styling Conventions
- Use Tailwind CSS v4 with CSS-first configuration in `app.css`
- Custom colors defined in `@theme` block
- Component-specific styles use Tailwind utilities
- Animations use CSS transitions and keyframes

### Form Handling
- Contact form uses EmailJS
- Credentials stored in environment variables
- Notify form (Body Care) also uses EmailJS

## Environment Variables
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
VITE_EMAILJS_NOTIFY_TEMPLATE_ID=your_notify_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## SEO Implementation
- React Helmet Async for meta tags
- Unique title/description per page
- Open Graph tags for social sharing
- LocalBusiness schema markup
- sitemap.xml in public folder
- robots.txt configured

## Image Placeholders
Using Unsplash for development. Search terms:
- Floral arrangements
- Wedding flowers
- Botanical
- Natural bouquet
- Organic flowers

Replace with client images when available.

## Code Conventions
- Functional components with hooks
- Named exports for components
- Props destructuring
- Tailwind classes in className (no CSS modules)
- Keep components focused and composable

## Build Order
1. Create CLAUDE.md
2. Set up Vite + React + Tailwind v4
3. Build common components (Logo, Button, SEO, layouts)
4. Gateway page
5. Floral layout + navigation
6. Floral home page
7. Portfolio page
8. Contact page
9. Body Care placeholder
10. Polish with animations and SEO
