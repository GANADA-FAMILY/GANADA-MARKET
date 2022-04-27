import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Nav from '../components/organisms/Shop/Nav';
import ProductData from '../components/organisms/Shop/ProductData';
import ResultList from '../components/organisms/Shop/ResultList';
import FlexContainer from '../components/layouts/Shop/FlexContainer';

interface ShopProps {
  kind: string;
}

function ShopPage() {
  const [state, setState] = useState({
    resultList: [],
  });
  const [searchParams] = useSearchParams();
  const { product } = useParams();
  const [type, setType] = useState('time');
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    // 쿼리 바뀔 때마다 데이터 들고옴
    const currentParams = Object.fromEntries(searchParams);
    console.log(currentParams);
  }, [searchParams]);

  useEffect(() => {
    // filterList 갱신
  }, [product]);

  useEffect(() => {
    // resultList 갱신 api state.product + type + filterList 기준
  }, [type, filterList]);

  return (
    <FlexContainer {...style}>
      <Nav initialData={String(product)} count={2} setState={setType} />

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

export default ShopPage;
