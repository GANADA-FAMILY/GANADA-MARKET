import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductDataRow from '../../molecules/Shop/ProductDataRow';
import { setShopDataFilter } from '../../../state/reducers/ShopDataFilter';
import BlockContainer from '../../layouts/Shop/BlockContainer';

interface ProductDataT {
  initialData: any;
}
export interface StateType {
  [key: string]: string[];
}

function ProductData() {
  // 여기서 필터 리스트를 setState 해서 주자
  const [basicFilter, _] = useState<StateType>({
    브랜드: ['Apple', '삼성'],
    모델: [
      'iPhone 13',
      'iPhone 13 Pro',
      'iPhone 13 Pro Max',
      'iPhone 13 mini',
      'iPhone SE',
    ],
    저장장치: ['128GB', '1TB', '256GB', '512GB', '64GB'],
  });
  const [filter, setFilter] = useState<StateType>({});

  const dispatch = useDispatch();

  useEffect(() => {
    // 2차원 배열
    const obj = Object.values(filter);
    const newArr = obj.flat();
    // filter가 변화할때마다 리덕스에 새로운 배열을 dispatch
    dispatch(setShopDataFilter({ filterArray: newArr }));
  }, [filter]);

  const array: [string, string[]][] = Object.entries(basicFilter);
  return (
    <BlockContainer {...blockStyle}>
      {array.map((item: [string, string[]]) => (
        <ProductDataRow
          key={item[0]}
          title={item[0]}
          rowData={item[1]}
          setFilter={setFilter}
        />
      ))}
    </BlockContainer>
  );
}

const blockStyle = {
  paddingBottom: '2rem',
};
export default ProductData;
