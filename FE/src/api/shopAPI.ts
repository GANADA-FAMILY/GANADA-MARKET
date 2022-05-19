import { API_URL } from 'constants/url';
import { URLSearchParams } from 'url';
import { defaultInstance } from 'api';
import { AxiosError } from 'axios';
import Auction from '../types/Entity/ShopAPI/Auction';

const token =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcml0ZTEyMzQ1QG5hdmVyLmNvbSIsImlzcyI6ImdhbmFkYW1hcmtldC5jb20iLCJleHAiOjE2NTI5NzA1NjQsImlhdCI6MTY1Mjg4NDE2NH0.yUdQqkWF-ZArb_vITxapG6CMw1Gu15jtHycCQG1VZBcqR_pSniZw6quMSsQi26S8VtqlrsdQPSHX6tMgto8mPA';

const axios = defaultInstance();
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Authorization = token;
interface resolveData {
  data: {
    auctionList: Auction[];
    auctionCnt: number;
    last: boolean;
  };
}

export async function getList(
  product: string | undefined,
  query: URLSearchParams,
): Promise<resolveData> {
  const currentQueries = Object.fromEntries(query);
  try {
    return await axios.get(`/auction/${product}`, {
      params: {
        ...currentQueries,
      },
    });
  } catch (err) {
    const errors = err as Error | AxiosError;
    throw new Error(errors.message);
  }
}

export async function likeAPI(auctionId: number | undefined) {
  try {
    return await axios.post(`/auction/like/`, {
      auctionId,
    });
  } catch (err) {
    const errors = err as Error | AxiosError;
    throw new Error(errors.message);
  }
}

export async function disLikeAPI(auctionId: number | undefined) {
  try {
    return await axios.delete(`/auction/like/${auctionId}`);
  } catch (err) {
    const errors = err as Error | AxiosError;
    throw new Error(errors.message);
  }
}
