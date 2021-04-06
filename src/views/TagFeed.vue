<template>
  <div class="home-page">
    <banner />

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggler :tag-name="tagName" />

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
import Feed from '@/components/Feed.vue';
import FeedToggler from '@/components/FeedToggler.vue';
import PopularTags from '@/components/PopularTags.vue';

export default {
  name: 'TagFeed',
  components: {
    Banner,
    Feed,
    FeedToggler,
    PopularTags,
  },
  computed: {
    tagName() {
      return this.$route.params.slug;
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`;
    },
  },
};
</script>
