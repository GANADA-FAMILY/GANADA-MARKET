import { defaultInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/headers';

const api = defaultInstance();
api.defaults.headers.common.Authorization = ACCESS_TOKEN;

// 관심상품 등록

function likeAuction(auctionId: number) {
  return api.post('/auction/like', { auctionId });
}

function unlikeAuction(param: number) {
  return api.delete(`/auction/like/${param}`);
}

function justDropAuction() {
  return api.get('/auction', {
    params: { page: 0 },
  });
}

function detailAuction(auctionId: string | undefined) {
  return api.get(`auction/${auctionId}`);
}

const auctionAPI = {
  likeAuction,
  unlikeAuction,
  justDropAuction,
  detailAuction,
};

export default auctionAPI;
