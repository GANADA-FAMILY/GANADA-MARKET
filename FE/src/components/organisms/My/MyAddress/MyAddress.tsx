import styled from '@emotion/styled';
import TitleBar from 'components/molecules/My/TitleBar';
import LinkButton from 'components/atoms/My/LinkButton';
import Text from 'components/atoms/My/Text';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import {
  deleteAddressbook,
  getAddressbook,
  updateRepresentAddressbook,
} from 'state/reducers/AddressSlice';
import { useEffect } from 'react';
import MyListBox from './MyListBox';

function MyAddress() {
  const items = useRootSelector((state) => state.addressbook.addressbook);
  const dispatch = useRootDispatch();

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
        await modifyHandler(names[0]);
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
          <AddButton href="">
            <Text size={12} color="gray2" lineHeight={32}>
              + 새 배송지 추가
            </Text>
          </AddButton>
        </ButtonBox>
      </TitleContent>
      <MyListBox items={items} onClick={onClickHandler} />
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
const AddButton = styled(LinkButton)`
  margin-right: 0;
  padding: 0 14px;
  line-height: 32px;
  border-radius: 10px;
  border: 1px solid #222;
  letter-spacing: -0.06px;
  text-decoration: none;
  margin-top: 0;
`;

export default MyAddress;
