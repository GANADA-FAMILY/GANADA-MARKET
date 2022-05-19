import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import InputBox from 'components/atoms/My/InputBox/InputBox';
import Title from 'components/atoms/My/Title/Title';
import InfoGroup from 'components/molecules/My/InfoGroup';
import InfoItem from 'components/molecules/My/InfoItem';
import { User } from 'types/Entity/UserAPI';
import { useAuth, useForm } from 'hooks';
import userAPI from 'api/userAPI';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import {
  changeCurrentPassword,
  changeNewPassword,
  changeNicknameForm,
  updateNickname,
  updatePassword,
} from 'state/reducers/UserSlice';
import { REG } from 'constants/reg';

function ProfileContent() {
  const { user, loading, dispatch } = useAuth();
  const newNicknameForm = useRootSelector((state) => state.user.nickNameForm);
  const newPasswordForm = useRootSelector((state) => state.user.passwordForm);

  const validatePasword = () =>
    REG.PASSWORD.test(newPasswordForm.currentPw) &&
    REG.PASSWORD.test(newPasswordForm.newPw);

  const submitUserInfo = () => {
    console.log(123);
  };
  return (
    <StyledBox>
      <InfoGroup title="로그인 정보">
        <InfoItem
          title="이메일 주소"
          type="email"
          submit={submitUserInfo}
          value={user.userEmail}
          hiddenModify
        />
        <InfoItem
          title="비밀번호"
          type="password"
          submit={() => dispatch(updatePassword({ formData: newPasswordForm }))}
          value={'●'.repeat(8)}
          validate={validatePasword()}
        >
          <Title level={5}>비밀번호 변경</Title>
          <InputBox
            title="이전 비밀번호"
            type="password"
            placeholder="영문,숫자,특수문자 조합 8-16자"
            name="currentPw"
            onChange={(e) => dispatch(changeCurrentPassword(e.target.value))}
            value={newPasswordForm.currentPw}
          />
          <InputBox
            title="새 비밀번호"
            type="password"
            name="newPw"
            placeholder="영문,숫자,특수문자 조합 8-16자"
            onChange={(e) => dispatch(changeNewPassword(e.target.value))}
            value={newPasswordForm.newPw}
          />
        </InfoItem>
      </InfoGroup>
      <InfoGroup title="개인 정보">
        <InfoItem
          title="닉네임"
          type="text"
          submit={() => dispatch(updateNickname({ formData: newNicknameForm }))}
          value={user.userNickname}
          validate={newNicknameForm.userNickname !== ''}
        >
          <Title level={5}>닉네임</Title>
          <InputBox
            title="새로운 닉네임"
            type="text"
            placeholder="고객님의 새로운 닉네임"
            value={newNicknameForm.userNickname}
            onChange={(e) => dispatch(changeNicknameForm(e.target.value))}
          />
        </InfoItem>
        <InfoItem
          title="휴대폰 번호"
          type="phone"
          submit={submitUserInfo}
          value={user.userPhone}
          modify={() => console.log('본인인증!')}
        />
      </InfoGroup>
      <WithdrawalLink to="/">회원 탈퇴</WithdrawalLink>
    </StyledBox>
  );
}

const StyledBox = styled.div`
  padding-top: 38px;
  max-width: 480px;
  > div ~ div {
    padding-top: 58px;
  }
`;
const WithdrawalLink = styled(Link)`
  margin-top: 55px;
  padding: 5px 0;
  display: inline-block;
  font-size: 13px;
  letter-spacing: -0.07px;
  text-decoration: underline;
`;
export default ProfileContent;
