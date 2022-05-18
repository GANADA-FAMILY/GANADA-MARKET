import { defaultInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/headers';
import PayCompleteForm from 'types/Form/PayCompleteForm';
import PayReadyForm from 'types/Form/PayReadyForm';

const api = defaultInstance();
// api.defaults.headers.common.Authorization = ACCESS_TOKEN;
api.defaults.headers.common.Authorization =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxcmVzMzQwM0Bzc2FmeS5jb20iLCJpc3MiOiJnYW5hZGFtYXJrZXQuY29tIiwiZXhwIjoxNjUyOTcyNDU2LCJpYXQiOjE2NTI4ODYwNTZ9.0JUakXnNkyrrS686zDu_qlfc6AukZ4hmcnRAFKOgXBBLPuoTRLl1ewo35KlN0BEF1qJ6gUV_mgFOVKm_6XU0jg';

function PayReady(payload: PayReadyForm) {
  return api.post('/payment', payload);
}

function PayComplete(payload: PayCompleteForm) {
  return api.put('/kakaopaysuccess', payload);
}

const payAPI = {
  PayReady,
  PayComplete,
};

export default payAPI;
