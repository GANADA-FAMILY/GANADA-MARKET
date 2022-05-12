import React from 'react';
import { DataType } from '../../organisms/Shop/ResultList';
import ImageTag from '../../atoms/Shop/ImageTag';
import FlexContainer from '../../layouts/Shop/FlexContainer';
import ImageData from '../../atoms/Shop/ImageData';

interface PropType {
  data: DataType;
  idx: number;
}

function ResultItem({ data, idx }: PropType) {
  const { url, brand, date, model, price, product } = data;

  const style = {
    flexDirection: 'column',
    height: '574.094px',
    width: '333px',
    marginBottom: '3.2rem',
    // eslint-disable-next-line no-nested-ternary
    justifySelf: `${idx % 3 === 1 ? 'start' : idx % 3 === 0 ? 'end' : ''}`,
  };
  return (
    <FlexContainer {...style}>
      <ImageTag url={url} />
      <ImageData
        product={product}
        brand={brand}
        date={date}
        model={model}
        price={price}
      />
    </FlexContainer>
  );
}

export default ResultItem;
