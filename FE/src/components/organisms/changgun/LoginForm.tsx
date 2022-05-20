import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Logo, InputWithLabel } from 'components/molecules/changgun';
import {
  Button,
  MenuLink,
  Text,
  FlexibleImage,
  LoginButton,
} from 'components/atoms/changgun';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  row-gap: 2rem;
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

const InputAndError = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

function LoginForm() {
  const [emailValidity, setEmailValidity] = useState<boolean>(true);
  const [passwordValidity, setPasswordValidity] = useState<boolean>(true);
  const [formValidity, setFormValidity] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const navigate = useNavigate();

  const fetchToken = async () => {
    await axios
      .post('/auth/login', {
        userEmail: emailValue,
        userPw: passwordValue,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
      });
    navigate('/');
  };

  const loginHandler = (e: any) => {
    e.preventDefault();

    fetchToken();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmailValidity(
        emailValue.trim().includes('@') || emailValue.trim().length === 0,
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [emailValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPasswordValidity(
        passwordValue.trim().length === 0 || passwordValue.trim().length > 7,
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [passwordValue]);

  useEffect(() => {
    setFormValidity(
      passwordValidity &&
        emailValidity &&
        emailValue.trim().includes('@') &&
        passwordValue.trim().length > 7,
    );
  }, [passwordValue, emailValue]);

  const emailChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmailValue(e.currentTarget.value);
  };

  const passwordChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPasswordValue(e.currentTarget.value);
  };

  return (
    <Wrapper>
      <Header>
        <Logo width="15rem" height="auto" />
      </Header>
      <FormGroup onSubmit={loginHandler}>
        <InputAndError>
          <InputWithLabel
            onChange={emailChangeHandler}
            labelName="이메일 주소"
            placeholder="예) gildong@ganada.co.kr"
            value={emailValue}
          />
          <Text
            size="xsmall"
            styles={emailValidity ? 'color: #fff' : 'color :red'}
          >
            이메일을 입력하세요
          </Text>
        </InputAndError>
        <InputAndError>
          <InputWithLabel
            type="password"
            onChange={passwordChangeHandler}
            labelName="패스워드"
            value={passwordValue}
          />
          <Text
            size="xsmall"
            styles={passwordValidity ? 'color: #fff' : 'color :red'}
          >
            패스워드를 입력하세요
          </Text>
        </InputAndError>
        <LoginButton isActive={formValidity}>로그인</LoginButton>
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
