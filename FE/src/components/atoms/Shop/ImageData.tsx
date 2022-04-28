import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TextTag from './TextTag';
import FlexContainer from '../../layouts/Shop/FlexContainer';
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
  const [strPrice, setPrice] = useState('');
  const priceToString = useCallback((num: number) => {
    const str = String(num);
    // eslint-disable-next-line prefer-const
    let newStr = '';
    // eslint-disable-next-line prefer-const
    let tmp = 0;
    for (let i = str.length - 1; i >= 0; i -= 1) {
      if (newStr.length !== 0 && tmp % 3 === 2 && i !== 0) {
        newStr = newStr.concat(str[i]).concat(',');
      } else {
        newStr = newStr.concat(str[i]);
      }
      tmp += 1;
    }
    setPrice(newStr.split('').reverse().join('').concat('원'));
  }, []);
  useEffect(() => {
    priceToString(price);
  }, []);

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
        <TextTag {...basicFontStyle}>{strPrice}</TextTag>
      </BlockContainer>
      <BlockContainer {...timeContainStyle}>
        <TextTag>남은 시간 : </TextTag>
        <TextTag {...timeStyle}>{date}</TextTag>
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
