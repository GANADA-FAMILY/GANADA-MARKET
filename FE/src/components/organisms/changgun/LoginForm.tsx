import styled from 'styled-components';
import { Logo, InputWithLabel } from 'components/molecules/changgun';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const Header = styled.div`
  align-self: center;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
`;

function LoginForm() {
  return (
    <Wrapper>
      <Header>
        <Logo width="20rem" height="10rem" />
      </Header>
      <InputGroup>
        <InputWithLabel
          labelName="이메일 주소"
          placeholder="예) gildong@ganada.co.kr"
        />
        <InputWithLabel labelName="비밀번호" />
      </InputGroup>
    </Wrapper>
  );
}

export { LoginForm };
