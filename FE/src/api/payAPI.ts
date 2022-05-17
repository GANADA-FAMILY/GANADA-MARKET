import { defaultInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/headers';
import PayInfoForm from 'types/Form/PayInfoForm';

const api = defaultInstance();
api.defaults.headers.common.Authorization = ACCESS_TOKEN;

function kakaoPay(payload: any) {
  return api.post('/kakaopay', payload);
}

function PayInfo(payload: PayInfoForm) {
  return api.post('');
}

const payAPI = {
  kakaoPay,
  PayInfo,
};

export default payAPI;
