import React from 'react';
import styled from '@emotion/styled';
import { Input } from 'antd';

const ASD = styled(Input)`
  display: block;
`;

interface TitleBarProps {
  title: string;
  size?: number;
  src?: string;
  bordered?: boolean;
}

function TitleBar({ title, size, bordered, src, ...rest }: TitleBarProps) {
  return (
    <Molecule
      style={{
        borderBottom: bordered ? '3px solid #222' : '',
      }}
      {...rest}
    >
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
  bordered: false,
  src: '#',
};
const Molecule = styled.div``;
export default TitleBar;
