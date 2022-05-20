import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Svg from 'components/molecules/Main/Svg';
import { priceComma } from '../../../functions/priceComma';
import TextTag from './TextTag';
import FlexContainer from '../../layouts/Shop/FlexContainer';
import useSetTime from '../../../hooks/useSetTime';
import LinkTag from './LinkTag';
import Router from '../../../hooks/Router';
import BlockContainer from '../../layouts/Shop/BlockContainer';

interface PropsData {
  brand: string;
  startPrice: number;
  model: string;
  product: string;
  description: string;
  startTime: string;
  cycle: number;
  onLike: (auctionId: number, trigger: boolean) => void;
  isLike?: boolean;
  auctionId?: number;
  title: string;
}

interface svgProps {
  onClick: (e: MouseEvent) => void;
}

function ImageData({
  product,
  brand,
  title,
  cycle,
  startPrice,
  startTime,
  description,
  model,
  isLike,
  onLike,
  auctionId,
}: PropsData) {
  const router = Router();
  const clickEvent = () => {
    router.push(`/auction/${auctionId}`);
  };
  const time = useSetTime(100);
  const [likeState, setLikeState] = useState(isLike);
  const priceToString = priceComma(startPrice).concat('원');

  const setLike = () => {
    if (likeState && auctionId) {
      setLikeState((prev) => !prev);
      onLike(auctionId, false);
    } else if (auctionId) {
      setLikeState((prev) => !prev);
      onLike(auctionId, true);
    }
  };

  const priceToCycle = () => {
    console.log(startPrice, '시작가격');
    console.log(cycle, '싸이클');
    console.log(startTime, '시간');
  };

  return (
    <FlexContainer {...containerStyle}>
      <BlockContainer {...brandContainer}>
        <LinkTag {...brandFontStyle} onClick={clickEvent}>
          {brand}
        </LinkTag>
      </BlockContainer>
      <BlockContainer {...brandContainer}>
        <LinkTag {...modelFontStyle} onClick={clickEvent}>
          {product}
        </LinkTag>
      </BlockContainer>

      <BlockContainer {...modelContainer}>
        <TextTag {...basicFontStyle}>{title}</TextTag>
      </BlockContainer>
      <BlockContainer {...modelContainer}>
        <TextTag {...basicFontStyle}>모델명: {model}</TextTag>
      </BlockContainer>
      <BlockContainer {...descriptionBlock}>
        {description.split(',').map((el) => (
          <TextTag key={el.length} {...descriptionStyle}>
            {el}
          </TextTag>
        ))}
      </BlockContainer>
      <SVGWrap onClick={setLike}>
        <Svg
          fill={likeState ? 'black' : '#ebebeb'}
          width="2rem"
          height="2rem"
        />
      </SVGWrap>
      <BlockContainer {...timeContainStyle}>
        <TextTag {...timeFontStyle}>시작 가 : </TextTag>
        <TextTag {...timeStyle}>{priceToString}</TextTag>
      </BlockContainer>
    </FlexContainer>
  );
}
const timeFontStyle = {
  whiteSpace: 'nowrap',
};

const descriptionBlock = {
  marginTop: '3rem',
};
const descriptionStyle = {
  padding: '4px 8px',
  color: '#787a87',
  fontSize: '1.3rem',
  lineHeight: '1.6rem',
  border: '1px solid black',
  borderRadius: '3px',
  marginBottom: '0.4rem',
  marginLeft: '0.4rem',
};

const containerStyle = {
  padding: '1rem 0.8rem',
  flexDirection: 'column',
};

const timeContainStyle = {
  textAlign: 'center',
  fontSize: '2rem',
  position: 'absolute',
  bottom: '0%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  whiteSpace: 'nowrap',
};
const SVGWrap = styled.div<svgProps>`
  &:hover {
    cursor: pointer;
  }
  position: absolute;
  bottom: 0%;
`;

const timeStyle = {
  color: '#FB2929',
  fontWeight: 'bold',
};

const basicFontStyle = {
  fontSize: '1.6rem',
  color: '#222222',
};

const brandFontStyle = {
  fontSize: '1.6rem',
  fontWeight: 'bold',
  color: '#222222',
};
const modelFontStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#222222',
};

const modelContainer = {
  marginBottom: '1rem',
  marginTop: '1rem',
};

const brandContainer = {
  marginBottom: '0.4rem',
};

export default ImageData;
