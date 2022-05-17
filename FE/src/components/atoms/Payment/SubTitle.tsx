import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  fontSize?: string;
  margin?: string;
}

function SubTitle({ children, fontSize, margin }: Props) {
  const styles = {
    fontSize,
    margin,
  };
  return <Atom {...styles}>{children}</Atom>;
}

SubTitle.defaultProps = {
  fontSize: '1.4rem',
  margin: '0',
};

const Atom = styled.p<Props>`
  font-size: ${(props) => props.fontSize};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default SubTitle;
