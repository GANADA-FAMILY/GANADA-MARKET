import styled from 'styled-components';
import { Text } from '../../atoms/changgun';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  column-gap: 1rem;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
`;

const CancelButton = styled.button`
  border: none;
  color: #999;
  font-size: 0.8rem;
`;

const Inner = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding-top: 1rem;
  align-items: flex-start;
`;

function RecentSearchList() {
  return (
    <Wrapper>
      <Header>
        <Title>최근 검색어</Title>
        <CancelButton>X</CancelButton>
      </Header>
      <Inner>
        <Text pointer hoverBold size="small">
          아이폰
        </Text>
        <Text pointer hoverBold size="small">
          아이폰
        </Text>
        <Text pointer hoverBold size="small">
          아이폰
        </Text>
      </Inner>
    </Wrapper>
  );
}

export { RecentSearchList };
