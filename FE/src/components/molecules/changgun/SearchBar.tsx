import styled from 'styled-components';
import { SearchInput, TextButton } from '../../atoms/changgun';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
`;

function SearchBar() {
  return (
    <Wrapper>
      <SearchInput />
      <TextButton>취소</TextButton>
    </Wrapper>
  );
}

export { SearchBar };
