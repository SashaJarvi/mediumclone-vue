import commentsApi from '@/api/comments';
import mutationTypes from './mutation-types';
import actionTypes from './action-types';

const commentsModule = {
  state: {
    data: null,
    isLoading: false,
    error: null,
  },
  mutations: {
    [mutationTypes.getCommentsStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationTypes.getCommentsSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationTypes.getCommentsFailure](state) {
      state.isLoading = false;
    },
    [mutationTypes.deleteCommentStart]() {},
    [mutationTypes.deleteCommentSuccess]() {},
    [mutationTypes.deleteCommentFailure]() {},
  },
  actions: {
    [actionTypes.getComments]({ commit }, { slug }) {
      return new Promise(resolve => {
        commit(mutationTypes.getCommentsStart, slug);
        commentsApi.getComments(slug)
          .then(comments => {
            commit(mutationTypes.getCommentsSuccess, comments);
            resolve(comments);
          })
          .catch(() => {
            commit(mutationTypes.getArticleFailure);
          });
      });
    },
    [actionTypes.deleteComment]({ commit }, { slug, commentId }) {
      return new Promise(resolve => {
        commit(mutationTypes.deleteCommentStart);
        commentsApi.deleteComment(slug, commentId)
          .then(() => {
            commit(mutationTypes.deleteCommentSuccess);
            resolve();
          })
          .catch(() => {
            commit(mutationTypes.deleteCommentFailure);
          });
      });
    },
  },
};

export default commentsModule;
