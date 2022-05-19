import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Text } from 'components/atoms/changgun';
import {
  AuctionHeader,
  AuctionPrice,
  AuctionProductInfo,
  AuctionTransactionsHeader,
  AuctionGraph,
} from 'components/molecules/changgun';
import { DataType } from 'pages/AuctionPageData';
import auctionAPI from 'api/auctionAPI';
import { ReactComponent as LikedIcon } from '../../../assets/svgs/heart.svg';
import { dateDiffInHours } from '../../../functions';

interface AuctionDetailProps {
  data: DataType;
}

const MS_IN_HOUR = 60 * 60 * 1000;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const ButtonInner = styled.div`
  display: flex;
  column-gap: 1rem;
  justify-content: center;
  align-items: center;
`;

function AuctionDetail({ data }: AuctionDetailProps) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(data.auction.isLiked);
  const [price, setPrice] = useState(0);
  const { startPrice, startTime, cycle, depreciation, product } = data.auction;
  const { productModel, releaseDate, releasePrice } = product;
  const [timeZone, setTimeZone] = useState<'1개월' | '3개월' | '6개월' | '1년'>(
    '1개월',
  );

  const [timer, setTimer] = useState<number>();

  // 완료된 사이클 계산 함수
  const currentCycle = (startDateParam: Date, cycleParam: number) => {
    const currentTime = new Date();
    return dateDiffInHours(currentTime, startDateParam) / cycleParam;
  };

  const handleSetTimeZone = (value: '1개월' | '3개월' | '6개월' | '1년') => {
    setTimeZone(value);
  };

  const handleLike = () => {
    if (isLiked) {
      auctionAPI
        .unlikeAuction(data.auction.auctionId)
        .then(() => {
          setIsLiked((previous) => !previous);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      auctionAPI
        .likeAuction(data.auction.auctionId)
        .then(() => {
          setIsLiked((previous) => !previous);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  useEffect(() => {
    // 타이머를 이용하여 price 설정
    const today = new Date();
    setPrice(
      startPrice -
        dateDiffInHours(today, new Date(startTime)) * cycle * depreciation,
    );

    const nextCycleTime =
      (currentCycle(new Date(startTime), cycle) + 1) * cycle * MS_IN_HOUR +
      Number(new Date(startTime));

    setTimer(Math.floor((Number(nextCycleTime) - Number(today)) / 1000));
  }, [cycle, depreciation, startPrice, startTime]);

  return (
    <Wrapper>
      <AuctionHeader
        brandName={data.auction.product.productBrand}
        productName={data.auction.product.productName}
        price={price}
      />
      <Main>
        <ButtonGroup>
          <Button
            onClick={() => {
              navigate(`/payment/${data.auction.auctionId}`, {
                state: { paymentPrice: price },
              });
            }}
            backgroundColor="red"
          >
            <ButtonInner>
              <Text bold color="light">
                구매하기
              </Text>
            </ButtonInner>
          </Button>
          <Button
            onClick={() => {
              handleLike();
            }}
            backgroundColor={isLiked ? '#333' : '#999'}
          >
            <ButtonInner>
              <LikedIcon
                fill={isLiked ? 'red' : '#fff'}
                width="2rem"
                height="2rem"
              />
              <Text bold color="light">
                관심상품
              </Text>
            </ButtonInner>
          </Button>
        </ButtonGroup>
        {timer && (
          <AuctionPrice
            currentPrice={price}
            depreciation={depreciation}
            initialTimer={timer}
          />
        )}
        <AuctionProductInfo
          productModel={productModel}
          releaseDate={new Date(releaseDate)}
          releasePrice={releasePrice}
        />
        <AuctionTransactionsHeader
          timeZone={timeZone}
          handleSetTimeZone={handleSetTimeZone}
        />
        <AuctionGraph timeZone={timeZone} />
      </Main>
    </Wrapper>
  );
}

export { AuctionDetail };
