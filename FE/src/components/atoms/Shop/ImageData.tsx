import React from 'react';
import styled from '@emotion/styled';
import TextTag from './TextTag';
import FlexContainer from '../../layouts/GridContainer';

interface PropsData {
  brand: string;
  date: string;
  price: number;
  model: string;
}

function ImageData({ brand, date, price, model }: PropsData) {
  const style = {
    display: 'flex',
    padding: '3.2rem 0.8rem',
    flexDirection: 'column',
  };

  return (
    <FlexContainer {...style}>
      <TextTag>{brand}</TextTag>
      <TextTag>{model}</TextTag>
      <TextTag>{price}</TextTag>
      <TextTag>{date}</TextTag>
    </FlexContainer>
  );
}

export default ImageData;
