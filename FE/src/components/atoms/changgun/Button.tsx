import styled, { css } from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  backgroundColor?: string;
  padding?: string;
  isActive?: boolean;
  activeStyle?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const applyActiveStyle = ({ isActive, activeStyle }: ButtonProps) => {
  if (isActive) {
    return css`
      ${activeStyle}
    `;
  }
  return '';
};

Button.defaultProps = {
  backgroundColor: '#efefef',
  padding: '1rem',
  isActive: false,
  activeStyle: '',
  onClick: () => null,
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 0.5rem;
  background-color: ${(p) => p.backgroundColor};
  padding: ${(p) => p.padding};
  ${applyActiveStyle}
`;

function Button({
  activeStyle,
  isActive,
  children,
  backgroundColor,
  padding,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      activeStyle={activeStyle}
      isActive={isActive}
      padding={padding}
      backgroundColor={backgroundColor}
    >
      {children}
    </StyledButton>
  );
}

export { Button };
