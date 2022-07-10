import styled from 'styled-components';
import { CategoryItem } from '../../atoms/changgun';
import {
  SearchBar,
  CategoryList,
  RecentSearchList,
} from '../../molecules/changgun';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 768px;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

function Search() {
  return (
    <Wrapper>
      <SearchBar />
      <RecentSearchList />
      <CategoryList>
        <CategoryItem name="맥북" imgSrc="/images/macbook.jpg" />
        <CategoryItem name="에어팟" imgSrc="/images/airpod.jpg" />
        <CategoryItem name="버즈" imgSrc="/images/galaxybuds.jpg" />
      </CategoryList>
    </Wrapper>
  );
}

export { Search };
