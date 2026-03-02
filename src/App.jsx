import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/common/ScrollToTop'
import { CartDrawer } from './components/common/CartDrawer'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { SkipLink } from './components/common/SkipLink'
import { PageTransition } from './components/common/PageTransition'
import { initAnalytics } from './utils/analytics'
import { usePageTracking } from './hooks/usePageTracking'

// Lazy load page components for code splitting
const Gateway = lazy(() => import('./pages/Gateway'))
const FloralHome = lazy(() => import('./pages/floral/FloralHome'))
const About = lazy(() => import('./pages/floral/About'))
const Shop = lazy(() => import('./pages/floral/Shop'))
const Portfolio = lazy(() => import('./pages/floral/Portfolio'))
const Contact = lazy(() => import('./pages/floral/Contact'))
const ComingSoon = lazy(() => import('./pages/bodycare/ComingSoon'))
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-sage-200 border-t-sage-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-charcoal-600 font-body">Loading...</p>
      </div>
    </div>
  )
}

function App() {
  useEffect(() => {
    initAnalytics()
  }, [])

  usePageTracking()

  return (
    <ErrorBoundary>
      <SkipLink />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Gateway />} />
            <Route path="/floral-artistry" element={<FloralHome />} />
            <Route path="/floral-artistry/about" element={<About />} />
            <Route path="/floral-artistry/shop" element={<Shop />} />
            <Route path="/floral-artistry/portfolio" element={<Portfolio />} />
            <Route path="/floral-artistry/contact" element={<Contact />} />
            <Route path="/body-care" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </Suspense>
      <CartDrawer />
    </ErrorBoundary>
  )
}

export default App
