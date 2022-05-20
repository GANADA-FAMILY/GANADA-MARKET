import styled, { css } from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  backgroundColor?: string;
  padding?: string;
  isActive?: boolean;
  activeStyle?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  additionalStyles?: string;
}

const applyAdditionalStyles = ({ additionalStyles }: ButtonProps) => {
  if (additionalStyles) {
    return css`
      ${additionalStyles}
    `;
  }
  return '';
};

const applyActiveStyle = ({ isActive, activeStyle }: ButtonProps) => {
  if (isActive) {
    return css`
      ${activeStyle}
      :hover {
        cursor: pointer;
      }
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
  additionalStyles: '',
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 0.5rem;
  background-color: ${(p) => p.backgroundColor};
  padding: ${(p) => p.padding};
  ${applyAdditionalStyles}
  ${applyActiveStyle}
`;

function Button({
  activeStyle,
  isActive,
  children,
  backgroundColor,
  padding,
  onClick,
  additionalStyles,
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      activeStyle={activeStyle}
      isActive={isActive}
      padding={padding}
      backgroundColor={backgroundColor}
      additionalStyles={additionalStyles}
    >
      {children}
    </StyledButton>
  );
}

export { Button };
