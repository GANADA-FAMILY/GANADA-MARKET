import { useRootDispatch } from 'state/Hooks';
import { closeModal } from 'state/reducers/ModalOpenSlice';
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
  const dispatch = useRootDispatch();

  return (
    <Wrapper>
      <SearchInput />
      <Text
        onClick={() => {
          dispatch(closeModal());
        }}
        pointer
      >
        취소
      </Text>
    </Wrapper>
  );
}

export { SearchBar };
