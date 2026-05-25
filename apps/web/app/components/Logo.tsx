'use client';

import React from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'full' | 'monogram' | 'text' | 'compact';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ variant = 'full', size = 'md', className = '', ...props }: LogoProps) {
  const src = '/logo.webp';

  // Standard sizes mapping exactly matching original layout dimensions
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

  if (variant === 'monogram') {
    // Just the top 'M' monogram cropped mathematically matching original layout
    return (
      <div 
        className={`relative overflow-hidden block shrink-0 ${selectedSize} ${className}`}
        style={{ aspectRatio: '1/1' }}
      >
        <img
          src={src}
          alt="Maven & Co. Monogram"
          className="absolute max-w-none"
          style={{
            width: '340%',
            height: '340%',
            top: '-72.7%',
            left: '-120.9%',
          }}
          {...props}
        />
      </div>
    );
  }

  if (variant === 'text') {
    // Just the middle 'MAVEN' wordmark cropped mathematically matching original layout
    return (
      <div 
        className={`relative overflow-hidden block shrink-0 ${selectedSize} ${className}`}
        style={{ aspectRatio: '3/1' }}
      >
        <img
          src={src}
          alt="Maven Wordmark"
          className="absolute max-w-none"
          style={{
            width: '160%',
            height: '480%',
            top: '-230%',
            left: '-30%',
          }}
          {...props}
        />
      </div>
    );
  }

  if (variant === 'compact') {
    // Monogram 'M' and 'MAVEN' text, removing the bottom '& CO.' line
    return (
      <div 
        className={`relative overflow-hidden block shrink-0 ${selectedSize} ${className}`}
        style={{ aspectRatio: '1/0.8' }}
      >
        <img
          src={src}
          alt="Maven Compact Logo"
          className="absolute max-w-none"
          style={{
            width: '100%',
            height: '133%',
            top: '0%',
            left: '0%',
          }}
          {...props}
        />
      </div>
    );
  }

  // Full Logo Variant
  return (
    <div className={`relative shrink-0 ${selectedSize} ${className}`} style={{ aspectRatio: '1/1' }}>
      <img
        src={src}
        alt="Maven & Co. Logo"
        className="w-full h-full object-contain"
        {...props}
      />
    </div>
  );
}
