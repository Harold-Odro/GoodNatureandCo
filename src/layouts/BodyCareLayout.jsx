import { Footer } from '../components/common/Footer';

export function BodyCareLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main id="main-content" className="grow">
        {children}
      </main>
      <Footer variant="minimal" />
    </div>
  );
}
