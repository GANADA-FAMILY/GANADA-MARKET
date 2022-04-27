import React, { useState } from 'react';
import ResultItem from '../../molecules/Shop/ResultItem';
import GridContainer from '../../layouts/Shop/GridContainer';

export interface DataType {
  url: string;
  id: number;
  brand: string;
  product: string;
  model: string;
  price: number;
  date: string;
}

function ResultList() {
  const [state, setState] = useState<DataType[]>([
    {
      id: 1,
      url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
      brand: 'Apple',
      product: 'iPhone 13 Pro 자급제',
      model: 'MNE23KH/A',
      price: 780000,
      date: '07:33:03',
    },
    {
      id: 2,
      url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
      brand: 'Apple',
      product: 'iPhone 13 Pro 자급제',
      model: 'MNE23KH/A',
      price: 780000,
      date: '07:33:03',
    },
    {
      id: 3,
      url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
      brand: 'Apple',
      product: 'iPhone 13 Pro 자급제',
      model: 'MNE23KH/A',
      price: 780000,
      date: '07:33:03',
    },
    {
      id: 4,
      url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
      brand: 'Apple',
      product: 'iPhone 13 Pro 자급제',
      model: 'MNE23KH/A',
      price: 780000,
      date: '07:33:03',
    },
  ]);

  return (
    <GridContainer {...ResultContainer}>
      {state.map((item) => (
        <ResultItem key={item.id} data={item} />
      ))}
    </GridContainer>
  );
}

const ResultContainer = {
  height: '100%',
};

export default ResultList;
