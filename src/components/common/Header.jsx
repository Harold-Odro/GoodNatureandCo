import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { CartButton } from './CartButton';
import { ROUTES } from '../../utils/constants';

export function Header({ logoLinkTo = null, navItems = [], showCart = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ivory-100/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo - left side */}
          <div className="flex-shrink-0">
            <Logo linkTo={logoLinkTo} size="md" color="dark" variant="full" />
          </div>

          {/* Right side - Navigation + Cart */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            {navItems.length > 0 && (
              <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-body text-sm tracking-wide uppercase transition-colors relative group py-2 ${
                      location.pathname === item.path
                        ? 'text-sage-700 font-semibold'
                        : 'text-charcoal-600 hover:text-sage-600'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 w-full h-0.5 bg-sage-500 transform origin-left transition-transform duration-300 ${
                        location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                ))}
              </nav>
            )}

            {/* Cart Button & Mobile Menu Button */}
            <div className="flex items-center gap-2">
              {showCart && <CartButton />}

              {navItems.length > 0 && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-charcoal-700 hover:text-sage-600 transition-colors rounded-lg hover:bg-linen-100"
                  aria-label="Toggle menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {navItems.length > 0 && mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-linen-200 bg-ivory-50/95">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-3 px-4 font-body text-sm tracking-wide uppercase transition-colors rounded-lg ${
                    location.pathname === item.path
                      ? 'text-sage-700 font-semibold bg-sage-50'
                      : 'text-charcoal-600 hover:text-sage-600 hover:bg-linen-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
