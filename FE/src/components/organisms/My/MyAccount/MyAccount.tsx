import styled from '@emotion/styled';
import { InputBox, LinkButton, Title, Text } from 'components/atoms/My';
import { InfoGroup, TitleBar } from 'components/molecules/My';
import useForm from 'hooks/useForm';
import { Bank } from 'types/Entity/UserAPI';
import BankBox from './BankBox';

interface MyAccountProps {
  bank: Bank | any;
}
function MyAccount({ bank }: MyAccountProps) {
  const onSubmit = () => {
    console.log(values);
  };
  const initalState: Bank = {
    bank: '',
    bankNum: '',
    bankHolder: '',
  };
  const validate = (form: Bank) => {
    if (
      form.bank.length > 0 &&
      form.bankNum.length > 0 &&
      form.bankHolder.length > 0
    )
      return true;
    return false;
  };

  const [values, errors, isLoading, handleChange, handleSubmit] = useForm({
    initalState,
    onSubmit,
    validate,
  });
  return (
    <section>
      <MainTitleBar title="정산 계좌 등록" size={24} />
      <BankForm onSubmit={handleSubmit}>
        {bank.bank && <BankBox bank={bank} />}
        <StyledInfoGroup>
          <InputBox
            title="은행명"
            type="text"
            placeholder="은행명을 정확히 입력하세요"
            onChange={handleChange}
            value={values.bank}
            name="bank"
          />
          <InputBox
            title="계좌번호"
            type="text"
            placeholder="-없이 입력하세요"
            onChange={handleChange}
            value={values.bankNum}
            name="bankNum"
          />
          <InputBox
            title="예금주"
            type="text"
            placeholder="예금주명을 정확히 입력하세요"
            onChange={handleChange}
            value={values.bankHolder}
            name="bankHolder"
          />
          <StyledButtonBox>
            <button
              type="submit"
              onClick={onSubmit}
              disabled={!validate(values)}
            >
              변경하기
            </button>
          </StyledButtonBox>
        </StyledInfoGroup>
      </BankForm>
    </section>
  );
}
const StyledInfoGroup = styled(InfoGroup)`
  padding-top: 20px;
`;
const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;
const StyledButtonBox = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;
const BankForm = styled.form`
  width: 480px;
`;

export default MyAccount;
