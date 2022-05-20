import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductDataRow from '../../molecules/Shop/ProductDataRow';
import { setShopDataFilter } from '../../../state/reducers/ShopDataFilter';
import BlockContainer from '../../layouts/Shop/BlockContainer';

interface propsType {
  product: string;
}
export interface StateType {
  [key: string]: string[];
}

function ProductData({ product }: propsType) {
  const [basicFilter, setBasicFilter] = useState<StateType>({
    브랜드: ['Apple', '삼성'],
    모델: [
      '아이폰 SE2',
      '아이폰11',
      '아이폰11 프로',
      '아이폰11 프로 맥스',
      '아이폰12 미니',
      '아이폰12',
      '아이폰12 프로',
      '아이폰12 프로 맥스',
      '아이폰13 미니',
      '아이폰13',
      '아이폰13 프로',
      '아이폰13 프로 맥스',
      '갤럭시 Z 플립3',
      '갤럭시 Z 폴드3',
      '갤럭시 S22+',
    ],
    저장장치: ['128GB', '1TB', '256GB', '512GB', '64GB'],
  });
  const [filter, setFilter] = useState<StateType>({});

  useEffect(() => {
    if (product === 'earphone') {
      setBasicFilter(earphoneFilter);
    }
  }, []);

  const earphoneFilter = {
    브랜드: ['Apple', '삼성'],
    모델: [
      'Galaxy Buds',
      'Galaxy Buds+',
      'Galaxy Buds2',
      'Galaxy Buds Pro',
      'Galaxy Buds Live',
      'Airpods',
      'Airpods 2세대 유선충전',
      'Airpods 2세대 무선충전',
      'Airpods Pro',
      'Airpods Max',
      'Airpods 3세대',
    ],
  };
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
