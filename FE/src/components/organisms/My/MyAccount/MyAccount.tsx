import styled from '@emotion/styled';
import { InputBox } from 'components/atoms/My';
import { InfoGroup, TitleBar } from 'components/molecules/My';
import { Bank } from 'types/Entity/UserAPI';

interface MyAccountProps {
  bank: Bank | any;
}
function MyAccount({ bank }: MyAccountProps) {
  return (
    <section>
      <MainTitleBar title="정산 계좌 등록" size={24} />
      <StyledInfoGroup>
        <InputBox
          title="은행명"
          type="text"
          placeholder="은행명을 정확히 입력하세요"
        />
        <InputBox title="계좌번호" type="text" placeholder="-없이 입력하세요" />
        <InputBox
          title="예금주"
          type="text"
          placeholder="예금주명을 정확히 입력하세요"
        />
      </StyledInfoGroup>
    </section>
  );
}
const StyledInfoGroup = styled(InfoGroup)`
  padding-top: 20px;
  width: 480px;
`;
const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;

export default MyAccount;
