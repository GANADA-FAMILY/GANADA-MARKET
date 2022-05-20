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

interface parseType {
  brand: string[];
  model: string[];
  save: string[];
}

function ShopPage() {
  const [rstList, setList] = useState<Auction[]>([]);
  const [listLen, setListLen] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const params = useParams();
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const selectNav = useRootSelector((state) => state.ShopNavFilter);
  const selectData = useRootSelector((state) => state.ShopDataFilter);
  const dispatch = useDispatch();
  const route = Router();
  const production = useRef<string[]>([]);
  const unmountRef = useRef(false);
  production.current = ['phone', 'earPhone'];
  // 초기 렌더링
  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
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
    }
    return () => {
      unmounted = true;
      unmountRef.current = true;
    };
  }, []);
  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      // 404 연결
      link404();
      // 필터링 바뀔 때마다 데이터 query 변경
      const data = changeData(selectData.filterArray.filterArray);
      if (params.product === 'phone') {
        navigate({
          pathname: `/shop/${params.product}`,
          search: createSearchParams({
            page: '0',
            size: '12',
            sort: `${selectNav.filter.name}`,
            brand: data[0]?.split('=')[1] ?? 'ALL',
            model: data[1]?.split('=')[1] ?? 'ALL',
            save: data[2]?.split('=')[1] ?? 'ALL',
          }).toString(),
        });
      } else if (params.product === 'earphone') {
        navigate({
          pathname: `/shop/${params.product}`,
          search: createSearchParams({
            page: '0',
            size: '12',
            sort: `${selectNav.filter.name}`,
            brand: data[0]?.split('=')[1] ?? 'ALL',
            model: data[1]?.split('=')[1] ?? 'ALL',
          }).toString(),
        });
      }
    }
    return () => {
      unmounted = true;
    };
  }, [selectData, selectNav]);

  // 필터 셀렉했을때
  useEffect(() => {
    let unmounted = false;

    if (!isQueryEmpty() && params.product && !unmounted) {
      (async () => {
        setIsLoaded(true);
        const res = await getList(params.product, query);
        setList(res.data.auctionList);
        setListLen(res.data.auctionCnt);
        if (!unmountRef.current) {
          setIsLoaded(false);
        }
      })();
    }
    return () => {
      unmounted = true;
    };
  }, [query]);

  function isQueryEmpty() {
    const obj = Object.fromEntries(query);
    return Object.keys(obj).length === 0;
  }

  const link404 = () => {
    if (production.current.indexOf(String(params.product)) < 0) {
      route.push('/404');
    }
  };

  // 데이터 정제 메소드
  const changeData = (array: string[]) => {
    const obj: parseType = {
      brand: [],
      model: [],
      save: [],
    };
    array.forEach((item) => {
      if (item === 'Apple') {
        obj.brand.push('apple');
      } else if (item === '삼성') {
        obj.brand.push('SAMSUNG');
      } else if (Number(item[0])) {
        obj.save.push(item);
      } else {
        obj.model.push(item);
      }
    });
    return Object.entries(obj).map((el) => {
      // eslint-disable-next-line prefer-const
      let tmp = '';
      if (el[1].length !== 0) {
        return tmp.concat(el[0]).concat('=').concat(el[1]);
      }
      return null;
    });
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
        <ProductData product={String(params.product)} />
      </FlexContainer>
      <BlockContainer {...blockStyle}>
        {isLoaded ? (
          <Loading />
        ) : (
          <ResultList onLike={onLike} initialData={rstList} query={query} />
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
