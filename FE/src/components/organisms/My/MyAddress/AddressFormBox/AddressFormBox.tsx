import styled from '@emotion/styled';
import userAPI from 'api/userAPI';
import { useForm } from 'hooks';
import AddressForm from 'types/Form/AddressForm';
import theme from 'styles/theme';
import { Button, InputBox, Text } from 'components/atoms/My';
import { InfoGroup } from 'components/molecules/My';

interface AddressFormBoxProps {
  initialForm: AddressForm;
  type: 'CREATE' | 'UPDATE';
  addressId?: number;
  onCancel: () => void;
}
function AddressFormBox({
  initialForm,
  type,
  addressId,
  onCancel,
}: AddressFormBoxProps) {
  const onSubmit = () => {
    if (type === 'CREATE') userAPI.createAddressbook({ formData: values });
    if (type === 'UPDATE')
      userAPI.updateAddressbook({ formData: values }, `${addressId}`);
  };
  const validate = (form: AddressForm) => {
    if (
      form.addressName.length > 1 &&
      form.addressPhone.length > 10 &&
      form.postalCode.length > 0 &&
      form.address.length > 0 &&
      form.addressDetail.length > 0
    )
      return true;
    return false;
  };
  const [values, errors, isLoading, handleChange, handleSubmit] = useForm({
    initalState: initialForm,
    onSubmit,
    validate,
  });
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInfoGroup>
        <InputBox
          title="이름"
          type="text"
          placeholder="올바른 이름을 입력해주세요. 2자리 이상"
          onChange={handleChange}
          value={values.addressName}
          name="addressName"
        />
        <InputBox
          title="휴대폰 번호"
          type="phone"
          placeholder="-없이 입력하세요"
          onChange={handleChange}
          value={values.addressPhone}
          name="addressPhone"
        />
        <InputBox
          title="우편번호"
          type="text"
          placeholder="우편 번호를 적어주세요"
          onChange={handleChange}
          value={values.postalCode}
          name="postalCode"
        />
        <InputBox
          title="주소"
          type="text"
          placeholder="우편 번호 검색 후, 자동입력 됩니다"
          onChange={handleChange}
          value={values.address}
          name="address"
        />
        <InputBox
          title="상세 주소"
          type="text"
          placeholder="건물, 아파트, 동/호수 입력"
          onChange={handleChange}
          value={values.addressDetail}
          name="addressDetail"
        />
        <div>
          <input
            type="checkbox"
            value={values.activate}
            onChange={handleChange}
            name="activate"
          />
          <Text size={13} inline>
            기본 배송지로 지정
          </Text>
        </div>
      </StyledInfoGroup>
      <StyledButtonBox>
        <CancelButton type="button" onClick={onCancel}>
          취소
        </CancelButton>
        <Button type="submit" onClick={onSubmit} disabled={!validate(values)}>
          저장하기
        </Button>
      </StyledButtonBox>
    </StyledForm>
  );
}
const StyledForm = styled.form`
  padding: 0 32px;
`;
const StyledInfoGroup = styled(InfoGroup)`
  padding-top: 20px;
`;
const StyledButtonBox = styled.div`
  padding: 24px 32px 32px;
  display: flex;
  justify-content: center;
  button {
    margin: 0.5rem;
  }
`;
const CancelButton = styled(Button)`
  background-color: ${theme.color.white};
  color: ${theme.color.black2};
  font-weight: 400;
  border: 1px solid ${theme.color.gray};
`;

export default AddressFormBox;
