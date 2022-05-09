import React from 'react';
import styled from '@emotion/styled';
import Text from '../../atoms/Main/Text';
import Image from '../../atoms/Main/Image';
interface Props {
  data: object;
}

function ProductInfo({ data }: Props) {
  return (
    <Container>
      <ImageWrapper>
        <Image src="./image/abcmart.png" alt="dunk" height="8rem" />
      </ImageWrapper>
      <Wrap>
        <Text>제품명</Text>
        <Text>이름</Text>
        <Text>설명</Text>
      </Wrap>
    </Container>
  );
}

export default ProductInfo;

const Container = styled.main`
  width: 100%;
  padding: 3.2rem;
  display: flex;
  background-color: #fff;
  margin-bottom: 8px;
`;
const ImageWrapper = styled.div`
  width: 8rem;
`;
const Wrap = styled.div`
  padding-left: 1.6rem;
`;
