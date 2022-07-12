import { useEffect, useState } from 'react';
import auctionAPI from 'api/auctionAPI';
import AuctionList from 'types/Entity/MainAPI/AuctionList';
import Main from '../../organisms/Main/Main';
import Slick from '../../organisms/Main/Slick';

function MainTemplate() {
  const [auctionList, setAuctionList] = useState<AuctionList[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await auctionAPI.justDropAuction();
      setAuctionList(res.data.auctionList);
    }
    fetchData();
  }, []);
  return (
    <>
      <Slick />
      <Main data={auctionList} />
    </>
  );
}

export default MainTemplate;
