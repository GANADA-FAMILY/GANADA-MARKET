import React from 'react';
import styled from '@emotion/styled';

interface Props {
  src: string;
  alt: string;
}

function Logo({ src, alt }: Props) {
  return <Atom src={src} alt={alt} />;
}

const Atom = styled.img`
  width: 100%;
  max-width: 5rem;
  max-height: 4rem;
  height: 100%;
  object-fit: contain;
`;

export default Logo;
