import axios from './axios';

const getFeed = apiUrl => axios.get(apiUrl);

export default {
  getFeed,
};
