'use client';

import React, { useEffect, useState } from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'full' | 'monogram' | 'text' | 'compact';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ variant = 'full', size = 'md', className = '', ...props }: LogoProps) {
  const [src, setSrc] = useState('/logo.png');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Avoid running on server side
    if (typeof window === 'undefined') return;

    const img = new Image();
    img.src = '/logo.png';
    // Use try-catch in case of local canvas extraction issues
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setSrc('/logo.png');
          setLoading(false);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Perfect luxury keying algorithm with feathered edges
        // Keys out pure white and light grey background pixels, keeping the gold emblem pristine.
        const threshold = 230;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          if (r > threshold && g > threshold && b > threshold) {
            const maxVal = Math.max(r, g, b);
            // Map luminance from [threshold, 255] to [255, 0] alpha
            const alpha = Math.round(((255 - maxVal) / (255 - threshold)) * 255);
            data[i + 3] = Math.max(0, Math.min(255, alpha));
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setSrc(canvas.toDataURL());
        setLoading(false);
      } catch (err) {
        console.error('Error keying out logo background:', err);
        setSrc('/logo.png');
        setLoading(false);
      }
    };

    img.onerror = () => {
      setSrc('/logo.png');
      setLoading(false);
    };
  }, []);

  // Standard sizes mapping
  const sizeClasses = {
    xs: {
      full: 'h-10 w-10',
      monogram: 'h-6 w-6',
      text: 'h-4 w-12',
      compact: 'h-8 w-8',
    },
    sm: {
      full: 'h-16 w-16',
      monogram: 'h-10 w-10',
      text: 'h-6 w-20',
      compact: 'h-12 w-12',
    },
    md: {
      full: 'h-24 w-24',
      monogram: 'h-16 w-16',
      text: 'h-10 w-32',
      compact: 'h-20 w-20',
    },
    lg: {
      full: 'h-36 w-36',
      monogram: 'h-24 w-24',
      text: 'h-16 w-48',
      compact: 'h-28 w-28',
    },
    xl: {
      full: 'h-56 w-56',
      monogram: 'h-36 w-36',
      text: 'h-24 w-72',
      compact: 'h-44 w-44',
    },
  };

  const selectedSize = sizeClasses[size][variant] || sizeClasses.md.full;

  // Let's implement dynamic cropping using inline CSS depending on variant
  if (variant === 'monogram') {
    // Just the top 'M' monogram
    // The monogram is mathematically centered with a scale factor of 3.4
    return (
      <div 
        className={`relative overflow-hidden block shrink-0 ${selectedSize} ${className}`}
        style={{ aspectRatio: '1/1' }}
      >
        <img
          src={src}
          alt="Maven & Co. Monogram"
          className="absolute max-w-none transition-opacity duration-300"
          style={{
            width: '340%',
            height: '340%',
            top: '-72.7%',
            left: '-120.9%',
            opacity: loading ? 0 : 1,
          }}
          {...props}
        />
        {loading && (
          <div className="absolute inset-0 bg-maven-cream/10 animate-pulse rounded-full" />
        )}
      </div>
    );
  }

  if (variant === 'text') {
    // Just the middle 'MAVEN' wordmark
    // Located roughly in the middle vertical band [45%, 70%]
    return (
      <div 
        className={`relative overflow-hidden block shrink-0 ${selectedSize} ${className}`}
        style={{ aspectRatio: '3/1' }}
      >
        <img
          src={src}
          alt="Maven Wordmark"
          className="absolute max-w-none transition-opacity duration-300"
          style={{
            width: '160%',
            height: '480%',
            top: '-230%',
            left: '-30%',
            opacity: loading ? 0 : 1,
          }}
          {...props}
        />
        {loading && (
          <div className="absolute inset-0 bg-maven-cream/10 animate-pulse rounded" />
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    // Monogram 'M' and 'MAVEN' text, removing the bottom '& CO.' line
    // Roughly the top 75% of the square image
    return (
      <div 
        className={`relative overflow-hidden block shrink-0 ${selectedSize} ${className}`}
        style={{ aspectRatio: '1/0.8' }}
      >
        <img
          src={src}
          alt="Maven Compact Logo"
          className="absolute max-w-none transition-opacity duration-300"
          style={{
            width: '100%',
            height: '133%',
            top: '0%',
            left: '0%',
            opacity: loading ? 0 : 1,
          }}
          {...props}
        />
        {loading && (
          <div className="absolute inset-0 bg-maven-cream/10 animate-pulse rounded" />
        )}
      </div>
    );
  }

  // Full Logo Variant
  return (
    <div className={`relative shrink-0 ${selectedSize} ${className}`} style={{ aspectRatio: '1/1' }}>
      <img
        src={src}
        alt="Maven & Co. Logo"
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-1'
        }`}
        {...props}
      />
      {loading && (
        <div className="absolute inset-0 bg-maven-cream/10 animate-pulse rounded-2xl" />
      )}
    </div>
  );
}
