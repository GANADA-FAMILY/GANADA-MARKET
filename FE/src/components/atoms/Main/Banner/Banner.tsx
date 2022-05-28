import React from 'react';
import styled from '@emotion/styled';

interface BannerProps {
  src: string;
  onClick: React.MouseEventHandler<HTMLImageElement>;
}
function Banner({ src, onClick }: BannerProps) {
  return <Atom onClick={onClick} src={src} />;
}

export default Banner;

const Atom = styled.img`
  width: 100%;
  max-height: 48rem;
  height: 20vw;
  cursor: pointer;
`;
