import userAPI from 'api/userAPI';
import Address from './Address';
import User from './User';
import Product from './Product';
import Bank from './Bank';
import Auction from './Auction';
import Wish from './Wish';
import Selling from './Selling';
import SalesHistory from './SalesHistory';
import OrderHistory from './OrderHIstory';
import ProductHistory from './ProductHistory';

type UserAPI =
  | Address
  | User
  | Product
  | Bank
  | Auction
  | Wish
  | Selling
  | ProductHistory
  | SalesHistory
  | OrderHistory;

export default UserAPI;
export type {
  Address,
  User,
  Product,
  Bank,
  Auction,
  Wish,
  Selling,
  SalesHistory,
  OrderHistory,
  ProductHistory,
};
