import styled from '@emotion/styled';
import React from 'react';
import SideNavBarContainer from '../organisms/My/SideNavBarContainer';

interface MyPageTemplateProps {
  element: React.ReactNode;
}

function MyPageTemplate({ element }: MyPageTemplateProps) {
  return (
    <Template>
      <SideNavBarContainer />
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
