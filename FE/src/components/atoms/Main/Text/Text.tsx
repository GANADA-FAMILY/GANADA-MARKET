import React from 'react';
import styled from '@emotion/styled';
import theme from 'styles/theme';

interface TextProps {
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
  fontWeight?: string;
  lineHeight?: string;
  className?: string;
}

function Text({ children, ...rest }: TextProps) {
  return (
    <Atom className={rest.className} {...rest}>
      {children}
    </Atom>
  );
}

Text.defaultProps = {
  // color: theme.color.black,
  // fontWeight: 'normal',
  className: '',
};

const Atom = styled.p<TextProps>`
  line-height: ${(props) =>
    props.lineHeight === undefined ? '2rem' : props.lineHeight};
  color: ${(props) =>
    `${theme.color[props.color === undefined ? 'black' : props.color]}`};
  font-size: ${(props) =>
    `${props.fontSize === undefined ? 1.4 : props.fontSize / 10}rem`};
  font-weight: ${(props) =>
    props.fontWeight === undefined ? 'normal' : props.fontWeight};
`;

export default Text;
