import Product from './Product';

interface Auction {
  auctionId: number;
  titleImageUrl: string;
  auctionImgs: Array<string>;
  auctionTitle: string;
  startTime: string;
  startPrice: number;
  cycle: number;
  depreciation: number;
  endTime: string;
  liked: boolean;
  seller: string;
  product: Product;
}

export default Auction;
