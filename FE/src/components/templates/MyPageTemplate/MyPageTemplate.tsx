import styled from '@emotion/styled';
import { SideNavBar } from 'components/organisms/My';

interface MyPageTemplateProps {
  element: React.ReactNode;
}

function MyPageTemplate({ element }: MyPageTemplateProps) {
  return (
    <Template>
      <SideNavBar />
      <ContentContainer>{element}</ContentContainer>
    </Template>
  );
}
const Template = styled.div``;
const ContentContainer = styled.div`
  overflow: hidden;
  min-height: 380px;
`;

export default MyPageTemplate;
