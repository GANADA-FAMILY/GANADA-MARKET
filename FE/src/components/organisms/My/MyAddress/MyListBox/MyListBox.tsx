import styled from '@emotion/styled';
import { AddressInfo, ButtonsBox, List } from 'components/molecules/My';
import { Item } from 'components/atoms/My';
import { Address } from 'types/Entity/UserAPI';
import React from 'react';

interface MyListBoxProps {
  items: Array<Address>;
  onClick?: React.MouseEventHandler<HTMLElement>;
}
function MyListBox({ items, onClick }: MyListBoxProps) {
  return (
    <div>
      <StyledMyList
        dataSoruce={items}
        renderItem={AddressListItem}
        onClick={onClick}
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
      <ButtonsBox item={item} id={addressId} />
    </StyledItem>
  );
}

const StyledItem = styled(Item)`
  padding: ${(props) => (props.item.activate ? `30px 0 29px` : `17px 0 16px`)};
  border-bottom: ${(props) =>
    props.item.activate ? `2px solid #222` : `1px solid #ebebeb`};
`;

export default MyListBox;
