<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" :alt="userProfile.username">
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>

            <div>
              <follow
                :is-following="userProfile.following"
                :user-profile-slug="userProfileSlug"
                :user-profile-username="userProfile.username"
              />

              <router-link
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >Edit Profile Settings</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{name: 'userProfile', params: {slug: userProfile.username}}"
                  class="nav-link"
                  :class="{ 'active': routeName === 'userProfile' }"
                >My Post</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{name: 'userProfileFavorites', params: {slug: userProfile.username}}"
                  class="nav-link"
                  :class="{ 'active': routeName === 'userProfileFavorites' }"
                >Favorite Posts</router-link>
              </li>
            </ul>
          </div>

          <feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import userProfileActionTypes from '@/store/modules/user-profile/action-types';
import authGetterTypes from '@/store/modules/auth/getter-types';

import Feed from '@/components/Feed.vue';
import Follow from '@/components/Follow.vue';

export default {
  name: 'userProfile',
  components: {
    Feed,
    Follow,
  },
  mounted() {
    this.getUserProfile();
  },
  computed: {
    ...mapState({
      isLoading: state => state.userProfileModule.isLoading,
      error: state => state.userProfileModule.error,
      userProfile: state => state.userProfileModule.data,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false;
      }

      return this.currentUser.username === this.userProfile.username;
    },
    apiUrl() {
      const isInFavorites = this.$route.path.includes('favorites');

      return isInFavorites
        ? `/articles?favorited=${this.userProfileSlug}` : `/articles?author=${this.userProfileSlug}`;
    },
    userProfileSlug() {
      return this.$route.params.slug;
    },
    routeName() {
      return this.$route.name;
    },
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile();
    },
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, { slug: this.userProfileSlug });
    },
  },
};
</script>
