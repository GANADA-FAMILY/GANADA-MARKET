import styled from 'styled-components';
import { LoginForm } from 'components/organisms/changgun';

const Wrapper = styled.div`
  padding-top: 10rem;
  display: flex;
  justify-content: center;
`;

function LoginTemplate() {
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
}

export { LoginTemplate };
