import React, { useState, useEffect } from 'react';
import ProductDataRow from '../../molecules/Shop/ProductDataRow';

interface ProductDataT {
  initialData: any;
  setAllFilterList: (state: boolean[]) => void;
}
export interface StateType {
  [key: string]: string[];
}

function ProductData(): JSX.Element {
  // 여기서 필터 리스트를 setState 해서 주자
  const [state, setState] = useState<string[]>([]);
  const [basicFilter, _] = useState<StateType>({
    samsung: ['san', 'sung'],
    Lg: ['L', 'G'],
  });
  const [filter, setFilter] = useState<StateType>({});

  // useEffect(() => {}, []);

  useEffect(() => {
    // 2차원 배열
    const obj = Object.values(filter);
    const newArr = obj.flat();
    console.log(newArr);
  }, [filter]);

  const array: [string, string[]][] = Object.entries(basicFilter);
  return (
    <div>
      {array.map((item: [string, string[]]) => (
        <ProductDataRow
          key={item[0]}
          title={item[0]}
          rowData={item[1]}
          setFilter={setFilter}
        />
      ))}
    </div>
  );
}

export default ProductData;
