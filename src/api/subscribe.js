import axios from './axios';

const getUrl = slug => `/profiles/${slug}/follow`;

const subscribe = slug => {
  const url = getUrl(slug);
  return axios.post(url).then(response => response.data.profile);
};

const unsubscribe = slug => {
  const url = getUrl(slug);
  return axios.delete(url).then(response => response.data.profile);
};

export default {
  subscribe,
  unsubscribe,
};
