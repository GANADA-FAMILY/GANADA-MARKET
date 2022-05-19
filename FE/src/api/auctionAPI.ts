import { defaultInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/headers';

const api = defaultInstance();
// api.defaults.headers.common.Authorization = ACCESS_TOKEN;
api.defaults.headers.common.Authorization =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxcmVzMzQwM0Bzc2FmeS5jb20iLCJpc3MiOiJnYW5hZGFtYXJrZXQuY29tIiwiZXhwIjoxNjUzMDA3NzEyLCJpYXQiOjE2NTI5MjEzMTJ9.ilRa5V41YQlUO696U6X5GSTJv4T3lJdAB42QG059FSzy2FtYy38A-bqU5CYBDqVaPS2pFUe3y4l_gIGDRFA0cA';
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
