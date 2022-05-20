import React from 'react';
import styled from '@emotion/styled';
import { setDelivery } from 'state/reducers/PaySlice';
import { Address } from 'types/Entity/UserAPI';
import { SubTitle } from 'components/atoms/Payment';
import { useDispatch } from 'react-redux';

interface Props {
  address: Address;
  onClose: () => void;
}

function Selection({ address, onClose }: Props) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setDelivery(address));
    onClose();
  };
  return (
    <Container onClick={onClick}>
      <SubTitle fontSize="1.5rem">{address.addressName}</SubTitle>
      <SubTitle>{address.addressPhone}</SubTitle>
      <SubTitle>
        ({address.postalCode}){address.addressDetail}
      </SubTitle>
    </Container>
  );
}

export default Selection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 6rem;
  padding: 2rem;
  cursor: pointer;
  &:hover {
    border: 1px solid black;
  }
`;
