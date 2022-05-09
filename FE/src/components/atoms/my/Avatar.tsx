import styled from '@emotion/styled';
import React from 'react';

interface AvartarProps {
  src: string;
  size?: string;
  alt?: string;
}
function Avatar({ src, size = '100', alt = 'avatar', ...rest }: AvartarProps) {
  return (
    <Atom
      style={{
        width: `${size}`,
        height: `${size}`,
      }}
      {...rest}
    >
      <AvartarImage src={src} alt={alt} />
    </Atom>
  );
}
const Atom = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;
const AvartarImage = styled.img`
  width: 100%;
  height: 100%;
`;

Avatar.defaultProps = {
  size: '100',
  alt: 'avatar',
};

export default Avatar;
