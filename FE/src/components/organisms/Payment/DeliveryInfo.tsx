import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import Address from 'types/Entity/UserAPI/Address';
import { Modal } from 'components/molecules/My';
import { Button } from 'components/atoms/Main/';
import Container from 'components/layouts/Payment/Container';
import Selection from 'components/molecules/Payment/Selection';
import { Title } from 'components/atoms/Payment';
import { selectPayInfo, setDelivery } from 'state/reducers/PaySlice';

interface Props {
  data: Address[];
}

function DeliveryInfo({ data }: Props) {
  const [visible, setVisible] = useState(false);
  const select = useSelector(selectPayInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length !== 0) {
      dispatch(setDelivery(data[0]));
    }
  }, [data]);
  const onShowModal = () => {
    setVisible(true);
  };
  const onCloswModal = () => {
    setVisible(false);
  };
  const plusAddress = () => {
    navigate('/my/address');
  };
  return (
    <DelyContainer>
      <Title>배송주소</Title>
      <Wrapper>
        <Dl>
          <Item>
            <Dt>받는 분</Dt>
            {select && <Dd>{select.buyerName}</Dd>}
          </Item>
          <Item>
            <Dt>연락처</Dt>
            {select && <Dd>{select.phone}</Dd>}
          </Item>
          <Item>
            <Dt>배송 주소</Dt>
            {select && (
              <Dd>
                {select.address}
                {select.addressDetail}
              </Dd>
            )}
          </Item>
        </Dl>
        <Button onClick={onShowModal}>변경</Button>
      </Wrapper>
      <Modal visible={visible} title="배송지 변경" onClose={onCloswModal}>
        {data.map((item) => (
          <Selection
            address={item}
            onClose={onCloswModal}
            key={item.addressId}
          />
        ))}
        <Button onClick={plusAddress}>새 배송지 추가</Button>
      </Modal>
    </DelyContainer>
  );
}

export default DeliveryInfo;

const DelyContainer = styled(Container)`
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
`;
const Dl = styled.dl`
  width: 100%;
`;

const Dt = styled.dt`
  float: left;
  color: rgba(34, 34, 34, 0.5);
  width: 8rem;
`;
const Dd = styled.dd`
  float: right;
  margin-right: 2rem;
`;
const Item = styled.div`
  min-height: 2.6rem;
  line-height: 1.7rem;
`;
