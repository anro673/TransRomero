import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';

interface BrandLogoProps {
  variant?: 'light-surface' | 'dark-surface';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-10 sm:h-11 w-auto',
}) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !COMPANY_INFO.images.logo) {
    return (
      <span className="inline-flex items-baseline font-display text-xl font-bold tracking-tight select-none text-white">
        <span>Trans</span>
        <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
          Romero
        </span>
      </span>
    );
  }

  return (
    <img
      src={COMPANY_INFO.images.logo}
      alt={`Logotipo oficial de ${COMPANY_INFO.brandName}`}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={`${className} object-contain shrink-0 select-none bg-transparent`}
    />
  );
};
