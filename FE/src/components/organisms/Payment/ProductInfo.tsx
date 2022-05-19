import React from 'react';
import styled from '@emotion/styled';
import Text from '../../atoms/Main/Text';
import Image from '../../atoms/Main/Image';

interface Props {
  data: {
    productBrand: string;
    productName: string;
    releaseDate: string;
    recentPrice: number;
  };
  imgSrc: string;
}

function ProductInfo({ data, imgSrc }: Props) {
  return (
    <Container>
      <ImageWrapper>
        <Image src={imgSrc} alt={data.productName} height="8rem" />
      </ImageWrapper>
      <Wrap>
        <Text>{data.productBrand}</Text>
        <Text>{data.productName}</Text>
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
