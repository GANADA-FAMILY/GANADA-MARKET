import React from 'react';
import styled from '@emotion/styled';
import Address from 'types/Entity/Address';
import AddressList from 'components/molecules/My/AddressList';

interface MyListBoxProps {
  items: Array<Address>;
}
function MyListBox({ items }: MyListBoxProps) {
  return (
    <div>
      <StyledMyList items={items} />
    </div>
  );
}

const StyledMyList = styled(AddressList)`
  padding: 30px 0 29px;
  /* border-bottom: 2px solid #222; */
`;

export default MyListBox;
