import React, { useState } from 'react';
import { PackageCheck, Truck, Warehouse, Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackType?: 'warehouse' | 'picking' | 'fleet' | 'building';
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackType = 'warehouse',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  const renderIcon = () => {
    switch (fallbackType) {
      case 'picking':
        return <PackageCheck className="w-10 h-10 text-fuchsia-400" strokeWidth={1.5} />;
      case 'fleet':
        return <Truck className="w-10 h-10 text-fuchsia-400" strokeWidth={1.5} />;
      case 'building':
        return <Building2 className="w-10 h-10 text-fuchsia-400" strokeWidth={1.5} />;
      case 'warehouse':
      default:
        return <Warehouse className="w-10 h-10 text-fuchsia-400" strokeWidth={1.5} />;
    }
  };

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#130D24] to-[#1F1135] text-white p-6 text-center select-none ${className}`}
      >
        {renderIcon()}
        <span className="mt-3 text-xs font-medium tracking-wide text-violet-200 max-w-[26ch]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
