import React from 'react';
import styled from '@emotion/styled';
import Address from 'type/Address';
import Text from 'components/atoms/my/Text';

interface AddressInfoProps {
  item: Address;
}
function AddressInfo({ item }: AddressInfoProps) {
  return (
    <Molecule>
      <NameBox>
        <NameText size={15} strong inline>
          {item.addressName}
        </NameText>
        {item.activate ? (
          <MarkText size={12} color="black2" inline>
            기본 배송지
          </MarkText>
        ) : (
          ''
        )}
      </NameBox>
      <Text size={15}>{item.addressPhone}</Text>
      <AddressBox>
        <Text size={14} inline>
          ({item.postalCode})
        </Text>
        <Text size={14} inline>
          {item.address}
        </Text>
      </AddressBox>
    </Molecule>
  );
}

const Molecule = styled.div`
  line-height: 17px;
  margin-right: 24px;
  * + * {
    padding-top: 5px;
  }
`;
const NameBox = styled.div``;
const AddressBox = styled.div`
  padding-top: 4px;
  letter-spacing: -0.21px;
`;
const NameText = styled(Text)`
  display: inline-block;
  vertical-align: top;
  line-height: 20px;
  letter-spacing: -0.15px;
`;

const MarkText = styled(Text)`
  display: inline-block;
  vertical-align: top;
  line-height: 14px;
  margin-top: 0;
  margin-left: 4px;
  padding: 3px 6px;
  font-size: 12px;
  letter-spacing: -0.06px;
  border-radius: 10px;
  background-color: #f4f4f4;
  box-sizing: border-box;
  width: auto;
`;
export default AddressInfo;
