<template>
  <div>
    <loading v-if="isLoading" />

    <error-message v-if="error" :message="'foo is broken'"/>

    <div v-if="feed">
      <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
        <div class="article-meta">
          <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
            <img :src="article.author.image" :alt="article.author.username">
          </router-link>

          <div class="info">
            <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }" class="author">
              {{ article.author.username }}
            </router-link>

            <span class="date">{{ article.createdAt }}</span>
          </div>

          <div class="pull-xs-right">
            <add-to-favorites
              :is-favorite="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>

        <router-link :to="{name: 'article', params: { slug: article.slug }}" class="preview-link">
          <h1>{{ article.title }}</h1>

          <p>{{ article.description }}</p>

          <span>Read more</span>

          <tag-list :tags="article.tagList"/>
        </router-link>
      </div>

      <pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import actionTypes from '@/store/modules/feed/action-types';
import { limit } from '@/helpers/vars';
import { stringify, parseUrl } from 'query-string';

import Loading from '@/components/Loading.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Pagination from '@/components/Pagination.vue';
import TagList from '@/components/TagList.vue';
import AddToFavorites from '@/components/AddToFavorites.vue';

export default {
  name: 'Feed',
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  components: {
    Loading,
    ErrorMessage,
    Pagination,
    TagList,
    AddToFavorites,
  },
  data() {
    return {
      limit,
    };
  },
  mounted() {
    this.fetchFeed();
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
    apiUrl() {
      this.fetchFeed();
    },
  },
  computed: {
    ...mapState({
      isLoading: state => state.feedModule.isLoading,
      feed: state => state.feedModule.data,
      error: state => state.feedModule.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
    },
  },
};
</script>
