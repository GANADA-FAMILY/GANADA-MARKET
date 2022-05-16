import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FlexibleImage } from '../../atoms/changgun';

const LogoLayout = styled.div<LogoProps>`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
`;

interface LogoProps {
  width: string;
  height: string;
}

function Logo({ width, height }: LogoProps) {
  return (
    <Link to="/">
      <LogoLayout width={width} height={height}>
        <FlexibleImage src="./images/logo.png" />
      </LogoLayout>
    </Link>
  );
}

export { Logo };
