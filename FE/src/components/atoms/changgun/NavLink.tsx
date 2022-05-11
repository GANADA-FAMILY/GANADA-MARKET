import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface StyledLinkProps {
  $isActive: boolean;
}

const activeStyle = ({ $isActive }: StyledLinkProps) => {
  if ($isActive) {
    return css`
      font-weight: 700;
      text-decoration: underline;
    `;
  }
  return css`
    font-weight: 400;
    text-decoration: none;
  `;
};

const NavLink = styled(Link)<StyledLinkProps>`
  color: black;
  font-size: 1.5rem;
  ${activeStyle}
`;

export { NavLink };
