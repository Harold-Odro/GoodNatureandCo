import { Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/common/ScrollToTop'
import { CartDrawer } from './components/common/CartDrawer'
import Gateway from './pages/Gateway'
import FloralHome from './pages/floral/FloralHome'
import About from './pages/floral/About'
import Shop from './pages/floral/Shop'
import Portfolio from './pages/floral/Portfolio'
import Contact from './pages/floral/Contact'
import ComingSoon from './pages/bodycare/ComingSoon'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Gateway />} />
        <Route path="/floral-artistry" element={<FloralHome />} />
        <Route path="/floral-artistry/about" element={<About />} />
        <Route path="/floral-artistry/shop" element={<Shop />} />
        <Route path="/floral-artistry/portfolio" element={<Portfolio />} />
        <Route path="/floral-artistry/contact" element={<Contact />} />
        <Route path="/body-care" element={<ComingSoon />} />
      </Routes>
      <CartDrawer />
    </>
  )
}

export default App
