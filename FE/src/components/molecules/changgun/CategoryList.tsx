import styled from 'styled-components';

interface CategoryListProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function CategoryList({ children }: CategoryListProps) {
  return <Wrapper>{children}</Wrapper>;
}

export { CategoryList };
