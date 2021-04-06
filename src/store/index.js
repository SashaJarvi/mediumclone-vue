import Vue from 'vue';
import Vuex from 'vuex';

import authModule from '@/store/modules/auth';
import feedModule from '@/store/modules/feed';
import popularTagsModule from '@/store/modules/popular-tags';
import articleModule from '@/store/modules/article';
import createArticleModule from '@/store/modules/create-article';
import editArticleModule from '@/store/modules/edit-article';
import settingsModule from '@/store/modules/settings';
import addToFavoritesModule from '@/store/modules/add-to-favorites';
import subscribeModule from '@/store/modules/subscribe';
import userProfileModule from '@/store/modules/user-profile';
import commentsModule from '@/store/modules/comments';
import createCommentModule from '@/store/modules/create-comment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({}),
  mutations: {},
  actions: {},
  modules: {
    authModule,
    feedModule,
    popularTagsModule,
    articleModule,
    createArticleModule,
    editArticleModule,
    settingsModule,
    addToFavoritesModule,
    subscribeModule,
    userProfileModule,
    commentsModule,
    createCommentModule,
  },
});
