<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
            <img :src="article.author.image" :alt="article.author.username">

            <div class="info">{{ article.author.username }}
              <span class="date">{{ article.createdAt }}</span>
            </div>
          </router-link>

          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit" />

              Edit Article
            </router-link>

            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />

              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>

    <div class="container page">
      <loading v-if="isLoading"></loading>

      <error-message v-if="error" :message="error" />

      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>

          <tag-list :tags="article.tagList"/>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <comments :article-url="this.$route.params.slug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import TagList from '@/components/TagList.vue';
import Comments from '@/components/Comments.vue';

import articleActionTypes from '@/store/modules/article/action-types';
import authGetterTypes from '@/store/modules/auth/getter-types';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Article',
  components: {
    Loading,
    ErrorMessage,
    TagList,
    Comments,
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, { slug: this.$route.params.slug });
  },
  computed: {
    ...mapState({
      isLoading: state => state.articleModule.isLoading,
      error: state => state.articleModule.error,
      article: state => state.articleModule.data,
      comments: state => state.commentsModule.data,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }

      return this.currentUser.username === this.article.author.username;
    },
  },
  methods: {
    deleteArticle() {
      this.$store.dispatch(articleActionTypes.deleteArticle, { slug: this.$route.params.slug })
        .then(() => {
          this.$router.push({ name: 'globalFeed' });
        });
    },
  },
};
</script>
