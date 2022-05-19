import styled from 'styled-components';
import { Logo, InputWithLabel } from 'components/molecules/changgun';
import {
  Button,
  MenuLink,
  Text,
  FlexibleImage,
} from 'components/atoms/changgun';

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

const SocialButtonGroup = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const SocialButtonInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SocialIconBox = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
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
          isActive={false}
          padding="1.2rem"
          additionalStyles="color: #fff; font-size: 1.6rem; font-weight: 600"
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
      <SocialButtonGroup>
        <Button
          isActive
          additionalStyles="border: 1px solid #efefef; border-radius: 1rem;"
          backgroundColor="#fff"
          padding="1.2rem"
        >
          <SocialButtonInner>
            <SocialIconBox>
              <FlexibleImage src="/images/googleIcon.png" />
            </SocialIconBox>
            <Text bold size="small">
              구글 로그인
            </Text>
          </SocialButtonInner>
        </Button>
        <Button
          isActive
          additionalStyles="border: 1px solid #efefef; border-radius: 1rem;"
          backgroundColor="#fff"
          padding="1.2rem"
        >
          <SocialButtonInner>
            <SocialIconBox>
              <FlexibleImage src="/images/kakaoIcon.png" />
            </SocialIconBox>
            <Text bold size="small">
              카카오 로그인
            </Text>
          </SocialButtonInner>
        </Button>
      </SocialButtonGroup>
    </Wrapper>
  );
}

export { LoginForm };
