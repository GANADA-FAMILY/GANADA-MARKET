import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import TitleBar from 'components/molecules/My/TitleBar';
import { User } from 'types/Entity/UserAPI';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';

const user: User = {
  userEmail: 'zxc123@naver.com',
  userNickname: 'zxc123',
  userPhone: '010-3333-4444',
  profileImageUrl: 'https://kream.co.kr/_nuxt/img/blank_profile.4347742.png',
  grade: '일반 회원',
};
interface MyProfileProps {
  item: User;
}
function MyProfile({ item }: MyProfileProps) {
  const [newImage, setNewImage] = useState('');
  const [imageUrl, setImageUrl] = useState(user.profileImageUrl);
  const imageRef = useRef<HTMLInputElement>(null);
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <ProfileHeader
        user={item}
        newImage={newImage}
        forwardedRef={imageRef}
        onChangeImage={onChangeImageHandler}
        onClickImage={onClickImageHandler}
      />
      <ProfileContent user={item} />
    </Container>
  );
}

const Container = styled.section``;

const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;

export default MyProfile;
