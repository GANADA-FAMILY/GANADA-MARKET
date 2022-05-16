import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { priceComma } from 'functions';
import TextTag from './TextTag';
import FlexContainer from '../../layouts/Shop/FlexContainer';
import useSetTime from '../../../hooks/useSetTime';
import LinkTag from './LinkTag';
import Router from '../../../hooks/Router';
import BlockContainer from '../../layouts/Shop/BlockContainer';

interface PropsData {
  brand: string;
  date: string;
  price: number;
  model: string;
  product: string;
}

function ImageData({ product, brand, date, price, model }: PropsData) {
  const router = Router();
  const clickEvent = () => {
    router.push('/');
  };
  const time = useSetTime(100);
  const priceToString = priceComma(price).concat('원');

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
        <TextTag {...basicFontStyle}>{model}</TextTag>
      </BlockContainer>
      <BlockContainer>
        <TextTag {...basicFontStyle}>{priceToString}</TextTag>
      </BlockContainer>
      <BlockContainer {...timeContainStyle}>
        <TextTag>남은 시간 : </TextTag>
        <TextTag {...timeStyle}>{time}</TextTag>
      </BlockContainer>
    </FlexContainer>
  );
}
const containerStyle = {
  padding: '3.2rem 0.8rem',
  flexDirection: 'column',
};

const timeContainStyle = {
  textAlign: 'center',
  fontSize: '2rem',
  marginTop: '2rem',
};

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
};

const brandContainer = {
  marginBottom: '0.4rem',
};

export default ImageData;
