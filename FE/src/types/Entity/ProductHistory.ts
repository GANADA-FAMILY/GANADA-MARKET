import Product from './Product';

interface ProductHistory {
  historyId: number;
  historyDate: string;
  price: number;
  product: Product;
}

export default ProductHistory;
