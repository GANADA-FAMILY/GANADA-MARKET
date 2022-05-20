import styled from '@emotion/styled';
import { TitleBar, List } from 'components/molecules/My';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { User } from 'types/Entity/UserAPI';
import MembershipBox from './MembershipBox';
import PurchaseBox from './PurchaseBox';
import SellBox from './SellBox';

interface MyHomeProps {
  user: User;
}
function MyHome({ user }: MyHomeProps) {
  const dispatch = useRootDispatch();
  return (
    <Container>
      <MembershipBox user={user} />
      <MyHomeTitle title="구매 내역" size={18} src="/my/buying" />
      <PurchaseBox />
      <MyHomeTitle title="판매 내역" size={18} src="/my/selling" />
      <SellBox />
      {/* <MyHomeTitle title="관심 상품" size={18} src="/my/wish" />
      <ListArea>
        <List dataSoruce={[]} />
      </ListArea> */}
    </Container>
  );
}

const MyHomeTitle = styled(TitleBar)`
  margin-top: 42px;
  padding-bottom: 16px;
  display: flex;
  max-width: 100%;
`;
const Container = styled.section``;
const ListArea = styled.div``;
export default MyHome;
