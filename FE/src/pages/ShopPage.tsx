import React, { useEffect, useRef, useState } from 'react';
import Nav from '../components/organisms/Shop/Nav';
import ProductData from '../components/organisms/Shop/ProductData';
import ResultList from '../components/organisms/Shop/ResultList';
import FlexContainer from '../components/layouts/FlexContainer';

interface ShopProps {
  kind: string;
}

function Shop() {
  const [state, setState] = useState({
    product: 'cellphone',
    resultList: [],
  });
  const [type, setType] = useState('time');
  const [filterList, setFilterList] = useState([]);
  const { product, resultList } = state;
  useEffect(() => {
    // phone 추천순으로 받아와야함  kind + recommend 기준
  }, []);

  useEffect(() => {
    // filterList 갱신
  }, [state.product]);

  useEffect(() => {
    // resultList 갱신 api state.product + type + filterList 기준
  }, [type, filterList]);

  return (
    <FlexContainer {...style}>
      <Nav initialData={product} count={resultList.length} setState={setType} />

      <ProductData />
      <ResultList />
    </FlexContainer>
  );
}

const style = {
  flexDirection: 'column',
  maxWidth: '1280px',
  padding: '0 3rem',
  position: 'relative',
  margin: 'auto',
};

export default Shop;
