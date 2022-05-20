/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Item, LinkButton, Text } from 'components/atoms/My';
import { List, TitleBar } from 'components/molecules/My';
import { priceComma } from 'functions';
import datetimeToLabel from 'functions/datetimeToLabel';
import { Link } from 'react-router-dom';
import { useRootDispatch } from 'state/Hooks';
import { deleteWish } from 'state/reducers/WishSlice';
import theme from 'styles/theme';
import { Selling } from 'types/Entity/UserAPI';

interface MySellingProps {
  items: Selling[] | any;
}

function MySelling({ items }: MySellingProps) {
  return (
    <section>
      <MainTitleBar title="판매 중 목록" size={24} bordered />
      <List dataSoruce={items} renderItem={SellingItem} />
    </section>
  );
}

function SellingItem(
  item: Selling | any,
  index: number,
  onClick?: React.MouseEventHandler<HTMLElement>,
) {
  const { auctionId, titleImageUrl, auctionTitle, endTime, currentPrice } =
    item;
  const dispatch = useRootDispatch();
  const purchaseHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };
  const deleteHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteWish(auctionId));
  };
  return (
    <StyledItem item={item}>
      <Link
        to={`/auction/${auctionId}`}
        css={css`
          display: flex;
          width: 100%;
        `}
      >
        <ProductInfo>
          <ProductBox>
            <ProductImageBox>
              <ProductImage src={titleImageUrl} alt="이미지" />
            </ProductImageBox>
          </ProductBox>
          <ProductDetail>
            <ProductDetailCell>
              <Text size={14} color="black2" strong>
                {auctionTitle}
              </Text>
              <Text size={14} color="black2">
                {`마감: ${datetimeToLabel(endTime)}`}
              </Text>
            </ProductDetailCell>
          </ProductDetail>
        </ProductInfo>
        <BuyInfo>
          <div>
            <PurchaseLink
              href={`/payment/${auctionId}`}
              onClick={purchaseHandler}
            >
              <Text strong color="white2">
                구매
              </Text>
              <Price>
                <Text size={15} color="white2" strong inline>
                  {priceComma(currentPrice)}
                </Text>
                <Text size={15} color="white2" strong inline>
                  원
                </Text>
                <Text color="white2" size={13}>
                  즉시 구매가
                </Text>
              </Price>
            </PurchaseLink>
          </div>
        </BuyInfo>
      </Link>
    </StyledItem>
  );
}

const StyledItem = styled(Item)`
  display: flex;
  align-items: center;
  padding: 20px 0 19px;
  border-bottom: 1px solid #ebebeb;
`;

const ProductInfo = styled.div`
  margin-right: 30px;
  display: flex;
`;
const BuyInfo = styled.div`
  margin-left: auto;
  flex-direction: column;
  flex-shrink: 0;
  text-align: right;
`;
const ProductBox = styled.div`
  flex: none;
  width: 80px;
  height: 80px;
`;
const MainTitleBar = styled(TitleBar)`
  padding-bottom: 16px;
`;
const ProductImageBox = styled.div`
  overflow: hidden;
  position: relative;
  padding-top: 100%;
  border-radius: 8px;
  background-color: rgb(235, 240, 245);
`;
const ProductImage = styled.img`
  width: 81.5%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ProductDetail = styled.div`
  margin-left: 13px;
  text-align: left;
  display: flex;
  flex-direction: column;
`;
const ProductDetailCell = styled.div`
  p {
    margin-top: 1.5rem;
  }
`;
const PurchaseLink = styled(LinkButton)`
  background-color: ${theme.color.orange};
  color: ${theme.color.white};
  font-weight: ${theme.color.bold};
  display: inline-flex;
  align-items: center;
  width: 16.4rem;
  height: 6rem;
`;
const Price = styled.div`
  margin-left: 1.5rem;
  line-height: 1.8rem;
`;
const DeleteLink = styled.a`
  margin-top: 6px;
  padding: 0 3px;
  display: inline-flex;
  font-size: 12px;
  letter-spacing: -0.06px;
  color: rgba(34, 34, 34, 0.8);
  text-decoration: underline;
`;
export default MySelling;
