import styled from 'styled-components';
import { SearchInput, Text } from '../../atoms/changgun';

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
      <Text>취소</Text>
    </Wrapper>
  );
}

export { SearchBar };
