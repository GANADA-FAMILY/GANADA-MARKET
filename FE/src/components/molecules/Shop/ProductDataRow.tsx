import React, { useEffect, useState } from 'react';
import LinkTag from '../../atoms/Shop/LinkTag';
import Text from '../../atoms/Shop/Text';

interface ProductDataRowT {
  row: any;
}

function ProductDataRow({ row }: ProductDataRowT): JSX.Element {
  // 클릭하면 색깔 변화 주고
  // 클릭이 일어나면 리스트 변화

  const [state, setState] = useState([false, false]);

  const toggleLink = (num: number) => {
    const list = state.map((el: boolean, idx: number) =>
      idx === num ? !el : el,
    );
    setState(list);
  };

  // useEffect(() => {}, [state]);

  return (
    <>
      <Text>브랜드</Text>
      <LinkTag onClick={() => toggleLink(0)} isClick={state[0]}>
        Apple
      </LinkTag>
      <LinkTag onClick={() => toggleLink(1)} isClick={state[1]}>
        Samsung
      </LinkTag>
      <div>state {state}</div>
    </>
  );
}

export default ProductDataRow;
