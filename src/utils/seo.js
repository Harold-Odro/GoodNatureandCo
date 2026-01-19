export const createLocalBusinessSchema = (businessData) => {
  return {
    "@context": "https://schema.org",
    "@type": "Florist",
    ...businessData
  };
};

export const defaultOgImage = 'https://goodnature.com/og-image.jpg';

export const siteUrl = 'https://goodnature.com';
