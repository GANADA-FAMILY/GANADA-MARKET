import { defaultInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/headers';

const api = defaultInstance();
api.defaults.headers.common.Authorization = ACCESS_TOKEN;

// 관심상품 등록
function likeAuction(auctionId: number) {
  return api.post('/auction/like', { auctionId });
}

// 관심상품 삭제
function unlikeAuction(param: number) {
  return api.delete(`/auction/like/${param}`);
}

// 최근 올린 경매 리스트 조회
function justDropAuction() {
  if (ACCESS_TOKEN === 'Bearer null') {
    return api.get('/auction/recent', {
      headers: {
        Authorization: 'null',
      },
      params: {
        page: 0,
      },
    });
  }
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
