import Vue from 'vue';
import VueRouter from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: () => import('@/views/YourFeed.vue'),
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: () => import('@/views/TagFeed.vue'),
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: () => import('@/views/CreateArticle.vue'),
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: () => import('@/views/Article.vue'),
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: () => import('@/views/EditArticle'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings'),
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: () => import('@/views/UserProfile'),
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: () => import('@/views/UserProfile'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
