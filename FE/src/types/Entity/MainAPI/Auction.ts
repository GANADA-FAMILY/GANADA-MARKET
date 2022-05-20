interface Auction {
  auctionId: number;
  auctionImgs: string[];
  product: {
    productBrand: string;
    productName: string;
    releaseDate: string;
    recentPrice: number;
  };
  productHistory: string[];
  auctionTitle: string;
  auctionDesc: string;
  seller: string;
  startTime: string;
  startPrice: number;
  cycle: number;
  depreciation: number;
  endTime: string;
  auctionStatus: boolean;
  isLiked: boolean;
  isMine: boolean;
  likeCnt: number;
}

export default Auction;
