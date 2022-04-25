import React from "react";
import ProductDataRow from "../../molecules/Shop/ProductDataRow";

interface ProductDataT {
  initialData: any;
  // setState: (state: string) => void;
}

const ProductData = ({ initialData }: ProductDataT) => {
  // 여기서 필터 리스트를 setState 해서 주자

  return (
    <>
      <td>
        <ProductDataRow row={initialData} />
      </td>
    </>
  );
};

export default ProductData;
