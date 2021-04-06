import popularTagsApi from '@/api/popular-tags';
import mutationTypes from './mutation-types';
import actionTypes from './action-types';

const popularTagsModule = {
  state: {
    data: null,
    isLoading: false,
    error: null,
  },
  mutations: {
    [mutationTypes.getPopularTagsStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationTypes.getPopularTagsSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationTypes.getPopularTagsFailure](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionTypes.getPopularTags]({ commit }) {
      return new Promise((resolve) => {
        commit(mutationTypes.getPopularTagsStart);
        popularTagsApi.getPopularTags()
          .then((tags) => {
            commit(mutationTypes.getPopularTagsSuccess, tags);
            resolve(tags);
          })
          .catch(() => {
            commit(mutationTypes.getPopularTagsFailure);
          });
      });
    },
  },
  getters: {},
};

export default popularTagsModule;
