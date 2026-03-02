import { useState } from 'react';

/**
 * OptimizedImage - Handles lazy loading, responsive srcset, format negotiation, and loading states.
 *
 * For Unsplash images:
 *   - Generates multiple widths for srcset
 *   - Uses Unsplash's auto=format (serves WebP/AVIF automatically based on browser Accept header)
 *
 * For local/client images:
 *   - Use the `webpSrc` and `avifSrc` props to provide modern format alternatives
 *   - Falls back to the original `src` for browsers that don't support modern formats
 *
 * Usage:
 *   <OptimizedImage src="/images/hero.jpg" avifSrc="/images/hero.avif" webpSrc="/images/hero.webp" alt="Hero" />
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  width,
  height,
  priority = false,
  webpSrc,
  avifSrc,
  onLoad,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const isUnsplash = src?.includes('unsplash.com');

  // Generate srcset for Unsplash images at multiple widths
  const getSrcSet = (format) => {
    if (!isUnsplash) return undefined;
    const baseUrl = src.split('?')[0];
    const widths = [400, 640, 800, 1024, 1280, 1600, 1920];
    const fmParam = format ? `&fm=${format}` : '&auto=format';
    return widths
      .map((w) => `${baseUrl}?w=${w}${fmParam}&fit=crop&q=80 ${w}w`)
      .join(', ');
  };

  // Generate srcset for local images with modern format alternatives
  const getLocalSrcSet = (formatSrc) => {
    if (!formatSrc) return undefined;
    return formatSrc;
  };

  // Get optimized src fallback
  const getOptimizedSrc = () => {
    if (!isUnsplash) return src;
    const baseUrl = src.split('?')[0];
    return `${baseUrl}?w=800&auto=format&fit=crop&q=80`;
  };

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div
        className={`bg-linen-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <svg className="w-12 h-12 text-charcoal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const imgProps = {
    alt,
    loading: priority ? 'eager' : 'lazy',
    decoding: priority ? 'sync' : 'async',
    className: `${className} ${!loaded && !priority ? 'sr-only' : ''}`,
    width,
    height,
    onLoad: handleLoad,
    onError: handleError,
    ...props,
  };

  const placeholder = !loaded && !priority && (
    <div
      className={`bg-linen-100 animate-pulse ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );

  // Use <picture> element for format negotiation
  const usesPicture = isUnsplash || avifSrc || webpSrc;

  if (usesPicture) {
    return (
      <>
        {placeholder}
        <picture>
          {/* AVIF - best compression */}
          {isUnsplash && (
            <source
              type="image/avif"
              srcSet={getSrcSet('avif')}
              sizes={sizes}
            />
          )}
          {avifSrc && (
            <source type="image/avif" srcSet={getLocalSrcSet(avifSrc)} />
          )}

          {/* WebP - wide support, good compression */}
          {isUnsplash && (
            <source
              type="image/webp"
              srcSet={getSrcSet('webp')}
              sizes={sizes}
            />
          )}
          {webpSrc && (
            <source type="image/webp" srcSet={getLocalSrcSet(webpSrc)} />
          )}

          {/* Fallback: auto-format for Unsplash, original for local */}
          <img
            src={getOptimizedSrc()}
            srcSet={isUnsplash ? getSrcSet() : undefined}
            sizes={isUnsplash ? sizes : undefined}
            {...imgProps}
          />
        </picture>
      </>
    );
  }

  // Simple img fallback for non-Unsplash without modern format alternatives
  return (
    <>
      {placeholder}
      <img src={src} {...imgProps} />
    </>
  );
}
