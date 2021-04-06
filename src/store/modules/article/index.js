import articleApi from '@/api/article';
import mutationTypes from './mutation-types';
import actionTypes from './action-types';

const articleModule = {
  state: {
    data: null,
    isLoading: false,
    error: null,
  },
  mutations: {
    [mutationTypes.getArticleStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationTypes.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationTypes.getArticleFailure](state) {
      state.isLoading = false;
    },
    [mutationTypes.deleteArticleStart]() {},
    [mutationTypes.deleteArticleSuccess]() {},
    [mutationTypes.deleteArticleFailure]() {},
  },
  actions: {
    [actionTypes.getArticle]({ commit }, { slug }) {
      return new Promise(resolve => {
        commit(mutationTypes.getArticleStart, slug);
        articleApi.getArticle(slug)
          .then(article => {
            commit(mutationTypes.getArticleSuccess, article);
            resolve(article);
          })
          .catch(() => {
            commit(mutationTypes.getArticleFailure);
          });
      });
    },
    [actionTypes.deleteArticle]({ commit }, { slug }) {
      return new Promise(resolve => {
        commit(mutationTypes.deleteArticleStart, slug);
        articleApi.deleteArticle(slug)
          .then(() => {
            commit(mutationTypes.deleteArticleSuccess);
            resolve();
          })
          .catch(() => {
            commit(mutationTypes.deleteArticleFailure);
          });
      });
    },
  },
};

export default articleModule;
