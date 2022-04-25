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

  useEffect(() => {}, [state]);

  return (
    <>
      <Text>브랜드</Text>
      <LinkTag onClick={(isClick) => !isClick} isClick={false}>
        Apple
      </LinkTag>
      <LinkTag
        onClick={() =>
          setState((prev) => {
            prev[1] = !prev[1];
          })
        }
        isClick={state[1]}
      >
        Samsung
      </LinkTag>
    </>
  );
}

export default ProductDataRow;
