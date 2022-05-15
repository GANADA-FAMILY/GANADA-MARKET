import React, { useState } from 'react';
import styled from '@emotion/styled';
import Image from '../../atoms/Main/Image';
import Text from '../../atoms/Main/Text';
import FlexBox from '../../layouts/Main/FlexBox';
import Icon from '../../atoms/Main/Icon';
import Svg from './Svg';

interface Props {
  info: {
    id: string;
    name: string;
    brand: string;
    val: number;
    isLike: boolean;
  };
}

function Product({ info }: Props) {
  return (
    <Molecule>
      <SVGWrap>
        <Svg fill={info.isLike ? 'black' : 'none'} />
      </SVGWrap>
      <Image
        src="https://kream-phinf.pstatic.net/MjAyMjA0MjZfMTQ1/MDAxNjUwOTU2MTI0NjIx.sk57ujnGDEJUkSPeA6C9LZhzTPsGroOEzHr8yFt_p44g.b-jtFPBmXvfVDqi3SrdomzDa_sY4HTVw5IJjhwMNddMg.JPEG/a_4eea43a1093a45a8bb684599f7ba5ec5.jpg?type=m_webp"
        alt="조던"
      />
      <FlexBox>
        <Title>{info.id}</Title>
        <Text>{info.val}원</Text>
        <Descript>즉시구매가</Descript>
      </FlexBox>
    </Molecule>
  );
}

export default Product;

const Molecule = styled.article`
  width: 100%;
  padding: 0 1.2rem;
  margin: 2rem 0;
  position: relative;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  margin: 1rem 0;
  text-align: left;
`;

const Descript = styled(Text)`
  font-size: 1.3rem;
  color: grey;
`;

const SVGWrap = styled.div`
  position: absolute;
  top: 1rem;
  right: 2.2rem;
`;
