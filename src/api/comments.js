import axios from './axios';

const getComments = slug => axios.get(`/articles/${slug}/comments`).then(response => response.data.comments);

const createComment = (slug, commentInput) => axios.post(`/articles/${slug}/comments`, { comment: commentInput })
  .then(response => response.data.comment);

const deleteComment = (slug, commentId) => axios.delete(`/articles/${slug}/comments/${commentId}`);

export default {
  getComments,
  createComment,
  deleteComment,
};
