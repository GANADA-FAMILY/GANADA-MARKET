import React, { useEffect, useRef, useState } from 'react';
import Router from '../hooks/Router';
import Nav from '../components/organisms/Shop/Nav';
import ProductData from '../components/organisms/Shop/ProductData';
import ResultList from '../components/organisms/Shop/ResultList';

interface ShopProps {
  kind: string;
}

function Shop({ kind }: ShopProps) {
  const [state, setState] = useState({
    product: kind,
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
    <>
      <Nav initialData={product} count={resultList.length} setState={setType} />

      <ProductData initialData={filterList} />
      {/* <ResultList initialData={resultList} /> */}
    </>
  );
}

export default Shop;
