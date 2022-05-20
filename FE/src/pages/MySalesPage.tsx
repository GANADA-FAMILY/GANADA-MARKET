import styled from '@emotion/styled';
import { MySales } from 'components/organisms/My';
import { useRootDispatch } from 'state/Hooks';
import { ProductHistory } from 'types/Entity/UserAPI';
import MyPageTemplate from '../components/templates/MyPageTemplate/MyPageTemplate';

const items: ProductHistory[] = [
  {
    auctionId: 1,
    productName: '아이폰12',
    productBrand: '애플',
    tradeDate: '2022-01-31',
    price: 890000,
    status: 0,
    courier: '우체국',
    trackingNum: 'string',
  },
  {
    auctionId: 2,
    productName: '아이폰13',
    productBrand: '애플',
    tradeDate: '2022-01-31',
    price: 890000,
    status: 1,
    courier: '우체국',
    trackingNum: 'string',
  },
  {
    auctionId: 3,
    productName: '아이폰13 Pro',
    productBrand: '애플',
    tradeDate: '2022-01-31',
    price: 890000,
    status: 0,
    courier: '우체국',
    trackingNum: 'string',
  },
  {
    auctionId: 4,
    productName: '아이폰12 Pro',
    productBrand: '애플',
    tradeDate: '2022-01-31',
    price: 1000000,
    status: 1,
    courier: '로젠',
    trackingNum: 'string',
  },
];

function MySalesPage() {
  const dispatch = useRootDispatch();
  return (
    <MainContainer>
      <MyPageTemplate element={<MySales items={items} />} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
`;

export default MySalesPage;
