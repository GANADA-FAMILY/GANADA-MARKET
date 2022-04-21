import styled from '@emotion/styled';
import MyPageTemplate from '../components/templates/MyPageTemplate';

const MyPage = () => {
  return (
      <MainContainer>
        <MyPageTemplate/>
      </MainContainer>
  );
};

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;



export default MyPage;
