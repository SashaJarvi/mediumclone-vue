<template>
  <div>
    <loading v-if="isLoading" />

    <error-message v-if="error" :message="'foo is broken'"/>

    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>

      <div class="tag-list">
        <router-link
          :to="{ name: 'tag', params: { slug: popularTag } }"
          v-for="popularTag in popularTags"
          :key="popularTag"
          class="tag-default tag-pill"
        >{{ popularTag }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import actionTypes from '@/store/modules/popular-tags/action-types';

import Loading from '@/components/Loading.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'PopularTags',
  components: {
    Loading,
    ErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTagsModule.isLoading,
      error: state => state.popularTagsModule.error,
      popularTags: state => state.popularTagsModule.data,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags);
  },
};
</script>

<style scoped>

</style>
