import { API_URL } from 'constants/url';
import { URLSearchParams } from 'url';
import { defaultInstance } from 'api';
import { AxiosError } from 'axios';
import Auction from '../types/Entity/ShopAPI/Auction';

const token =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcml0ZTEyMzQ1QG5hdmVyLmNvbSIsImlzcyI6ImdhbmFkYW1hcmtldC5jb20iLCJleHAiOjE2NTMwNTcxNDcsImlhdCI6MTY1Mjk3MDc0N30.4qyW9d9OePqRD-t4Cd0FmdVQcprlv1nVT6CSi5zpf_sbxYcFJvqkNzDGGjrqvUpPyMcwQe8CaJw4GN0lJsXLPA';

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
interface queryType {
  page: string;
  size: string;
  save?: string;
  brand?: string;
  sort?: string;
  model?: string;
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

export async function getPageList(
  query: queryType,
  product: string | undefined,
): Promise<resolveData> {
  try {
    return await axios.get(`/auction/${product}`, {
      params: {
        ...query,
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

export async function getFilterAPI(categoryLargeId: number) {
  try {
    // 4번 스마트폰 5번 이어폰
    return await axios.get(`/product-get/category-large/${categoryLargeId}`);
  } catch (err) {
    const errors = err as Error | AxiosError;
    throw new Error(errors.message);
  }
}
