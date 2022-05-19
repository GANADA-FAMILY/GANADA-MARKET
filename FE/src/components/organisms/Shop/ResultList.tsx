import React, { useEffect, useState, useRef } from 'react';
import Auction from 'types/Entity/ShopAPI/Auction';
import { getPageList } from 'api/shopAPI';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
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
  const [state, setState] = useState<Auction[]>(initialData);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isLast, setLast] = useState(false);
  const params = useParams();
  const addItem = useRef<Auction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const getMoreItem = async () => {
    setIsLoaded(true);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setState((prev) => prev.concat(addItem.current));
    setPageNum((prev: number) => prev + 1);
    setIsLoaded(false);
  };
  // 페이지 이동했을때
  useEffect(() => {
    let isComponentMounted = true;

    setIsLoaded(true);
    if (isComponentMounted) {
      (async () => {
        const res = await getPageList(
          {
            ...Object.fromEntries(query),
            page: `${pageNum}`,
            size: '12',
          },
          params.product,
        );
        if (!res.data.last) {
          addItem.current = res.data.auctionList;
        } else {
          setLast(true);
        }
      })();
    }
    setIsLoaded(false);

    return () => {
      isComponentMounted = false;
    };
  }, [pageNum]);

  const onIntersect = async (
    [entry]: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    if (entry.isIntersecting && !isLoaded && !isLast) {
      observer.unobserve(entry.target);

      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target && !isLast) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <GridContainer {...ResultContainer}>
      {state.length === 0 && state ? (
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
        style={{ gridColumnStart: '2' }}
        ref={setTarget}
        className="Target-Element"
      >
        {isLoaded && !isLast && <Loading />}
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
