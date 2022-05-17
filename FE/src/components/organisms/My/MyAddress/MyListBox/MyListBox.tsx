import styled from '@emotion/styled';
import { AddressInfo, ButtonsBox, List } from 'components/molecules/My';
import { Item } from 'components/atoms/My';
import { Address } from 'types/Entity/UserAPI';

interface MyListBoxProps {
  items: Array<Address>;
}
function MyListBox({ items }: MyListBoxProps) {
  return (
    <div>
      <StyledMyList dataSoruce={items} renderItem={AddressListItem} />
    </div>
  );
}

const StyledMyList = styled(List)`
  padding: 30px 0 29px;
`;

function AddressListItem(item: Address | any, index: number) {
  return (
    <StyledItem item={item}>
      <AddressInfo item={item} />
      <ButtonsBox item={item} />
    </StyledItem>
  );
}

const StyledItem = styled(Item)`
  padding: ${(props) => (props.item.activate ? `30px 0 29px` : `17px 0 16px`)};
  border-bottom: ${(props) =>
    props.item.activate ? `2px solid #222` : `1px solid #ebebeb`};
`;

export default MyListBox;
