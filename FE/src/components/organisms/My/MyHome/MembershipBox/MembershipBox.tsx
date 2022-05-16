import styled from '@emotion/styled';
import User from 'types/Entity/User';
import { Avatar } from 'components/atoms/My';
import { HomeInfo } from 'components/molecules/My';
import { MembershipDetail } from 'components/molecules/My/HomeInfo';

interface MembershipBoxProps {
  user: User;
}
function MembershipBox({ user, ...props }: MembershipBoxProps) {
  return (
    <StyeldBox>
      <UserDetail>
        <StyledAvatar src={user.profileImageUrl} />
        <HomeInfo user={user} />
      </UserDetail>
      <MembershipDetail user={user} />
    </StyeldBox>
  );
}

const StyeldBox = styled.div`
  padding: 23px 0 23px 23px;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  span {
    font-size: 14px;
    color: rgba(34, 34, 34, 0.5);
    line-height: 18px;
    letter-spacing: -0.05px;
  }
`;
const UserDetail = styled.div`
  display: flex;
`;

const StyledAvatar = styled(Avatar)`
  position: relative;
  margin-right: 12px;
  flex-shrink: 0;
  margin-right: 15px;
`;
export default MembershipBox;
