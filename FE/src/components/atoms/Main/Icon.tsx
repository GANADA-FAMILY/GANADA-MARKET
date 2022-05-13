import React, { useState } from 'react';
import styled from '@emotion/styled';

interface SVGProps {
  isLike: boolean;
}
// SVGAtom => IconMolecular
function Icon({ isLike }: SVGProps) {
  const Like = () => {
    console.log('i love it');
    // 해당 상품에 대한 찜
  };
  return (
    <Atom>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        height="18px"
        width="15px"
        stroke="black"
        strokeWidth="1"
        fill={isLike ? 'black' : 'none'}
        onClick={Like}
      >
        <path d="M1,1 L1,17 L7.5,9 L14,17 L14,1 Z" />
      </svg>
    </Atom>
  );
}

const Atom = styled.div`
  z-index: 1;
`;

export default Icon;
