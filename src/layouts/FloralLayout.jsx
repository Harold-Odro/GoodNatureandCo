import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ROUTES } from '../utils/constants';

export function FloralLayout({ children, showCart = false }) {
  const navItems = [
    { label: 'Home', path: ROUTES.floralHome },
    { label: 'About', path: ROUTES.floralAbout },
    { label: 'Shop', path: ROUTES.floralShop },
    { label: 'Portfolio', path: ROUTES.floralPortfolio },
    { label: 'Contact', path: ROUTES.floralContact }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header logoLinkTo={ROUTES.home} navItems={navItems} showCart={showCart} />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer variant="full" />
    </div>
  );
}
