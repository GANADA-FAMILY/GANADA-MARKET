import Product from './Product';
import ProductHistory from './ProductHistory';

interface Auction {
  autionId: number;
  auctionImgs: Array<string>;
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
  productHistory: ProductHistory;
  seller: string;
  product: Product;
}

export default Auction;
