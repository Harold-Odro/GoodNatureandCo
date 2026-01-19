import { Helmet } from 'react-helmet-async';

export function SEO({
  title,
  description,
  canonical,
  ogImage,
  schema
}) {
  const siteUrl = 'https://goodnature.com';
  const defaultOgImage = `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${siteUrl}${canonical}`} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:url" content={`${siteUrl}${canonical}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Good Nature" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />

      {/* Schema.org structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
