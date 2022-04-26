import React from 'react';
import styled from '@emotion/styled';

interface TitleBarProps {
  title: string;
  size?: number;
  boundary?: string;
  src?: string;
}

function TitleBar({ title, size, boundary, src, ...rest }: TitleBarProps) {
  return (
    <Molecule style={{}} {...rest}>
      <h3
        style={{
          fontSize: `${size}px`,
        }}
      >
        {title}
      </h3>
    </Molecule>
  );
}

TitleBar.defaultProps = {
  size: 18,
  boundary: '3px solid #222',
  src: '#',
};
const Molecule = styled.div``;
export default TitleBar;
