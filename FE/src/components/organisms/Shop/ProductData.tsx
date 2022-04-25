import React from 'react';
import ProductDataRow from '../../molecules/Shop/ProductDataRow';

interface ProductDataT {
  initialData: any;
  // setState: (state: string) => void;
}

function ProductData({ initialData }: ProductDataT): JSX.Element {
  // 여기서 필터 리스트를 setState 해서 주자

  return (
    <div>
      <td>
        <ProductDataRow row={initialData} />
      </td>
    </div>
  );
}

export default ProductData;
