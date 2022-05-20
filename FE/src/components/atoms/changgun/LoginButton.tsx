import styled, { css } from 'styled-components';

interface LoginButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

LoginButton.defaultProps = {
  isActive: false,
  onClick: () => null,
};

const StyledButton = styled.button<LoginButtonProps>`
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  background-color: ${(p) => (p.isActive ? 'black' : '#efefef')};
  padding: 1rem;
`;

function LoginButton({ isActive, children, onClick }: LoginButtonProps) {
  return (
    <StyledButton
      type="submit"
      disabled={!isActive}
      onClick={onClick}
      isActive={isActive}
    >
      {children}
    </StyledButton>
  );
}

export { LoginButton };
