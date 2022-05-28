import React, { MouseEventHandler } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  visible?: boolean;
}
function Button({ children, onClick, ...rest }: ButtonProps) {
  return (
    <Atom onClick={onClick} {...rest}>
      {children}
    </Atom>
  );
}

export default Button;

Button.defaultProps = {
  visible: true,
};

const Atom = styled.button<ButtonProps>`
  border: 1px solid #ebebeb;
  border-radius: 1rem;
  width: 10rem;
  height: 4rem;
  background-color: #fff;
  display: ${(props) => (props.visible ? 'inline' : 'none')};
  cursor: pointer;
`;
