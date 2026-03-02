import { Footer } from '../components/common/Footer';

export function GatewayLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer variant="minimal" />
    </div>
  );
}
