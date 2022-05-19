import React, { useEffect, useRef, useState } from 'react';
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { disLikeAPI, getList, likeAPI } from 'api/shopAPI';
import Auction from 'types/Entity/ShopAPI/Auction';
import Loading from 'components/Loading';
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
  const [rstList, setList] = useState<Auction[]>([]);
  const [listLen, setListLen] = useState(0);
  const [filterList, setFilterList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const params = useParams();
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const selectNav = useRootSelector((state) => state.ShopNavFilter);
  const selectData = useRootSelector((state) => state.ShopDataFilter);
  const dispatch = useDispatch();
  const route = Router();
  const production = useRef<string[]>([]);
  production.current = ['phone', 'earPhone'];
  // 초기 렌더링
  useEffect(() => {
    // 리덕스 초기화
    dispatch(navReset());
    dispatch(dataReset());
    // DB에서 값을 product 목록을 가져와서 ref에 넣는다.
    // 404 연결
    link404();
    navigate({
      pathname: `/shop/${params.product}`,
      search: createSearchParams({
        page: '0',
        size: '12',
        sort: 'endTime,asc',
      }).toString(),
    });
  }, []);

  useEffect(() => {
    let isComponentMounted = true;
    if (!isQueryEmpty() && params.product) {
      (async () => {
        const res = await getList(params.product, query);
        if (isComponentMounted) {
          setList(res.data.auctionList);
          setListLen(res.data.auctionCnt);
          setIsLoaded(false);
        }
      })();
    }
    return () => {
      isComponentMounted = false;
    };
  }, [query]);

  function isQueryEmpty() {
    const obj = Object.fromEntries(query);
    return Object.keys(obj).length === 0;
  }

  // useEffect(() => {

  //   // 404 연결
  //   link404();
  //   // Query에 맞는 데이터를 rstList에 넣는다.
  //   (async () => {
  //     const res = await getList(params.product, query);
  //     setList(res.data);
  //   })();
  // }, [query, params.product]);

  useEffect(() => {
    // 404 연결
    link404();
    // 필터링 바뀔 때마다 데이터 query 변경
    console.log('nav필터', selectNav);
    console.log('data필터', selectData);
  }, [selectData, selectNav]);

  const link404 = () => {
    if (production.current.indexOf(String(params.product)) < 0) {
      route.push('/404');
    }
  };

  const onLike = async (auctionId: number, trigger: boolean) => {
    if (!trigger) {
      await disLikeAPI(auctionId);
    } else {
      await likeAPI(auctionId);
    }
  };

  return (
    <>
      <FlexContainer {...style}>
        <Nav initialData={String(params.product)} count={listLen} />
        <ProductData />
      </FlexContainer>
      <BlockContainer {...blockStyle}>
        {isLoaded ? (
          <Loading />
        ) : (
          <ResultList onLike={onLike} initialData={rstList} />
        )}
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
