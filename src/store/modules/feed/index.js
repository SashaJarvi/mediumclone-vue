import feedApi from '@/api/feed';
import mutationTypes from './mutation-types';
import actionTypes from './action-types';

const feedModule = {
  state: {
    data: null,
    isLoading: false,
    error: null,
  },
  mutations: {
    [mutationTypes.getFeedStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationTypes.getFeedSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationTypes.getFeedFailure](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionTypes.getFeed]({ commit }, { apiUrl }) {
      return new Promise(resolve => {
        commit(mutationTypes.getFeedStart);
        feedApi.getFeed(apiUrl)
          .then(response => {
            commit(mutationTypes.getFeedSuccess, response.data);
            resolve(response.data);
          })
          .catch(() => {
            commit(mutationTypes.getFeedFailure);
          });
      });
    },
  },
  getters: {},
};

export default feedModule;
