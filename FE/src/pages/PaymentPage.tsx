import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuction } from 'state/reducers/PaySlice';
import Address from 'types/Entity/UserAPI/Address';
import Auction from 'types/Entity/MainAPI/Auction';
import userAPI from 'api/userAPI';
import PayReadyForm from 'types/Form/PayReadyForm';
import auctionAPI from 'api/auctionAPI';
import PaymenTemplate from '../components/templates/PaymenTemplate';

function PaymentPage() {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [auctionInfo, setAuctionInfo] = useState<Auction>();
  const [delivery, setDelivery] = useState<Address>();
  const dispatch = useDispatch();
  if (auctionInfo && delivery) {
    const payload = {
      auctionId: auctionInfo.auctionId,
      buyerName: delivery.addressName,
      phone: delivery.addressPhone,
      postalCode: delivery.postalCode,
      address: delivery.address,
      addressDetail: delivery.addressDetail,
    };
    dispatch(setAuction(payload));
  }
  useEffect(() => {
    async function fetchData() {
      const resAuction = await auctionAPI.detailAuction(auctionId);
      setAuctionInfo(resAuction.data.auction);
      const resDelivery = await userAPI.getAddressbook();
      setDelivery(resDelivery.data.addressBookList);
    }
    fetchData();
  }, []);
  return (
    <div>
      {auctionInfo !== undefined && delivery !== undefined && (
        <PaymenTemplate auction={auctionInfo} delivery={delivery} />
      )}
    </div>
  );
}

export default PaymentPage;
