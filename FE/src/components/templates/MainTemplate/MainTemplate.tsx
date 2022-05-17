import React, { useEffect, useState } from 'react';
import Main from '../../organisms/Main/Main';
import Slick from '../../organisms/Main/Slick';
import auctionAPI from 'api/auctionAPI';
import AuctionList from 'types/Entity/AuctionList';

function MainTemplate() {
  const [auctionList, setAuctionList] = useState<AuctionList[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await auctionAPI.justDropAuction();
      setAuctionList(res.data);
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
