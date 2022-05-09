import React from 'react';
import styled from '@emotion/styled';

interface ImageProps {
  src: string;
  alt: string;
  maxHeight?: string;
  margin?: string;
  height?: string;
}

function Image({ src, alt, ...rest }: ImageProps) {
  return <ImageAtom src={src} alt={alt} {...rest} />;
}

Image.defaultProps = {
  maxHeight: '282px',
  margin: '0',
  height: '20vw',
};

const ImageAtom = styled.img<ImageProps>`
  max-width: 128rem;
  max-height: ${(props) => props.maxHeight};
  src: url('${(props) => props.src}');
  width: 100%;
  height: ${(props) => props.height};
  border-radius: 1rem;
  background-position: center;
  background-size: contain;
  margin: ${(props) => props.margin};
`;

export default Image;
