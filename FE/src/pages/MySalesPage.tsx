import styled from '@emotion/styled';
import { MySales } from 'components/organisms/My';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

function MySalesPage() {
  return (
    <MainContainer>
      <MyPageTemplate element={<MySales />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MySalesPage;
