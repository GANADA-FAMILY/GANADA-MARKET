import styled from '@emotion/styled';
import theme from 'styles/theme';
import { Button } from 'components/atoms/My';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import {
  deleteAddressbook,
  updateRepresentAddressbook,
} from 'state/reducers/AddressbookSlice';
import { Modal, TitleBar } from 'components/molecules/My';
import { useState } from 'react';
import MyListBox from './MyListBox';
import AddressFormBox from './AddressFormBox';

function MyAddress() {
  const items = useRootSelector((state) => state.addressbook.addressbook);
  const dispatch = useRootDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const onShowHandler = () => {
    setVisible(true);
  };
  const onCloseHandler = () => {
    setVisible(false);
  };

  const onClickHandler = async (e: any) => {
    if (e.target.name === undefined) return;
    const names = e.target.name.split('-');
    switch (names[1]) {
      case 'active':
        dispatch(updateRepresentAddressbook(names[0]));
        break;
      case 'delete':
        dispatch(deleteAddressbook(names[0]));
        break;
      default:
        console.log('오류!');
    }
  };
  return (
    <Container>
      <TitleContent>
        <TitleBar title="주소록" size={24} lineHeight={12} color="black2" />
        <ButtonBox>
          <AddButton type="button" onClick={onShowHandler} size="small">
            + 새 배송지 추가
          </AddButton>
        </ButtonBox>
      </TitleContent>
      <MyListBox items={items} onClick={onClickHandler} />
      <Modal onClose={onShowHandler} visible={visible} title="새 주소 추가">
        <AddressFormBox
          onCancel={onCloseHandler}
          initialForm={{
            addressName: '',
            addressPhone: '',
            postalCode: '',
            address: '',
            addressDetail: '',
            activate: false,
          }}
        />
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  min-height: 315px;
`;
const TitleContent = styled.div`
  display: flex;
  padding: 5px 0 6px;
`;
const ButtonBox = styled.div`
  margin-left: auto;
  padding-left: 30px;
  flex-shrink: 0;
`;
const AddButton = styled(Button)`
  margin-right: 0;
  padding: 0 14px;
  line-height: 32px;
  border: 1px solid #222;
  letter-spacing: -0.06px;
  margin-top: 0;
  background-color: ${theme.color.white};
  color: ${theme.color.gray2};
  font-size: 1.2rem;
`;

export default MyAddress;
