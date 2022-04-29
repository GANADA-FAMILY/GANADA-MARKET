import React, { memo, useEffect, useState } from 'react';
import ResultItem from '../../molecules/Shop/ResultItem';
import GridContainer from '../../layouts/Shop/GridContainer';
import Loading from '../../Loading';
import BlockContainer from '../../layouts/Shop/BlockContainer';

export interface DataType {
  url: string;
  id: number;
  brand: string;
  product: string;
  model: string;
  price: number;
  date: string;
}

function ResultList({ ...rest }) {
  const [state, setState] = useState<DataType[]>([
    {
      id: 1,
      url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
      brand: 'Apple',
      product: 'iPhone 13 Pro 자급제',
      model: 'MNE23KH/A',
      price: 1000000000,
      date: '07:33:03',
    },
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
      id: 1,
      url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
      brand: 'Apple',
      product: 'iPhone 13 Pro 자급제',
      model: 'MNE23KH/A',
      price: 780000,
      date: '07:33:03',
    },
    {
      id: 1,
      url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
      brand: 'Apple',
      product: 'iPhone 13 Pro 자급제',
      model: 'MNE23KH/A',
      price: 1000000000,
      date: '07:33:03',
    },
    {
      id: 1,
      url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
      brand: 'Apple',
      product: 'iPhone 13 Pro 자급제',
      model: 'MNE23KH/A',
      price: 1000000000,
      date: '07:33:03',
    },
    {
      id: 1,
      url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
      brand: 'Apple',
      product: 'iPhone 13 Pro 자급제',
      model: 'MNE23KH/A',
      price: 1000000000,
      date: '07:33:03',
    },
  ]);

  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getMoreItem = async () => {
    setIsLoaded(true);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const Items: DataType[] = [
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
        id: 1,
        url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
        brand: 'Apple',
        product: 'iPhone 13 Pro 자급제',
        model: 'MNE23KH/A',
        price: 780000,
        date: '07:33:03',
      },
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
        id: 1,
        url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
        brand: 'Apple',
        product: 'iPhone 13 Pro 자급제',
        model: 'MNE23KH/A',
        price: 780000,
        date: '07:33:03',
      },
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
        id: 1,
        url: 'https://image.univstore.com/iPhone_13_Pro_Green_thumbnail.jpg',
        brand: 'Apple',
        product: 'iPhone 13 Pro 자급제',
        model: 'MNE23KH/A',
        price: 780000,
        date: '07:33:03',
      },
    ];
    setState((itemLists) => itemLists.concat(Items));
    setIsLoaded(false);
  };
  useEffect(() => {
    console.log(state);
  }, [state]);

  const onIntersect = async (
    [entry]: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
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
        return <ResultItem key={newLocal} data={item} idx={idx + 1} />;
      })}
      <div
        style={{ gridColumnStart: '2' }}
        ref={setTarget}
        className="Target-Element"
      >
        {isLoaded && <Loading />}
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

export default memo(ResultList);
