import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PaymenTemplate from '../components/templates/PaymenTemplate';
// import Auction from './../types/Entity/Auction';

interface Locate {
  from: {
    pathname: string;
  };
}

function PaymentPage() {
  // 결제 관련한 데이터를 navigate로 받는게 좋을거 같은데?
  const param = useParams();
  return <PaymenTemplate data={data} />;
}

export default PaymentPage;
