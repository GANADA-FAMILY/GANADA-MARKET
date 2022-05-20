import styled from '@emotion/styled';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { TitleBar } from 'components/molecules/My';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { SalesHistory } from 'types/Entity/UserAPI';
import SalesTab from './SalesTab';

interface MySalesProps {
  items: SalesHistory[] | any;
}

function MySales({ items }: MySalesProps) {
  const dispatch = useRootDispatch();
  const filteredHistory = useRootSelector<SalesHistory[]>(
    (state) => state.salesHistory.filteredsalesHistory,
  );
  return (
    <Container>
      <MainTitleBar title="판매 내역" size={24} />
      <SalesTab />
      {filteredHistory[0] !== undefined ? (
        <Table dataSource={filteredHistory}>
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
export default MySales;
