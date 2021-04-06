import userProfileApi from '@/api/user-profile';
import mutationTypes from './mutation-types';
import actionTypes from './action-types';

const userProfileModule = {
  state: {
    data: null,
    isLoading: false,
    error: null,
  },
  mutations: {
    [mutationTypes.getUserProfileStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationTypes.getUserProfileSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationTypes.getUserProfileFailure](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionTypes.getUserProfile]({ commit }, { slug }) {
      return new Promise(resolve => {
        commit(mutationTypes.getUserProfileStart);
        userProfileApi.getUserProfile(slug)
          .then(userProfile => {
            commit(mutationTypes.getUserProfileSuccess, userProfile);
            resolve(userProfile);
          })
          .catch(() => {
            commit(mutationTypes.getUserProfileFailure);
          });
      });
    },
  },
  getters: {},
};

export default userProfileModule;
