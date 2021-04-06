import subscribeApi from '@/api/subscribe';

import mutationTypes from '@/store/modules/subscribe/mutation-types';
import actionTypes from '@/store/modules/subscribe/action-types';

const subscribeModule = {
  mutations: {
    [mutationTypes.subscribeStart]() {},
    [mutationTypes.subscribeSuccess]() {},
    [mutationTypes.subscribeFailure]() {},
  },
  actions: {
    [actionTypes.subscribe]({ commit }, { slug, isSubscribed }) {
      return new Promise(resolve => {
        commit(mutationTypes.subscribeStart);

        const promise = isSubscribed ? subscribeApi.unsubscribe(slug) : subscribeApi.subscribe(slug);

        promise
          .then(profile => {
            commit(mutationTypes.subscribeSuccess, profile);
            resolve(profile);
          })
          .catch(() => commit(mutationTypes.subscribeFailure));
      });
    },
  },
};

export default subscribeModule;
