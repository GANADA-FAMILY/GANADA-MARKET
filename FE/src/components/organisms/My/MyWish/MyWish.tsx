import styled from '@emotion/styled';
import { TitleBar } from 'components/molecules/My';

function MyWish() {
  return (
    <section>
      <MainTitleBar title="관심 상품" size={29} bordered />
    </section>
  );
}

const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;

export default MyWish;
