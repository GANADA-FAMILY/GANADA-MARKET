import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../../assets/svgs/search.svg';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;

const Input = styled.input`
  background-color: #f4f4f4;
  outline: none;
  border: none;
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  padding: 1.8rem 4rem;
  font-size: 1.4rem;

  &::placeholder {
    color: #999;
    font-size: 1.4rem;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  fill: #999;
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
`;

function SearchInput() {
  return (
    <Wrapper>
      <StyledSearchIcon />
      <Input placeholder="브랜드명, 모델명, 모델번호 등" />
      {/* X 버튼 필요 */}
    </Wrapper>
  );
}

export { SearchInput };
