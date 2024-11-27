// src/components/ArrowIcon.tsx

import React from 'react';

interface ArrowIconProps {
  className?: string; // Optional className prop to allow customization of the icon's style
}

export const RightArrowIcon: React.FC<ArrowIconProps> = ({ className = 'h-5 w-5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10.293 15.293a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 10-1.414 1.414L13.586 9H3a1 1 0 100 2h10.586l-3.293 3.293a1 1 0 000 1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export const LeftArrowIcon: React.FC<ArrowIconProps> = ({ className = 'h-5 w-5' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9.707 4.707a1 1 0 010 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
  

