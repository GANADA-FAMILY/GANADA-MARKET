import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../atoms/my/Avatar';
import ImageInput from '../../atoms/my/ImageInput';
import InfoGroupItem from '../../molecules/my/InfoItem';
import LinkButton from '../../atoms/my/LinkButton';
import Title from '../../atoms/my/Title';
import InfoGroup from '../../molecules/my/InfoGroup';
import TitleBar from '../../molecules/my/TitleBar';
import InputBox from '../../atoms/my/InputBox';

const user = {
  name: '홍길동',
  email: 'zxc123@naver.com',
  grade: '일반 회원',
  password: '123123',
  phone: '010-3333-3333',
  nickname: 'zxczxc',
  src: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
};

function MyProfileContainer() {
  const [newImage, setNewImage] = useState('');
  const [imageUrl, setImageUrl] = useState(user.src);
  const imageRef = useRef<HTMLInputElement>(null);
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImage(e.target.value);
    // 이미지 전송부분
    // const formData = new FormData();
    // formData.append('image', e.target.files[0]);
    // await uploadImage(formData,(res)=>{
    //   console.log(123123123);
    //   changeUserInfo(res.data.imageUrl);
    // })
  };
  const onClickImageHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    imageRef.current?.click();
  };
  const submitUserInfo = () => {
    console.log(123);
  };
  return (
    <Container>
      <MainTitleBar title="프로필 정보" size={24} bordered />
      <UserProfile>
        <ProfileAvatar src={imageUrl} />
        <ProfileDetail>
          <Title size={24}>{user.name}</Title>
          <ProfileButtonBox>
            <LinkButton onClick={onClickImageHandler} href="/">
              이미지 변경
            </LinkButton>
            <LinkButton href="/">삭제</LinkButton>
          </ProfileButtonBox>
        </ProfileDetail>
        <ImageInput
          onChange={onChangeImage}
          value={newImage}
          forwardedRef={imageRef}
        />
      </UserProfile>
      <ProfileInfo>
        <InfoGroup title="로그인 정보">
          <InfoGroupItem
            title="이메일 주소"
            type="email"
            submit={submitUserInfo}
            value={user.email}
          />
          <InfoGroupItem
            title="비밀번호"
            type="password"
            submit={submitUserInfo}
            value={'●'.repeat(user.password.length)}
          >
            <h5 className="title">비밀번호 변경</h5>
            <InputBox
              title="이전 비밀번호"
              type="password"
              placeholder="영문,숫자,특수문자 조합 8-16자"
            />
            <InputBox
              title="새 비밀번호"
              type="password"
              placeholder="영문,숫자,특수문자 조합 8-16자"
            />
          </InfoGroupItem>
        </InfoGroup>
        <InfoGroup title="개인 정보">
          <InfoGroupItem
            title="닉네임"
            type="text"
            submit={submitUserInfo}
            value={user.nickname}
          >
            <h5 className="title">닉네임</h5>
            <InputBox
              title="새로운 닉네임"
              type="text"
              placeholder="고객님의 새로운 닉네임"
            />
          </InfoGroupItem>
          <InfoGroupItem
            title="휴대폰 번호"
            type="phone"
            submit={submitUserInfo}
            value={user.phone}
            modify={() => console.log('본인인증!')}
          />
        </InfoGroup>
        <WithdrawalLink to="/">회원 탈퇴</WithdrawalLink>
      </ProfileInfo>
    </Container>
  );
}
const Container = styled.section``;
const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 50px 0 38px;
  border-bottom: 1px solid #ebebeb;
  background-color: #fff;
`;
const ProfileAvatar = styled(Avatar)`
  margin-right: 18px;
  flex: none;
  overflow: hidden;
`;
const ProfileDetail = styled.div`
  strong {
    line-height: 32px;
    letter-spacing: -0.12px;
  }
`;
const ProfileButtonBox = styled.div`
  margin-top: 8px;
  font-size: 0;
  a {
    margin-top: 8px;
  }
  a + a {
    margin-left: 8px;
  }
`;
const ProfileInfo = styled.div`
  padding-top: 38px;
  max-width: 480px;
  > div ~ div {
    padding-top: 58px;
  }
`;
const WithdrawalLink = styled(Link)`
  margin-top: 55px;
  padding: 5px 0;
  display: inline-block;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
  text-decoration: underline;
`;

export default MyProfileContainer;
