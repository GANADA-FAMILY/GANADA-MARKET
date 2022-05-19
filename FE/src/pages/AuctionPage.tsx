import { useEffect, useState } from 'react';
import { AuctionTemplate } from 'components/templates';
import { DUMMY_DATA, DataType } from './AuctionPageData';

function AuctionPage() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setData([DUMMY_DATA]);
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <div>loading</div>}
      {loading || <AuctionTemplate data={data[0]} />}
    </>
  );
}

export default AuctionPage;
