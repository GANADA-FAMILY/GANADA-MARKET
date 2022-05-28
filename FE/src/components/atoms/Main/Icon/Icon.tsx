import React from 'react';

interface SVGProps<T> {
  children: React.ReactNode;
  option: T;
}

// SVGAtom => IconMolecular
function Icon<T>({ children, option }: SVGProps<T>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...option}
    >
      {children}
    </svg>
  );
}

export default Icon;
