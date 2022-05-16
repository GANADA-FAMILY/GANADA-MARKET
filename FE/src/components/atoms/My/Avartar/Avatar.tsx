import styled from '@emotion/styled';

interface AvartarProps {
  src: string;
  size?: number;
  alt?: string;
  className?: string;
}
function Avatar({ size = 100, src, alt = 'avatar', ...props }: AvartarProps) {
  return (
    <Atom
      className={props.className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <AvartarImage src={src} alt={alt} />
    </Atom>
  );
}
const Atom = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;
const AvartarImage = styled.img`
  width: 100%;
  height: 100%;
`;

Avatar.defaultProps = {
  size: 100,
  alt: 'avatar',
  className: '',
};

export default Avatar;
