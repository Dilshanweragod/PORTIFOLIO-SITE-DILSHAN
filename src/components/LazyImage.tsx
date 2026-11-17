import React, { useEffect, useRef, useState } from 'react';
import { publicAssetUrl } from '../utils/publicAsset';

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  rootMargin?: string;
  threshold?: number;
  fallback?: React.ReactNode;
}

/**
 * IntersectionObserver-driven lazy image component.
 * Defers mounting/fetching <img src> until the container approaches the viewport,
 * minimizing initial page network payload on heavy photography & portfolio grids.
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = 'w-full h-full',
  referrerPolicy = 'no-referrer',
  rootMargin = '900px 0px',
  threshold = 0.01,
  fallback
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [shouldLoad, setShouldLoad] = useState<boolean>(
    () => typeof IntersectionObserver === 'undefined'
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  useEffect(() => {
    if (shouldLoad) return;
    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setShouldLoad(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad, rootMargin, threshold]);

  useEffect(() => {
    if (!shouldLoad) return;
    const imgEl = imgRef.current;
    if (!imgEl) return;
    if (imgEl.complete && imgEl.naturalWidth > 0) {
      setIsLoaded(true);
      return;
    }
    if (typeof imgEl.decode === 'function') {
      imgEl
        .decode()
        .then(() => setIsLoaded(true))
        .catch(() => {
          if (imgEl.complete && imgEl.naturalWidth > 0) {
            setIsLoaded(true);
          }
        });
    }
  }, [shouldLoad, src]);

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  const lazyState = hasError
    ? 'error'
    : isLoaded
    ? 'loaded'
    : shouldLoad
    ? 'loading'
    : 'pending';

  return (
    <div
      ref={containerRef}
      data-lazy-state={lazyState}
      data-lazy-src={src}
      className={`relative overflow-hidden bg-[#060606] ${containerClassName}`}
    >
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900/70 to-neutral-950 animate-pulse"
        />
      )}

      {shouldLoad ? (
        <img
          ref={imgRef}
          src={publicAssetUrl(src)}
          alt={alt}
          referrerPolicy={referrerPolicy}
          loading="eager"
          decoding="sync"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`${className} transition-opacity duration-200 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <span className="sr-only">{alt}</span>
      )}
    </div>
  );
};
