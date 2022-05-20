import { API_URL } from 'constants/url';
import { URLSearchParams } from 'url';
import { defaultInstance } from 'api';
import { AxiosError } from 'axios';
import { ACCESS_TOKEN } from 'constants/headers';
import Auction from '../types/Entity/ShopAPI/Auction';

const axios = defaultInstance();
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Authorization = ACCESS_TOKEN;
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
