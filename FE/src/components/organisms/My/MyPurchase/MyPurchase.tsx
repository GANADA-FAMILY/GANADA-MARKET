import 'antd/lib/table/style/index.css';
import 'antd/lib/pagination/style/index.css';
import { TitleBar } from 'components/molecules/My';
import styled from 'styled-components';
import { OrderHistory } from 'types/Entity/UserAPI';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import PurchaseTab from './PurchaseTab';

interface MyPurchaseProps {
  orderHistory: OrderHistory[];
}
function MyPurchase({ orderHistory }: MyPurchaseProps) {
  const dispatch = useRootDispatch();
  const filteredOrderHistory = useRootSelector<OrderHistory[]>(
    (state) => state.orderHistory.filteredHistory,
  );
  return (
    <Container>
      <MainTitleBar title="구매 내역" size={24} />
      <PurchaseTab />
      {filteredOrderHistory[0] !== undefined ? (
        <Table dataSource={filteredOrderHistory}>
          <Column title="결제 번호" dataIndex="paymentId" key="paymentId" />
          <Column title="상품 명" dataIndex="productName" />
          <Column title="브랜드 명" dataIndex="productBrand" />
          <Column title="가격" dataIndex="price" />
          <Column title="택배 회사" dataIndex="courier" />
          <Column title="운송장 번호" dataIndex="trackingNum" />
          <Column title="결제일" dataIndex="tradeDate" />
        </Table>
      ) : (
        <EmptyArea>해당 목록이 없습니다.</EmptyArea>
      )}
    </Container>
  );
}
const Container = styled.section``;
const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;
const EmptyArea = styled.div`
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
  text-align: center;
  padding: 80px 0;
`;

export default MyPurchase;
