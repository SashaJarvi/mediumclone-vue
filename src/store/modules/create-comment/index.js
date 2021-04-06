import commentsApi from '@/api/comments';

import mutationTypes from './mutation-types';
import actionTypes from './action-types';

const createCommentModule = {
  state: () => ({
    isSubmitting: false,
    validationErrors: null,
  }),
  mutations: {
    [mutationTypes.createCommentStart](state) {
      state.isSubmitting = true;
    },
    [mutationTypes.createCommentSuccess](state) {
      state.isSubmitting = false;
    },
    [mutationTypes.createCommentFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
  actions: {
    [actionTypes.createComment]({ commit }, { slug, commentInput }) {
      return new Promise(resolve => {
        commit(mutationTypes.createCommentStart);

        commentsApi.createComment(slug, commentInput).then(comment => {
          commit(mutationTypes.createCommentSuccess, comment);
          resolve(comment);
        }).catch(result => {
          commit(mutationTypes.createCommentFailure, result.response.data.errors);
        });
      });
    },
  },
};

export default createCommentModule;
