import { defaultInstance } from 'api';
import { ACCESS_TOKEN } from 'constants/headers';
import PayCompleteForm from 'types/Form/PayCompleteForm';
import PayReadyForm from 'types/Form/PayReadyForm';

const api = defaultInstance();
// api.defaults.headers.common.Authorization = ACCESS_TOKEN;
api.defaults.headers.common.Authorization =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxcmVzMzQwM0Bzc2FmeS5jb20iLCJpc3MiOiJnYW5hZGFtYXJrZXQuY29tIiwiZXhwIjoxNjUzMDA3NzEyLCJpYXQiOjE2NTI5MjEzMTJ9.ilRa5V41YQlUO696U6X5GSTJv4T3lJdAB42QG059FSzy2FtYy38A-bqU5CYBDqVaPS2pFUe3y4l_gIGDRFA0cA';

function PayReady(payload: PayReadyForm) {
  return api.post('/payment', payload);
}

function PayComplete(payload: PayCompleteForm) {
  return api.put('/payment/kakaoPaySuccess', payload);
}

const payAPI = {
  PayReady,
  PayComplete,
};

export default payAPI;
