import React from 'react';
import styled from '@emotion/styled';
import Title from '../../../atoms/My/Title/Title';

interface TitleBarProps {
  title: string;
  size?: number;
  src?: string;
  bordered?: boolean;
  lineHeight?: number;
  color?: string;
}

function TitleBar({
  title,
  size,
  bordered,
  src,
  lineHeight,
  color,
  ...rest
}: TitleBarProps) {
  return (
    <Molecule
      style={{
        borderBottom: bordered ? '3px solid #222' : '',
      }}
      {...rest}
    >
      <Title level={3} size={size} lineHeight={lineHeight} color={color}>
        {title}
      </Title>
    </Molecule>
  );
}

TitleBar.defaultProps = {
  size: 18,
  bordered: false,
  src: '#',
  lineHeight: 15,
  color: 'black',
};
const Molecule = styled.div``;
export default TitleBar;
