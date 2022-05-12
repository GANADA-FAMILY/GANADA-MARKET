import React from 'react';
import PaymenTemplate from '../components/templates/PaymenTemplate';

const data = {
  id: 1,
  name: 'dunk',
};

function PaymentPage() {
  return <PaymenTemplate data={data} />;
}

export default PaymentPage;
