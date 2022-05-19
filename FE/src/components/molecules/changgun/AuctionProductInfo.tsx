import styled from 'styled-components';
import { Text } from 'components/atoms/changgun';

interface AuctionProductInfo {
  productModel: string;
  releaseDate: Date;
  releasePrice: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const InfoTable = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoTableColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

function AuctionProductInfo({
  productModel,
  releaseDate,
  releasePrice,
}: AuctionProductInfo) {
  const releasedYear = releaseDate.getFullYear();

  return (
    <Wrapper>
      <Text color="dark" size="large" bold>
        상품정보
      </Text>
      <InfoTable>
        <InfoTableColumn>
          <Text>모델번호</Text>
          <Text>{productModel}</Text>
        </InfoTableColumn>
        <InfoTableColumn>
          <Text>출시년도</Text>
          <Text>{`${releasedYear} `}</Text>
        </InfoTableColumn>
        <InfoTableColumn>
          <Text>출시가격</Text>
          <Text>{`${releasePrice}원`}</Text>
        </InfoTableColumn>
      </InfoTable>
    </Wrapper>
  );
}

export { AuctionProductInfo };
