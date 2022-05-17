import { defaultInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/headers';

const api = defaultInstance();
api.defaults.headers.common.Authorization = ACCESS_TOKEN;

// 관심상품 등록

function likeAuction(auctionId: number) {
  return api.post('/like', auctionId);
}

function unlikeAuction(param: number) {
  return api.delete(`/like/${param}`);
}

function justDropAuction() {
  return api.get('/auction/recent');
}

const auctionAPI = {
  likeAuction,
  unlikeAuction,
  justDropAuction,
};

export default auctionAPI;
