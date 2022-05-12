import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  fontSize?: string;
  margin?: string;
}

function GrayText({ children, ...rest }: Props) {
  const styles = {
    ...rest,
  };
  return <Atom {...styles}>{children}</Atom>;
}

export default GrayText;

GrayText.defaultProps = {
  fontSize: '1.4rem',
  margin: '0',
};

const Atom = styled.p<Props>`
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
  color: rgba(34, 34, 34, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
