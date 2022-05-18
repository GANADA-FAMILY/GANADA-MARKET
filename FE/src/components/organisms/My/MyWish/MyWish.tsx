import styled from '@emotion/styled';
import { TitleBar } from 'components/molecules/My';
import Wish from 'types/Entity/UserAPI/Wish';

interface MyWishProps {
  items: Wish[] | any;
}
function MyWish({ items }: MyWishProps) {
  return (
    <section>
      <MainTitleBar title="관심 상품" size={24} bordered />
    </section>
  );
}

const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;

export default MyWish;
