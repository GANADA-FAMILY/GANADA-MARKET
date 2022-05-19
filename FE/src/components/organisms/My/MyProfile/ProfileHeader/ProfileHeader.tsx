import styled from '@emotion/styled';
import Avatar from 'components/atoms/My/Avartar/Avatar';
import ImageInput from 'components/atoms/My/ImageInput';
import LinkButton from 'components/atoms/My/LinkButton';
import Text from 'components/atoms/My/Text';
import { useAuth } from 'hooks';
import { useRef } from 'react';
import { updateProfileImage } from 'state/reducers/UserSlice';

function ProfileHeader() {
  const { user, loading, dispatch } = useAuth();
  const imageRef = useRef<HTMLInputElement>(null);
  const onChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement> | any,
  ) => {
    const formData = new FormData();
    formData.append('profileImage', e.target.files[0]);
    await dispatch(updateProfileImage(formData));
  };
  const onClickImage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    imageRef.current?.click();
  };
  return (
    <StyledBox>
      {!loading && <ProfileAvatar src={user.profileImageUrl} />}
      <ProfileDetail>
        <Text size={24} strong>
          {user.userNickname}
        </Text>
        <ProfileButtonBox>
          <LinkButton onClick={onClickImage} href="/">
            이미지 변경
          </LinkButton>
          <LinkButton href="/">삭제</LinkButton>
        </ProfileButtonBox>
        <ImageInput onChange={onChangeImage} forwardedRef={imageRef} />
      </ProfileDetail>
    </StyledBox>
  );
}

const StyledBox = styled.div`
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

const ProfileDetail = styled.div``;
export default ProfileHeader;
