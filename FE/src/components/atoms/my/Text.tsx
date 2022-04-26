import styled from '@emotion/styled';
import React from 'react';

interface TextProps {
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

function Text({
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
}: TextProps) {
  return (
    <Atom
      style={{
        color: `${color}`,
        display: `${display}`,
        fontSize: `${size}px`,
        ...rest,
      }}

      // {...rest}
    >
      {children}
    </Atom>
  );
}

const Atom = styled.span`
  font-size: 14px;
`;

Text.defaultProps = {
  className: '',
  fontWeight: '',
  color: '#000000',
  display: 'block',
  textAlign: '',
  style: '',
  size: '14',
};

export default Text;
