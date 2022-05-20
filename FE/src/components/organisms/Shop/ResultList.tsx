import React, { useEffect, useState, useRef } from 'react';
import Auction from 'types/Entity/ShopAPI/Auction';
import { getPageList } from 'api/shopAPI';
import { useParams } from 'react-router-dom';
import ResultItem from '../../molecules/Shop/ResultItem';
import GridContainer from '../../layouts/Shop/GridContainer';
import Loading from '../../Loading';
import BlockContainer from '../../layouts/Shop/BlockContainer';

interface propsType {
  initialData: Auction[];
  onLike: (auctionId: number, trigger: boolean) => void;
  query: URLSearchParams;
}

function ResultList({ initialData, query, onLike }: propsType) {
  const [state, setState] = useState<Auction[]>([]);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const isLast = useRef(0);
  const params = useParams();
  const addItem = useRef<Auction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [stateLast, setStateLast] = useState(false);

  useEffect(() => {
    let umounted = false;
    if (!umounted) {
      setState(initialData);
      (async () => {
        const res = await getPageList(
          {
            ...Object.fromEntries(query),
            page: '1',
            size: '12',
          },
          params.product,
        );
        if (res.data.auctionList.length === 0) {
          setStateLast(true);
        }
      })();
    }
    return () => {
      umounted = true;
    };
  }, []);

  const getMoreItem = async () => {
    setIsLoaded(true);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (isLast.current === 1) {
      isLast.current = 2;
    } else {
      setPageNum((prev: number) => prev + 1);
    }

    setState((prev) => prev.concat(addItem.current));
    setIsLoaded(false);
  };
  // 페이지 이동했을때
  useEffect(() => {
    let unmounted = false;
    if (!unmounted && isLast.current < 1) {
      (async () => {
        const res = await getPageList(
          {
            ...Object.fromEntries(query),
            page: `${pageNum + 1}`,
            size: '12',
          },
          params.product,
        );
        if (res.data.auctionList.length !== 0) {
          addItem.current = res.data.auctionList;
        }

        if (res.data.last) {
          isLast.current = 1;
        }
      })();
    }

    return () => {
      unmounted = true;
    };
  }, [pageNum]);

  const onIntersect = async (
    [entry]: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    if (entry.isIntersecting && !isLoaded && isLast.current < 2) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target && isLast.current < 2) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <GridContainer {...ResultContainer}>
      {state.length === 0 ? (
        <div
          style={{
            gridColumnStart: '2',
            fontSize: '10rem',
            whiteSpace: 'nowrap',
          }}
          className="noData"
        >
          경매 정보가 없습니다.
        </div>
      ) : (
        state.map((item, idx) => {
          const newLocal = idx + 1;
          return (
            <ResultItem
              onLike={onLike}
              key={newLocal}
              data={item}
              idx={idx + 1}
            />
          );
        })
      )}

      <div
        style={!stateLast ? { gridColumnStart: '2' } : { display: 'none' }}
        ref={setTarget}
        className="Target-Element"
      >
        {isLoaded && initialData.length !== 0 && <Loading />}
      </div>
    </GridContainer>
  );
}

const ResultContainer = {
  height: '100%',
  width: '1220px',
  padding: '6.4rem 0',
  justifyItems: 'center',
};

export default ResultList;
