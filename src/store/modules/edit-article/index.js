import articleApi from '@/api/article';

import mutationTypes from './mutation-types';
import actionTypes from './action-types';

const editArticleModule = {
  state: () => ({
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
    article: null,
  }),
  mutations: {
    [mutationTypes.updateArticleStart](state) {
      state.isSubmitting = true;
    },
    [mutationTypes.updateArticleSuccess](state) {
      state.isSubmitting = false;
    },
    [mutationTypes.updateArticleFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    [mutationTypes.getArticleStart](state) {
      state.isLoading = true;
    },
    [mutationTypes.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.article = payload;
    },
    [mutationTypes.getArticleFailure](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionTypes.getArticle]({ commit }, { slug }) {
      return new Promise(resolve => {
        commit(mutationTypes.getArticleStart);

        articleApi.getArticle(slug)
          .then(article => {
            commit(mutationTypes.getArticleSuccess, article);
            resolve(article);
          })
          .catch(() => {
            commit(mutationTypes.updateArticleFailure);
          });
      });
    },
    [actionTypes.updateArticle]({ commit }, { slug, articleInput }) {
      return new Promise(resolve => {
        commit(mutationTypes.updateArticleStart);

        articleApi.updateArticle(slug, articleInput)
          .then(article => {
            commit(mutationTypes.updateArticleSuccess, article);
            resolve(article);
          })
          .catch(result => {
            commit(mutationTypes.updateArticleFailure, result.response.data.errors);
          });
      });
    },
  },
};

export default editArticleModule;
