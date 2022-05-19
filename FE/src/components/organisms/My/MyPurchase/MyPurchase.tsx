import { TitleBar } from 'components/molecules/My';
import styled from 'styled-components';
import { OrderHistory } from 'types/Entity/UserAPI';
import PurchaseTab from './PurchaseTab';

interface MyPurchaseProps {
  orderHistory: OrderHistory[];
}
function MyPurchase({ orderHistory }: MyPurchaseProps) {
  return (
    <Container>
      <MainTitleBar title="구매 내역" size={24} />
      <PurchaseTab />
    </Container>
  );
}
const Container = styled.section``;
const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;
export default MyPurchase;
