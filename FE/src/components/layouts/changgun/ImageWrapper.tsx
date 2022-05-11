import styled from 'styled-components';

interface WrapperProps {
  width: string;
  height: string;
}

const Wrapper = styled.div<WrapperProps>`
  width: ${(p) => `${p.width}`};
  height: ${(p) => `${p.height}`};
`;

interface ImageWrapperProps {
  children: React.ReactNode;
  width: string;
  height: string;
}

function ImageWrapper({ children, width, height }: ImageWrapperProps) {
  return (
    <Wrapper width={width} height={height}>
      {children}
    </Wrapper>
  );
}

export { ImageWrapper };
