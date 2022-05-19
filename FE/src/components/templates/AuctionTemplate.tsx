import styled from 'styled-components';
import { AuctionDetail, AuctionSummary } from 'components/organisms/changgun';
import { DataType } from 'pages/AuctionPageData';

interface AuctionTemplateProps {
  data: DataType;
}

const Wrapper = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

function AuctionTemplate({ data }: AuctionTemplateProps) {
  return (
    <Wrapper>
      <AuctionSummary
        imgSrc={data.auction.auctionImgs[0]}
        text={data.auction.auctionDesc}
      />
      <AuctionDetail data={data} />
    </Wrapper>
  );
}

export { AuctionTemplate };
