import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ShopQueryPage() {
  const { query } = useParams();
  useEffect(() => {
    console.log(query);
  }, []);
  return <div>{query}</div>;
}

export default ShopQueryPage;
