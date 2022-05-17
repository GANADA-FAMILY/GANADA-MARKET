interface Auction {
  product: {
    productBrand: string;
    productName: string;
    releaseDate: string;
    recentPrice: number;
  };
  productHistory: [];
  seller: string;
  auctionId: number;
  auctionImgs: string[];
  auctionDesc: string;
  startTime: string;
  startPrice: number;
  cycle: string;
  depreciation: number;
  endTime: string;
  auctionStatus: boolean;
  isLiked: boolean;
  isMine: boolean;
  likeCnt: number;
}

export default Auction;
