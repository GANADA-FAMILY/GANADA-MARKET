import styled from '@emotion/styled';
import theme from 'styles/theme';
import { Button } from 'components/atoms/My';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import {
  deleteAddressbook,
  getAddressbook,
  updateRepresentAddressbook,
} from 'state/reducers/AddressSlice';
import { Modal, TitleBar } from 'components/molecules/My';
import { useState } from 'react';
import MyListBox from './MyListBox';
import AddressFormBox from './AddressFormBox';

function MyAddress() {
  const items = useRootSelector((state) => state.addressbook.addressbook);
  const dispatch = useRootDispatch();
  const [isModalVisible, setIsVisible] = useState<boolean>(false);
  const showHandler = () => {
    setIsVisible(true);
  };
  const onCloseHandler = () => {
    setIsVisible(false);
    console.log(123);
  };
  const modifyHandler = (id: string) => {
    // dispatch(()=>)
  };
  const activateHandler = (id: string) => {
    dispatch(() => updateRepresentAddressbook(id));
  };
  const deleteHandler = (id: string) => {
    dispatch(() => deleteAddressbook(id));
  };

  const onClickHandler = async (e: any) => {
    if (e.target.name === undefined) return;
    const names = e.target.name.split('-');
    console.log(names[1]);
    switch (names[1]) {
      case 'modify':
        showHandler();
        break;
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
          <AddButton type="button" onClick={showHandler} size="small">
            + 새 배송지 추가
          </AddButton>
        </ButtonBox>
      </TitleContent>
      <MyListBox items={items} onClick={onClickHandler} />
      <Modal
        onClose={onCloseHandler}
        visible={isModalVisible}
        title="새 주소 추가"
      >
        <AddressFormBox
          type="CREATE"
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
