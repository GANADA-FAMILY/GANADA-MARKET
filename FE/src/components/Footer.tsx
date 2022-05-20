import React from 'react';
import styled from '@emotion/styled';
import FlexBox from './layouts/Main/FlexBox';
import GridBox from './layouts/Main/GridBox';
import Text from './atoms/Main/Text';
import LinkTo from './atoms/Main/LinkTo';

function Footer() {
  return (
    <Container>
      <GridBox columns="1fr 1fr 2fr">
        <FlexBox>
          <Text fontSize="3rem" fontWeight="bold">
            @Copyright
          </Text>
          <Wrap>
            {FooterData.copyright.map((item) => {
              return (
                <StyledLi key={item}>
                  <Text>{item}</Text>
                </StyledLi>
              );
            })}
          </Wrap>
        </FlexBox>
        <FlexBox>
          <Text fontSize="3rem" fontWeight="bold">
            @DevTeam
          </Text>
          <Wrap>
            <StyledLi key={FooterData.devteam.Git}>
              <Text>{FooterData.devteam.Git}</Text>
            </StyledLi>
            <StyledLi key={FooterData.devteam.Notion}>
              <Text>{FooterData.devteam.Notion}</Text>
            </StyledLi>
          </Wrap>
        </FlexBox>
        <FlexBox>
          <LinkBox>
            {FooterData.link.map((item) => {
              return (
                <LinkTo to="#" key={item}>
                  {item}
                </LinkTo>
              );
            })}
          </LinkBox>
          {FooterData.info.map((item) => {
            return (
              <Text key={item} color="rgba(34, 34, 34, .5)">
                {item}
              </Text>
            );
          })}
        </FlexBox>
      </GridBox>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 20rem;
  border-top: 1px solid #ebebeb;
  padding: 4rem 3rem;
  margin-top: 50px;
  line-height: 2rem;
`;

const StyledLi = styled.li`
  list-style: none;
  margin: 12px 0 0 10px;
`;

const LinkBox = styled.ul`
  display: flex;
  font-size: 1.4rem;
  white-space: nowrap;
  * {
    margin: 0 1.5rem 1rem 0;
  }
`;
const Wrap = styled.div`
  margin-top: 3rem;
`;
const FooterData = {
  copyright: ['SSAFY-6TH-GUMI', '가족같은팀'],
  devteam: {
    Notion: '노션',
    Git: '깃허브',
  },
  link: ['회사소개', '인재채용', '제휴제안', '이용약관'],
  info: [
    '개인정보처리방침',
    '가족같은팀은 통신판매 중개자로서 통신판매의 당사자가 아니므로 개별 판매자가 등록한 상품정보에 대해서 책임을 지지 않습니다.',
  ],
};
