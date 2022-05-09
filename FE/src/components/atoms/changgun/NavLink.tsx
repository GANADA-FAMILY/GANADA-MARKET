import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface StyledLinkProps {
  $isActive: boolean;
}

const activeStyle = ({ $isActive }: StyledLinkProps) => {
  if ($isActive) {
    return `
      font-weight: 700;
      text-decoration: underline`;
  }
  return `
    font-weight: 400;
    text-decoration: none;
  `;
};

const StyledLink = styled(Link)<StyledLinkProps>`
  color: black;
  font-size: 1.5rem;
  ${activeStyle}
`;

export default StyledLink;
