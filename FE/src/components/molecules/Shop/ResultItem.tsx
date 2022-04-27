import React from 'react';
import { DataType } from '../../organisms/Shop/ResultList';
import ImageTag from '../../atoms/Shop/ImageTag';
import TextTag from '../../atoms/Shop/TextTag';
import FlexContainer from '../../layouts/Shop/FlexContainer';
import ImageData from '../../atoms/Shop/ImageData';

interface PropType {
  data: DataType;
}

function ResultItem({ data }: PropType) {
  const { url, brand, date, model, price } = data;
  return (
    <FlexContainer {...style}>
      <ImageTag url={url} />
      <ImageData brand={brand} date={date} model={model} price={price} />
    </FlexContainer>
  );
}

const style = {
  flexDirection: 'column',
  position: 'relative',
  height: '662.094px',
};

export default ResultItem;
