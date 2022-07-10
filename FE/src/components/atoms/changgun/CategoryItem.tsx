import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  :hover {
    p {
      font-weight: 500;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 7rem;
  height: 7rem;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CategoryName = styled.p`
  font-size: 1.4rem;
`;

interface CategoryItem {
  name: string;
  imgSrc: string;
}

function CategoryItem({ name, imgSrc }: CategoryItem) {
  return (
    <Wrapper>
      <ImageWrapper>
        <CategoryImage src={imgSrc} />
      </ImageWrapper>
      <CategoryName>{name}</CategoryName>
    </Wrapper>
  );
}

export { CategoryItem };
