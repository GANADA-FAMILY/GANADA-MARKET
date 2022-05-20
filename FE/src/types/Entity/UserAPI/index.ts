import userAPI from 'api/userAPI';
import Address from './Address';
import User from './User';
import Product from './Product';
import Bank from './Bank';
import ProductHistory from './ProductHistory';
import Auction from './Auction';
import Wish from './Wish';
import Sales from './Sales';
import Selling from './Selling';
import SalesHistory from './SalesHistory';
import OrderHistory from './OrderHIstory';

type UserAPI =
  | Address
  | User
  | Product
  | Bank
  | Auction
  | ProductHistory
  | Wish
  | Selling
  | Sales
  | SalesHistory
  | OrderHistory;

export default UserAPI;
export type {
  Address,
  User,
  Product,
  Bank,
  Auction,
  ProductHistory,
  Wish,
  Selling,
  Sales,
  SalesHistory,
  OrderHistory,
};
