import { ImageWrapper } from '../../layouts/changgun';
import { ImageSource } from '../../atoms/changgun';

interface FlexibleImageProps {
  width: string;
  height: string;
  src: string;
}

function FlexibleImage({ width, height, src }: FlexibleImageProps) {
  return (
    <ImageWrapper width={width} height={height}>
      <ImageSource src={src} />
    </ImageWrapper>
  );
}

export { FlexibleImage };
