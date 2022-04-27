import React from 'react';

interface PropsType {
  element: React.ReactNode;
}

function ShopPageTemplate({ element }: PropsType) {
  return <div>{element}</div>;
}

export default ShopPageTemplate;
