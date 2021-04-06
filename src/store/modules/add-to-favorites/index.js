import addToFavoritesApi from '@/api/add-to-favorites';

import mutationTypes from '@/store/modules/add-to-favorites/mutation-types';
import actionTypes from '@/store/modules/add-to-favorites/action-types';

const addToFavoritesModule = {
  mutations: {
    [mutationTypes.addToFavoritesStart]() {},
    [mutationTypes.addToFavoritesSuccess]() {},
    [mutationTypes.addToFavoritesFailure]() {},
  },
  actions: {
    [actionTypes.addToFavorites]({ commit }, { slug, isFavorite }) {
      return new Promise(resolve => {
        commit(mutationTypes.addToFavoritesStart);

        const promise = isFavorite
          ? addToFavoritesApi.removeFromFavorites(slug) : addToFavoritesApi.addToFavorites(slug);

        promise
          .then(article => {
            commit(mutationTypes.addToFavoritesSuccess, article);
            resolve(article);
          })
          .catch(() => commit(mutationTypes.addToFavoritesFailure));
      });
    },
  },
};

export default addToFavoritesModule;
