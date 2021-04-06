import axios from './axios';

const getPopularTags = () => axios.get('/tags').then(response => response.data.tags);

export default {
  getPopularTags,
};
