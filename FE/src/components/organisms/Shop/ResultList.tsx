import React, { useEffect, useState, useRef } from 'react';
import Auction from 'types/Entity/ShopAPI/Auction';
import { getList } from 'api/shopAPI';
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import ResultItem from '../../molecules/Shop/ResultItem';
import GridContainer from '../../layouts/Shop/GridContainer';
import Loading from '../../Loading';
import BlockContainer from '../../layouts/Shop/BlockContainer';

interface propsType {
  initialData: Auction[];
  onLike: (auctionId: number, trigger: boolean) => void;
}

function ResultList({ initialData, onLike }: propsType) {
  const [state, setState] = useState<Auction[]>(initialData);
  const ref = useRef(0);
  const isLast = useRef<boolean>(false);
  const itemRef = useRef<Auction[]>([]);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const params = useParams();
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const getMoreItem = async () => {
    ref.current += 1;
    setIsLoaded(true);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setState((itemLists) => itemLists.concat(itemRef.current));
    setIsLoaded(false);
  };

  useEffect(() => {
    if (ref.current > 0 && !isLast.current) {
      navigate({
        pathname: `/shop/${params.product}`,
        search: createSearchParams({
          page: `${ref.current}`,
          size: '12',
          // sort: 'endTime,asc',
        }).toString(),
      });
    }
  }, [ref.current]);

  useEffect(() => {
    if (ref.current > 0 && !isLast.current) {
      (async () => {
        if (query && params.product) {
          const res = await getList(params.product, query);
          itemRef.current = res.data.auctionList;
          if (res.data.last) {
            isLast.current = true;
          }
        }
      })();
    }
  }, [query]);

  const onIntersect = async (
    [entry]: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    if (entry.isIntersecting && !isLoaded && !isLast.current) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target && !isLast.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <GridContainer {...ResultContainer}>
      {state.map((item, idx) => {
        const newLocal = idx + 1;
        return (
          <ResultItem
            onLike={onLike}
            key={newLocal}
            data={item}
            idx={idx + 1}
          />
        );
      })}
      <div
        style={{ gridColumnStart: '2' }}
        ref={setTarget}
        className="Target-Element"
      >
        {isLoaded && !isLast.current && <Loading />}
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
