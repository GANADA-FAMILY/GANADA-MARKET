import React from 'react';
import styled from '@emotion/styled';
import cn from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  flex: string;
  color: string;
  outline: string;
  bgColor: string;
  size: string;
  type: 'submit' | 'reset' | 'button';
  className: string;
}

function Button({
  flex = 'auto',
  children,
  color = 'black',
  outline = 'black',
  bgColor = 'white',
  size = 'normal',
  type = 'button',
  className,
}: ButtonProps) {
  const classCandiate = [size, className];
  const commonProps = {
    flex,
    children,
    color,
    outline,
    bgColor,
    size,
    type,
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton {...commonProps} className={cn(classCandiate)}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  flex: ${(props: ButtonProps) => props.flex};
  border: ${(props: ButtonProps) =>
    props.outline === 'none' ? 'none' : `0.7px solid ${props.outline}`};
  color: ${(props: ButtonProps) => props.color};
  background-color: ${(props: ButtonProps) =>
    props.bgColor === 'transparent' ? 'transparent' : props.bgColor};
  &.small {
    padding: 7px 7px;
    font-size: 1rem;
  }

  &.normal {
    padding: 10px 10px;
    font-size: 1.2rem;
  }
  &.big {
    padding: 14px 14px;
    font-size: 1.4rem;
  }
`;

export default Button;
