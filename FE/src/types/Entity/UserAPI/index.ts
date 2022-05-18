import Address from './Address';
import User from './User';
import Product from './Product';
import Bank from './Bank';
import ProductHistory from './ProductHistory';
import Auction from './Auction';
import Wish from './Wish';

type UserAPI =
  | Address
  | User
  | Product
  | Bank
  | Auction
  | ProductHistory
  | Wish;

export default UserAPI;
export type { Address, User, Product, Bank, Auction, ProductHistory, Wish };
