<template>
  <div class="home-page">
    <banner />

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggler />

          <feed :api-url="apiUrl" />
        </div>

        <div class="col-md-3">
          <popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue';
import FeedToggler from '@/components/FeedToggler.vue';
import Feed from '@/components/Feed.vue';
import PopularTags from '@/components/PopularTags.vue';

export default {
  name: 'YourFeed',
  components: {
    Banner,
    FeedToggler,
    PopularTags,
    Feed,
  },
  data() {
    return {
      apiUrl: '/articles/feed',
    };
  },
};
</script>
