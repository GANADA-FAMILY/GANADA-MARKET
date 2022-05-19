import styled from '@emotion/styled';
import { Item } from 'components/atoms/My';
import { List, TitleBar } from 'components/molecules/My';
import { Link } from 'react-router-dom';
import Wish from 'types/Entity/UserAPI/Wish';

interface MyWishProps {
  items: Wish[] | any;
}

function MyWish({ items }: MyWishProps) {
  return (
    <section>
      <MainTitleBar title="관심 상품" size={24} bordered />
      <List dataSoruce={items} renderItem={WishItem} />
    </section>
  );
}

function WishItem(item: Wish | any, index: number) {
  const { auctionId } = item;
  return (
    <StyledItem item={item}>
      <Link to={`/shop/:${auctionId}`}>1232</Link>
    </StyledItem>
  );
}

const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;
const StyledItem = styled(Item)`
  display: flex;
  a {
    text-decoration: none;
  }
`;

export default MyWish;
