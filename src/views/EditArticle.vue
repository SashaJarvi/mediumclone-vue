<template>
  <div>
    <loading v-if="isLoading" />

    <article-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import actionTypes from '@/store/modules/edit-article/action-types';

import Loading from '@/components/Loading.vue';
import ArticleForm from '@/components/ArticleForm.vue';

export default {
  name: 'EditArticle',
  components: {
    Loading,
    ArticleForm,
  },
  computed: {
    ...mapState({
      isLoading: state => state.editArticleModule.isLoading,
      isSubmitting: state => state.editArticleModule.isSubmitting,
      article: state => state.editArticleModule.article,
      validationErrors: state => state.editArticleModule.validationErrors,
    }),
    initialValues() {
      if (!this.article) {
        return null;
      }

      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, { slug: this.$route.params.slug });
  },
  methods: {
    onSubmit(articleInput) {
      const { slug } = this.$route.params;

      this.$store.dispatch(actionTypes.updateArticle, { slug, articleInput })
        .then(article => {
          this.$router.push({ name: 'article', params: { slug: article.slug } });
        });
    },
  },
};
</script>
