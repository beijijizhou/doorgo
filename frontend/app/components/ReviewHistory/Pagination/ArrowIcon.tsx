// src/components/ArrowIcon.tsx

import React from 'react';

interface ArrowIconProps {
  direction: 'left' | 'right';  // Prop to determine the direction
  className?: string;           // Classname for styling
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ direction }) => {
  const rightArrowPath = "M10.293 15.293a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 10-1.414 1.414L13.586 9H3a1 1 0 100 2h10.586l-3.293 3.293a1 1 0 000 1.414z";
  const leftArrowPath = "M9.707 4.707a1 1 0 010 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z";

  const path = direction === 'right' ? rightArrowPath : leftArrowPath;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={'h-5 w-5'}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
  );
};

  

