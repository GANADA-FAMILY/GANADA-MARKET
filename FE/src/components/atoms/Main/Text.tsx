import React from 'react';
import styled from '@emotion/styled';
import { StringMap } from 'ts-jest';

interface TextProps {
  children: React.ReactNode;
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  className?: string;
}

function Text({ children, fontSize, color, fontWeight, className }: TextProps) {
  const styles = {
    color,
    fontSize,
    fontWeight,
    className,
  };
  return <Atom {...styles}>{children}</Atom>;
}

Text.defaultProps = {
  fontSize: '1.4rem',
  color: 'black',
  fontWeight: 'normal',
};
export default Text;

const Atom = styled.p<TextProps>`
  line-height: 2rem;
  text-align: left;
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;
