import styled from '@emotion/styled';
import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  fontWeight?: string;
  color?: string;
  display?: string;
  textAlign?: string;
  style?: string;
  // role?: string;
  size?: number;
}

function Title({
  children,
  className,
  fontWeight,
  color,
  display,
  textAlign,
  style,
  // role,
  size = 14,
  ...rest
}: TitleProps) {
  return (
    <Atom
      style={{
        color: `${color}`,
        display: `${display}`,
        fontSize: `${size}px`,
      }}
    >
      {children}
    </Atom>
  );
}

const Atom = styled.strong`
  color: #000000;
  font-size: 18px;
`;

Title.defaultProps = {
  className: '',
  fontWeight: '',
  color: '#000000',
  display: 'block',
  textAlign: 'center',
  style: '',
  size: 18,
};
export default Title;
