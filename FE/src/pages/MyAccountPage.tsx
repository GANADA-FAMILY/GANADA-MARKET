import styled from '@emotion/styled';
import MyAccount from 'components/organisms/My/MyAccount/MyAccount';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

const bank = {
  bank: '신한',
  bankNum: '110333444444',
  bankHolder: '홍길동',
};

function MyAccountPage() {
  return (
    <MainContainer>
      <MyPageTemplate element={<MyAccount bank={bank} />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyAccountPage;
