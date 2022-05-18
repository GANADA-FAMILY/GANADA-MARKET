interface ProductHistory {
  auctionId: number;
  productName: string;
  productBrand: string;
  tradeDate: string;
  price: number;
  status: 0 | 1 | 2 | 3;
  courier: string;
  trackingNum: string;
}

export default ProductHistory;
