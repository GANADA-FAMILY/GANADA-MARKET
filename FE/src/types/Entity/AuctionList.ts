interface AuctionList {
  auctionId: number;
  auctionTitle: string;
  titleImageUrl: string;
  product: {
    productName: string;
    productBrand: string;
  };
  seller: string;
  startTime: string;
  startPrice: number;
  cycle: string;
  depreciation: number;
  endTime: string;
  liked: boolean;
}

export default AuctionList;
