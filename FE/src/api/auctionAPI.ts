import { defaultInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/headers';

const api = defaultInstance();
// api.defaults.headers.common.Authorization = ACCESS_TOKEN;
api.defaults.headers.common.Authorization =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxcmVzMzQwM0Bzc2FmeS5jb20iLCJpc3MiOiJnYW5hZGFtYXJrZXQuY29tIiwiZXhwIjoxNjUyOTcyNDU2LCJpYXQiOjE2NTI4ODYwNTZ9.0JUakXnNkyrrS686zDu_qlfc6AukZ4hmcnRAFKOgXBBLPuoTRLl1ewo35KlN0BEF1qJ6gUV_mgFOVKm_6XU0jg';
// 관심상품 등록

function likeAuction(auctionId: number) {
  return api.post('/auction/like', { auctionId });
}

function unlikeAuction(param: number) {
  return api.delete(`/auction/like/${param}`);
}

function justDropAuction() {
  return api.get('/auction/recent', {
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
