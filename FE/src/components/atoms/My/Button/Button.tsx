import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import theme from 'styles/theme';
import classnames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick: MouseEventHandler;
  disabled?: boolean;
}
function Button({
  children,
  type = 'button',
  size = 'medium',
  disabled = false,
  className = '',
  onClick = () => null,
}: ButtonProps) {
  return (
    <Atom
      type={type}
      disabled={disabled}
      className={classnames(['Button', size, className])}
      onClick={onClick}
    >
      {children}
    </Atom>
  );
}

const Atom = styled.button<ButtonProps>`
  border-radius: 10px;
  border: none;
  align-items: center;
  background-color: ${theme.color.black2};
  font-weight: ${theme.fontWeight.solid};
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
  text-align: center;
  color: ${theme.color.white};
  &.small {
    line-height: 3.8rem;
    font-size: 1.2rem;
    letter-spacing: -0.014rem;
    padding: 0 1.6rem;
    height: 4rem;
  }
  &.medium {
    font-size: 1.4rem;
    line-height: 4rem;
    letter-spacing: -0.014rem;
    padding: 0 1.8rem;
    height: 4.2rem;
  }
  &.large {
    font-size: 1.6rem;
    line-height: 4rem;
    letter-spacing: -0.015rem;
    padding: 0 2rem;
    height: 4.4rem;
  }
  &:disabled {
    background-color: ${theme.color.white2};
  }
  &:active {
    background-color: darken(${theme.color.black2}, 20%);
  }
`;

export default Button;
