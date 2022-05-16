import Address from './Address';
import User from './User';
import Product from './Product';
import Bank from './Bank';
import ProductHistory from './ProductHistory';
import Auction from './Auction';

type Entity = Address | User | Product | Bank | Auction | ProductHistory;

export default Entity;
export type { Address, User, Product, Bank, ProductHistory, Auction };
