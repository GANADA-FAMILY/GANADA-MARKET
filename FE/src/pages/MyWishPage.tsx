import styled from '@emotion/styled';
import MyWish from 'components/organisms/My/MyWish';
import { useEffect } from 'react';
import { useRootDispatch, useRootSelector } from 'state/Hooks';
import { getWishList } from 'state/reducers/WishSlice';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

function MyWishPage() {
  const dispatch = useRootDispatch();
  const wishList = useRootSelector((state) => state.wishList.wishList);

  useEffect(() => {
    dispatch(getWishList());
  }, []);

  return (
    <MainContainer>
      <MyPageTemplate element={<MyWish items={wishList} />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyWishPage;
