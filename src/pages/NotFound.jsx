import { Link } from 'react-router-dom'
import { SEO } from '../components/common/SEO'
import { Button } from '../components/common/Button'
import { ROUTES } from '../utils/constants'

export function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | Good Nature"
        description="The page you're looking for doesn't exist. Return to Good Nature homepage."
        noindex={true}
      />

      <div className="min-h-screen bg-ivory-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          {/* Decorative botanical illustration */}
          <div className="mb-8">
            <svg
              className="w-32 h-32 mx-auto text-sage-400"
              viewBox="0 0 100 100"
              fill="none"
            >
              {/* Stylized wilted flower */}
              <path
                d="M50 90 Q50 60, 50 40"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M50 40 Q35 30, 30 20 Q40 25, 50 40"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M50 40 Q65 30, 70 20 Q60 25, 50 40"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M50 50 Q30 45, 25 35 Q35 42, 50 50"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M50 50 Q70 45, 75 35 Q65 42, 50 50"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              <circle cx="50" cy="35" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* 404 Number */}
          <h1 className="font-display text-8xl md:text-9xl text-sage-300 mb-4">
            404
          </h1>

          <h2 className="font-display text-2xl md:text-3xl text-charcoal-800 mb-4">
            Page Not Found
          </h2>

          <p className="text-charcoal-600 mb-8 leading-relaxed">
            Like a flower that&apos;s wandered off the path, this page seems to have gone missing.
            Let&apos;s help you find your way back to our garden.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={ROUTES.home} variant="primary">
              Return Home
            </Button>
            <Button href={ROUTES.floralHome} variant="outline">
              Explore Floral
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-linen-200">
            <p className="text-sm text-charcoal-600 mb-4">
              Or try one of these pages:
            </p>
            <nav className="flex flex-wrap justify-center gap-4">
              <Link
                to={ROUTES.floralPortfolio}
                className="text-sage-600 hover:text-sage-700 text-sm underline underline-offset-2"
              >
                Portfolio
              </Link>
              <Link
                to={ROUTES.floralShop}
                className="text-sage-600 hover:text-sage-700 text-sm underline underline-offset-2"
              >
                Shop
              </Link>
              <Link
                to={ROUTES.floralContact}
                className="text-sage-600 hover:text-sage-700 text-sm underline underline-offset-2"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
