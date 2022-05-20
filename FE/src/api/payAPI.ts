import { defaultInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/headers';
import PayCompleteForm from 'types/Form/PayCompleteForm';
import PayReadyForm from 'types/Form/PayReadyForm';

const api = defaultInstance();
api.defaults.headers.common.Authorization = ACCESS_TOKEN;

// 결제 준비
function PayReady(payload: PayReadyForm) {
  return api.post('/payment', payload);
}

// 결제 완료
function PayComplete(payload: PayCompleteForm) {
  return api.put('/payment/kakaoPaySuccess', payload);
}

const payAPI = {
  PayReady,
  PayComplete,
};

export default payAPI;
