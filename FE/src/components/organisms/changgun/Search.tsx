import styled from 'styled-components';
import { CategoryItem } from '../../atoms/changgun';
import {
  SearchBar,
  CategoryList,
  RecentSearchList,
} from '../../molecules/changgun';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const Inner = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 2rem;
`;

function Search() {
  return (
    <Wrapper>
      <Inner>
        <SearchBar />
        <RecentSearchList />
        <CategoryList>
          <CategoryItem name="맥북" imgSrc="/images/macbook.jpg" />
          <CategoryItem name="에어팟" imgSrc="/images/airpod.jpg" />
          <CategoryItem name="버즈" imgSrc="/images/galaxybuds.jpg" />
        </CategoryList>
      </Inner>
    </Wrapper>
  );
}

export { Search };
