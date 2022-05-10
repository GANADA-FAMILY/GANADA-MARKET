import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import User from 'type/User';
import Avatar from 'components/atoms/my/Avartar/Avatar';
import ImageInput from 'components/atoms/my/ImageInput';
import LinkButton from 'components/atoms/my/LinkButton';
import Text from 'components/atoms/my/Text';

interface ProfileHeaderProps {
  user: User;
  onClickImage: React.MouseEventHandler<HTMLElement>;
  onChangeImage: React.ChangeEventHandler<HTMLInputElement>;
  newImage: string;
  forwardedRef: React.RefObject<HTMLInputElement>;
}
function ProfileHeader({
  user,
  onClickImage,
  onChangeImage,
  newImage,
  forwardedRef,
}: ProfileHeaderProps) {
  return (
    <StyledBox>
      <ProfileAvatar src={user.profileImageUrl} />
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
        <ImageInput
          onChange={onChangeImage}
          value={newImage}
          forwardedRef={forwardedRef}
        />
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
