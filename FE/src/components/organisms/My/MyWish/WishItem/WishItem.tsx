import styled from '@emotion/styled';
import { Item } from 'components/atoms/My';
import { Link } from 'react-router-dom';
import Wish from 'types/Entity/UserAPI/Wish';

function WishItem(item: Wish | any, index: number) {
  const { auctionId } = item;
  return (
    <StyledItem item={item}>
      <Link to={`/shop/:${auctionId}`}>1232</Link>
    </StyledItem>
  );
}

const StyledItem = styled(Item)`
  display: flex;
  a {
    text-decoration: none;
  }
`;
export default WishItem;
