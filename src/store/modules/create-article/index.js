import articleApi from '@/api/article';

import mutationTypes from './mutation-types';
import actionTypes from './action-types';

const createArticleModule = {
  state: () => ({
    isSubmitting: false,
    validationErrors: null,
  }),
  mutations: {
    [mutationTypes.createArticleStart](state) {
      state.isSubmitting = true;
    },
    [mutationTypes.createArticleSuccess](state) {
      state.isSubmitting = false;
    },
    [mutationTypes.createArticleFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
  actions: {
    [actionTypes.createArticle]({ commit }, { articleInput }) {
      return new Promise(resolve => {
        commit(mutationTypes.createArticleStart);

        articleApi.createArticle(articleInput).then(article => {
          commit(mutationTypes.createArticleSuccess, article);
          resolve(article);
        }).catch(result => {
          commit(mutationTypes.createArticleFailure, result.response.data.errors);
        });
      });
    },
  },
};

export default createArticleModule;
