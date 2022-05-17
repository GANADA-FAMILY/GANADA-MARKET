interface AuctionList {
  auctionId: number;
  titleImageUrl: string;
  product: {
    productName: string;
    productBrand: string;
  };
  auctionTitle: string;
  seller: string;
  startTime: string;
  startPrice: number;
  cycle: string;
  depreciation: number;
  endTime: string;
}

export default AuctionList;
