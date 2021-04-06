import authMutationTypes from '@/store/modules/auth/mutation-types';

const settingsModule = {
  state: {
    isSubmitting: false,
    validationErrors: null,
  },
  mutations: {
    [authMutationTypes.updateCurrentUserStart](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [authMutationTypes.updateCurrentUserSuccess](state) {
      state.isSubmitting = false;
    },
    [authMutationTypes.updateCurrentUserFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
};

export default settingsModule;
