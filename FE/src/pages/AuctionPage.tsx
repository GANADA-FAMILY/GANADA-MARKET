import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuctionTemplate } from 'components/templates';
import axios from 'axios';
import { DataType } from './AuctionPageData';

function AuctionPage() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { auctionId } = useParams();

  const fetchData = async () => {
    const res = await axios.get(`auction/${auctionId}`);
    setData([res.data]);
    setLoading(false);
  };

  useEffect(() => {
    if (auctionId) {
      fetchData();
    }
  }, [auctionId]);

  return (
    <>
      {loading && <div>loading</div>}
      {loading || <AuctionTemplate data={data[0]} />}
    </>
  );
}

export default AuctionPage;
