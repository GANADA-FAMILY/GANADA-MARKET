import styled, { css } from 'styled-components';

interface TextButtonProps {
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: string;
}

const fontSize = ({ size }: TextButtonProps) => {
  switch (size) {
    case 'small':
      return css`
        font-size: 1.2rem;
      `;
    case 'large':
      return css`
        font-size: 1.6rem;
      `;
    default:
  }
  return css`
    font-size: 1.4rem;
  `;
};

const StyledButton = styled.button<TextButtonProps>`
  border: none;
  background: none;
  ${fontSize}
  &:hover {
    font-weight: 600;
    cursor: pointer;
  }
`;

TextButton.defaultProps = {
  onClick: () => null,
  size: 'medium',
};

function TextButton({ size, onClick, children }: TextButtonProps) {
  return (
    <StyledButton size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export { TextButton };
