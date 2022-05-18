import styled from '@emotion/styled';
import MyWish from 'components/organisms/My/MyWish';
import Wish from 'types/Entity/UserAPI/Wish';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

const items: Wish[] = [
  {
    auctionId: 23,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: false,
    auctionImg:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000',
  },
  {
    auctionId: 24,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: true,
    auctionImg:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000',
  },
  {
    auctionId: 24,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: false,
    auctionImg:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000',
  },
  {
    auctionId: 24,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: true,
    auctionImg:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000',
  },
  {
    auctionId: 24,
    auctionTitle: 'string',
    endTime: '2022-05-11T04:38:40.000+00:00',
    status: true,
    auctionImg:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000',
  },
];

function MyWishPage() {
  return (
    <MainContainer>
      <MyPageTemplate element={<MyWish items={items} />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MyWishPage;
