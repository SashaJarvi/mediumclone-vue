import axios from './axios';

const getArticle = slug => axios.get(`/articles/${slug}`).then(response => response.data.article);

const deleteArticle = slug => axios.delete(`/articles/${slug}`);

const createArticle = articleInput => axios.post('/articles', { article: articleInput })
  .then(response => response.data.article);

const updateArticle = (slug, articleInput) => axios.put(`/articles/${slug}`, articleInput)
  .then(response => response.data.article);

export default {
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle,
};
