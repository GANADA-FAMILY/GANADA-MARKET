import styled from '@emotion/styled';
import { AddressInfo, ButtonsBox, List } from 'components/molecules/My';
import { Item } from 'components/atoms/My';
import { Address } from 'types/Entity/UserAPI';

interface MyListBoxProps {
  items: Array<Address>;
  onActivate?: React.MouseEventHandler<HTMLAnchorElement>;
  onModify?: React.MouseEventHandler<HTMLAnchorElement>;
  onDelete?: React.MouseEventHandler<HTMLAnchorElement>;
}
function MyListBox({
  items,
  onActivate = () => null,
  onModify = () => null,
  onDelete = () => null,
}: MyListBoxProps) {
  return (
    <div>
      <StyledMyList
        dataSoruce={items}
        renderItem={AddressListItem}
        onClick={onModify}
      />
    </div>
  );
}

const StyledMyList = styled(List)`
  padding: 30px 0 29px;
`;

function AddressListItem(item: Address | any, index: number) {
  const { addressId } = item;
  return (
    <StyledItem item={item} key={addressId}>
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
