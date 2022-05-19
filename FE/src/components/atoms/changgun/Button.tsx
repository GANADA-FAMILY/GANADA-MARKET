import styled, { css } from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  backgroundColor?: string;
  padding?: string;
  isActive?: boolean;
  activeStyle?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  styles?: string;
}

const additionalStyles = ({ styles }: ButtonProps) => {
  if (styles) {
    return css`
      ${styles}
    `;
  }
  return '';
};

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
  styles: '',
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 0.5rem;
  background-color: ${(p) => p.backgroundColor};
  padding: ${(p) => p.padding};
  ${additionalStyles}
  ${applyActiveStyle}
`;

function Button({
  activeStyle,
  isActive,
  children,
  backgroundColor,
  padding,
  onClick,
  styles,
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      activeStyle={activeStyle}
      isActive={isActive}
      padding={padding}
      backgroundColor={backgroundColor}
      styles={styles}
    >
      {children}
    </StyledButton>
  );
}

export { Button };
