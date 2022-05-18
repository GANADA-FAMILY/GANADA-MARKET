import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Address from 'types/Entity/UserAPI/Address';
import Auction from 'types/Entity/Auction';
import userAPI from 'api/userAPI';
import auctionAPI from 'api/auctionAPI';
import PaymenTemplate from '../components/templates/PaymenTemplate';

function PaymentPage() {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [auction, setAuction] = useState<Auction>();
  const [delivery, setDelivery] = useState<Address>();

  useEffect(() => {
    async function fetchData() {
      const resAuction = await auctionAPI.detailAuction(auctionId);
      setAuction(resAuction.data.auction);
      const resDelivery = await userAPI.getAddressbook();
      setDelivery(resDelivery.data.addressBookList);
    }
    fetchData();
  }, []);
  return (
    <div>
      {auction && delivery && (
        <PaymenTemplate auction={auction} delivery={delivery} />
      )}
    </div>
  );
}

export default PaymentPage;
