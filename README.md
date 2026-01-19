# Good Nature Website

A multi-brand website featuring Good Nature Floral Artistry and Good Nature Body Care (coming soon).

## Features

- Multi-brand architecture with shared design system
- Responsive design with Tailwind CSS v4
- SEO optimized with React Helmet Async
- Contact forms powered by EmailJS
- Portfolio gallery with filtering and lightbox
- Scroll-reveal animations
- Accessibility focused

## Tech Stack

- React 18
- Vite
- Tailwind CSS v4
- React Router v6
- React Helmet Async
- EmailJS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and add your EmailJS credentials:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## Environment Variables

Create a `.env` file with the following variables:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
VITE_EMAILJS_NOTIFY_TEMPLATE_ID=your_notify_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/       # Shared components
│   ├── gateway/      # Gateway landing components
│   ├── floral/       # Floral Artistry components
│   └── bodycare/     # Body Care components
├── pages/            # Page components
├── layouts/          # Layout wrappers
├── hooks/            # Custom React hooks
├── data/             # Static data
├── utils/            # Utility functions
└── assets/           # Images and media
```

## Routes

- `/` - Gateway landing
- `/floral-artistry` - Floral Artistry home
- `/floral-artistry/portfolio` - Portfolio gallery
- `/floral-artistry/contact` - Contact page
- `/body-care` - Coming soon page

## To-Do Before Launch

- [ ] Replace placeholder images with real photos
- [ ] Configure EmailJS credentials
- [ ] Add real contact information
- [ ] Update social media links
- [ ] Add favicon and OG image
- [ ] Test all forms
- [ ] Run accessibility audit
- [ ] Run performance audit (Lighthouse)
- [ ] Test on multiple devices and browsers
- [ ] Submit sitemap to Google Search Console

## License

All rights reserved © 2025 Good Nature
