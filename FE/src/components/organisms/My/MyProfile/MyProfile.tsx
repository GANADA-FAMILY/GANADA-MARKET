import styled from '@emotion/styled';
import TitleBar from 'components/molecules/My/TitleBar';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';

function MyProfile() {
  return (
    <Container>
      <MainTitleBar title="프로필 정보" size={24} bordered />
      <ProfileHeader />
      <ProfileContent />
    </Container>
  );
}

const Container = styled.section``;

const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;

export default MyProfile;
