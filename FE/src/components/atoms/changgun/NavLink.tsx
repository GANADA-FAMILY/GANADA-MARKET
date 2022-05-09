import React from 'react';
import styled from 'styled-components';
import { Link as DefaultLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  className?: string;
  children: string;
}

Link.defaultProps = {
  className: '',
};

function Link({ to, className, children }: LinkProps) {
  return (
    <DefaultLink className={className} to={to}>
      {children}
    </DefaultLink>
  );
}

const StyledLink = styled(Link)<{ isActive: boolean }>`
  color: black;
  font-size: 1.5rem;
  font-weight: ${(props) => (props.isActive ? '700' : '400')};
  text-decoration: ${(props) => (props.isActive ? 'underline' : 'none')};
`;

export default StyledLink;
