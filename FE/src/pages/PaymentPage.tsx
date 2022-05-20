import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuction } from 'state/reducers/PaySlice';
import Address from 'types/Entity/UserAPI/Address';
import Auction from 'types/Entity/MainAPI/Auction';
import userAPI from 'api/userAPI';
import auctionAPI from 'api/auctionAPI';
import PaymenTemplate from '../components/templates/PaymenTemplate';

interface Location {
  paymentPrice: number;
}

function PaymentPage() {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [auctionInfo, setAuctionInfo] = useState<Auction>();
  const [addressList, setAddressList] = useState<Address[]>([]);
  const location = useLocation();
  const { paymentPrice } = location.state as Location;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const resAuction = await auctionAPI.detailAuction(auctionId);
      setAuctionInfo(resAuction.data.auction);
      const resDelivery = await userAPI.getAddressbook();
      setAddressList(resDelivery.data.addressBookList);
      if (resAuction) {
        const payload = {
          auctionId: resAuction.data.auction.auctionId,
          price: paymentPrice,
        };
        dispatch(setAuction(payload));
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      {auctionInfo !== undefined && (
        <PaymenTemplate
          auction={auctionInfo}
          paymentPrice={paymentPrice}
          addressList={addressList}
        />
      )}
    </div>
  );
}

export default PaymentPage;
