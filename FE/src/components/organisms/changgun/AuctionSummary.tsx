import styled from 'styled-components';
import { FlexibleImage, Text } from 'components/atoms/changgun';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #efefef;
  padding-right: 2rem;
  margin-right: 2rem;
`;

const ImgContainer = styled.div``;

interface ProductImgTextProps {
  imgSrc: string;
  text: string;
}

function AuctionSummary({ imgSrc, text }: ProductImgTextProps) {
  return (
    <Wrapper>
      <ImgContainer>
        <FlexibleImage src={imgSrc} />
      </ImgContainer>
      <Text styles="line-height: 3rem" size="large">
        {text}
      </Text>
    </Wrapper>
  );
}

export { AuctionSummary };
