import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FlexContainer from '../components/layouts/Shop/FlexContainer';
import { useRootSelector } from '../state/Hooks';
import { navReset } from '../state/reducers/ShopNavFilter';
import { dataReset } from '../state/reducers/ShopDataFilter';
import Router from '../hooks/Router';
import BlockContainer from '../components/layouts/Shop/BlockContainer';
import Nav from '../components/organisms/Shop/Nav';
import ProductData from '../components/organisms/Shop/ProductData';
import ResultList from '../components/organisms/Shop/ResultList';

function ShopPage() {
  const [rstList, setList] = useState([]);
  // const [searchParams] = useSearchParams();
  // const currentParams = Object.fromEntries(searchParams);
  const { product } = useParams();
  const [filterList, setFilterList] = useState([]);

  const selectNav = useRootSelector((state) => state.ShopNavFilter);
  const selectData = useRootSelector((state) => state.ShopDataFilter);
  const dispatch = useDispatch();
  const route = Router();
  const production = useRef<string[]>([]);

  useEffect(() => {
    // 리덕스 초기화
    dispatch(navReset());
    dispatch(dataReset());
    // DB에서 값을 product 목록을 가져와서 ref에 넣는다.
    production.current = ['cellphone'];
    // 404 연결
    if (production.current.indexOf(String(product)) < 0) {
      route.push('/404');
    }
  }, []);

  useEffect(() => {
    // 필터링 바뀔 때마다 데이터 변경
    console.log('nav필터', selectNav);
    console.log('data필터', selectData);
  }, [selectData, selectNav]);

  return (
    <>
      <FlexContainer {...style}>
        <Nav initialData={String(product)} count={rstList.length} />
        <ProductData />
      </FlexContainer>
      <BlockContainer {...blockStyle}>
        <ResultList />
      </BlockContainer>
    </>
  );
}

const style = {
  flexDirection: 'column',
  maxWidth: '1280px',
  padding: '0 3rem',
  position: 'relative',
  margin: 'auto',
};

const blockStyle = {
  backgroundColor: '#f9f9f9',
  display: 'flex',
  justifyContent: 'center',
};

export default ShopPage;
