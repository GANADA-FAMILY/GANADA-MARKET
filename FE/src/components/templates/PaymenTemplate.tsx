import React from 'react';
import styled from '@emotion/styled';
import Address from 'types/Entity/UserAPI/Address';
import Auction from 'types/Entity/MainAPI/Auction';
import Pay from '../organisms/Payment/Pay';
import DeliveryInfo from '../organisms/Payment/DeliveryInfo';
import ProductInfo from '../organisms/Payment/ProductInfo';
import PayInfo from '../organisms/Payment/PayInfo';

interface Props {
  auction: Auction;
  paymentPrice: number;
  addressList: Address[];
}

function PaymentTemplate({ auction, paymentPrice, addressList }: Props) {
  return (
    <Container>
      <Wrapper>
        <ProductInfo data={auction.product} imgSrc={auction.auctionImgs[0]} />
        <DeliveryInfo data={addressList} />
        <PayInfo price={paymentPrice} />
        <Pay />
      </Wrapper>
    </Container>
  );
}

export default PaymentTemplate;

const Container = styled.main`
  width: 100%;
  height: 100%;
  background-color: #fafafa;
`;

const Wrapper = styled.section`
  width: 78rem;
  padding: 2rem 4rem 16rem;
  margin: auto;
`;
const ad = [
  {
    addressId: 1,
    addressName: '조준영',
    addressPhone: '010-8362-3403',
    addressDetail:
      '부산광역시 북구 화명신도시로 255 율리주공 아파트 304동 2106호',
    postalCode: '46521',
    activate: true,
    address: 'test',
  },
  {
    addressId: 2,
    addressName: '',
    addressPhone: 'test2',
    addressDetail: 'test2',
    postalCode: 'test',
    activate: true,
    address: 'test',
  },
  {
    addressId: 3,
    addressName: 'test3',
    addressPhone: 'test3',
    addressDetail: 'test3',
    postalCode: 'test',
    activate: true,
    address: 'test',
  },
  {
    addressId: 4,
    addressName: 'test3',
    addressPhone: 'test3',
    addressDetail: 'test3',
    postalCode: 'test',
    activate: true,
    address: 'test',
  },
  {
    addressId: 5,
    addressName: 'test3',
    addressPhone: 'test3',
    addressDetail: 'test3',
    postalCode: 'test',
    activate: true,
    address: 'test',
  },
  {
    addressId: 6,
    addressName: 'test3',
    addressPhone: 'test3',
    addressDetail: 'test3',
    postalCode: 'test',
    activate: true,
    address: 'test',
  },
  {
    addressId: 7,
    addressName: 'test3',
    addressPhone: 'test3',
    addressDetail: 'test3',
    postalCode: 'test',
    activate: true,
    address: 'test',
  },
];
