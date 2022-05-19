import styled from 'styled-components';
import { Logo, InputWithLabel } from 'components/molecules/changgun';
import { Button, MenuLink, Text } from 'components/atoms/changgun';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  row-gap: 4rem;
`;

const Header = styled.header`
  align-self: center;
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
`;

const HelperMenu = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function LoginForm() {
  return (
    <Wrapper>
      <Header>
        <Logo width="15rem" height="auto" />
      </Header>
      <FormGroup>
        <InputWithLabel
          labelName="이메일 주소"
          placeholder="예) gildong@ganada.co.kr"
        />
        <InputWithLabel labelName="비밀번호" />
        <Button
          padding="1.2rem"
          isActive={false}
          styles="color: #fff; font-size: 1.6rem; font-weight: 600"
          activeStyle="color: #fff; background-color: black"
        >
          로그인
        </Button>
      </FormGroup>
      <HelperMenu>
        <MenuLink to="/findid">아이디 찾기</MenuLink>
        <Text size="xsmall"> | </Text>
        <MenuLink to="/findpw">비밀번호 찾기</MenuLink>
        <Text size="xsmall"> | </Text>
        <MenuLink to="/signup">회원가입</MenuLink>
      </HelperMenu>
    </Wrapper>
  );
}

export { LoginForm };
