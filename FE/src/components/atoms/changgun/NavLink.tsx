import styled, { css } from 'styled-components';
import { Link as DefaultLink, useLocation } from 'react-router-dom';

interface LinkProps {
  to: string;
  children: string;
}

interface StyledLinkProps {
  isActive: boolean;
}

const activeStyle = ({ isActive }: StyledLinkProps) => {
  if (isActive) {
    return css`
      font-weight: 700;
      border-bottom: 2px solid black;
    `;
  }
  return css`
    font-weight: 300;
    text-decoration: none;
  `;
};

const StyledLink = styled(DefaultLink)<StyledLinkProps>`
  font-size: 1.5rem;
  text-decoration: none;
  color: black;
  padding: 0.2rem;
  ${activeStyle}
`;

function NavLink({ to, children }: LinkProps) {
  const { pathname } = useLocation();

  return (
    <StyledLink isActive={pathname === to} to={to}>
      {children}
    </StyledLink>
  );
}

export { NavLink };
