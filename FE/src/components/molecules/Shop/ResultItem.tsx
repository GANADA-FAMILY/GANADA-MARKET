import React from 'react';
import ImageTag from '../../atoms/Shop/ImageTag';
import FlexContainer from '../../layouts/Shop/FlexContainer';
import ImageData from '../../atoms/Shop/ImageData';
import Auction from '../../../types/Entity/ShopAPI/Auction';

interface PropType {
  idx: number;
  data: Auction;
  onLike: (auctionId: number, trigger: boolean) => void;
}

function ResultItem({ onLike, data, idx }: PropType) {
  const {
    titleImageUrl,
    auctionTitle,
    product,
    startPrice,
    startTime,
    cycle,
    liked,
    auctionId,
  } = data;
  const style = {
    flexDirection: 'column',
    height: '574.094px',
    width: '333px',
    marginBottom: '3.2rem',
    // eslint-disable-next-line no-nested-ternary
    justifySelf: `${idx % 3 === 1 ? 'start' : idx % 3 === 0 ? 'end' : ''}`,
  };
  return (
    <FlexContainer {...style}>
      <ImageTag url={titleImageUrl} />
      <ImageData
        product={product.productName}
        title={auctionTitle}
        brand={product.productBrand}
        model={product.productModel}
        auctionId={auctionId}
        isLike={liked}
        onLike={onLike}
      />
    </FlexContainer>
  );
}

export default ResultItem;
