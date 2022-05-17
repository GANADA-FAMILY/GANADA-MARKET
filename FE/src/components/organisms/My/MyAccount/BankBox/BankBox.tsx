import styled from '@emotion/styled';
import { Title, Text } from 'components/atoms/My';
import { Bank } from 'types/Entity/UserAPI';

interface BankBoxProps {
  bank: Bank | any;
}
function BankBox({ bank }: BankBoxProps) {
  return (
    <StyledBox>
      <Title level={4}>등록된 계좌 정보</Title>
      <Text size={15} lineHeight={22} inline color="black2">
        {`${bank.bank}  `}
      </Text>
      <Text size={15} lineHeight={22} inline color="black2">
        {bank.bankNum}
      </Text>
      <Text
        size={15}
        lineHeight={22}
        inline
        color="black2"
      >{`/ ${bank.bankHolder}`}</Text>
    </StyledBox>
  );
}

const StyledBox = styled.div`
  overflow: hidden;
  margin-top: 21px;
  padding: 15px 15px 16px;
  border-radius: 10px;
  background-color: #fafafa;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
`;

export default BankBox;
