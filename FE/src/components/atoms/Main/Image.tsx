import React from 'react';
import styled from '@emotion/styled';

interface ImageProps {
  src: string;
  alt: string;
  maxHeight?: string;
  margin?: string;
}

function Image({ src, alt, ...rest }: ImageProps) {
  return <ImageAtom src={src} alt={alt} {...rest} />;
}

Image.defaultProps = {
  maxHeight: '282px',
  margin: '0',
};

const ImageAtom = styled.div<ImageProps>`
  max-width: 128rem;
  max-height: ${(props) => props.maxHeight};
  background-image: url('${(props) => props.src}');
  width: 100%;
  height: 20vw;
  border-radius: 1rem;
  background-position: center;
  background-size: contain;
  margin: ${(props) => props.margin};
`;

export default Image;
