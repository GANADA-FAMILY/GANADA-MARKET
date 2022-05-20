import auctionAPI from 'api/auctionAPI';
import Auction from './Auction';
import AuctionList from './AuctionList';

type auctionAPI = Auction | AuctionList;

export default auctionAPI;
export type { Auction, AuctionList };
