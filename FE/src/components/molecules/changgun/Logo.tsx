import styled from 'styled-components';
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
    <LogoLayout width={width} height={height}>
      <FlexibleImage src="./images/Logo.png" />
    </LogoLayout>
  );
}

export { Logo };
