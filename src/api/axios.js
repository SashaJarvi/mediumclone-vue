import axios from 'axios';
import { getItem } from '@/helpers/persistance-storage';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';
axios.interceptors.request.use(config => {
  const token = getItem('accessToken');

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token ? `Token ${token}` : '';
  return config;
});

export default axios;
