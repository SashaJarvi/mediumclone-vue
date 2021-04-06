<template>
  <div>
    <comment-form
      v-if="currentUser"

      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      :author="currentUser"
      @commentSubmit="createComment"
    />

    <loading v-if="isLoading" />

    <error-message v-if="error" :message="error" />

    <div v-if="comments">
      <div class="card" v-for="(comment, index) in comments" :key="index">
        <div class="card-block">
          <p class="card-text">{{ comment.body }}</p>
        </div>

        <div class="card-footer">
          <router-link
            :to="{ name: 'userProfile', params: { slug: comment.author.username } }"
            class="comment-author"
          >
            <img :src="comment.author.image" :alt="comment.author.username" class="comment-author-img">

            <span class="comment-author">{{ comment.author.username }}</span>
          </router-link>

          <span class="date-posted">{{ comment.createdAt | date }}</span>

          <span v-if="isAuthor(comment.author)" class="mod-options" @click="deleteComment(comment.id)">
            <i class="ion-trash-a" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import createCommentActionTypes from '@/store/modules/create-comment/action-types';
import commentActionTypes from '@/store/modules/comments/action-types';

import Loading from '@/components/Loading.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import CommentForm from '@/components/CommentForm.vue';
import authGetterTypes from '@/store/modules/auth/getter-types';

export default {
  name: 'Comments',
  components: {
    Loading,
    ErrorMessage,
    CommentForm,
  },
  props: {
    articleUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      initialValues: {
        body: '',
      },
    };
  },
  mounted() {
    this.fetchComments();
  },
  computed: {
    ...mapState({
      isLoading: state => state.commentsModule.isLoading,
      error: state => state.commentsModule.error,
      comments: state => state.commentsModule.data,
      isSubmitting: state => state.createCommentModule.isSubmitting,
      validationErrors: state => state.createCommentModule.validationErrors,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
  },
  methods: {
    isAuthor(commentAuthor) {
      if (!this.currentUser) {
        return false;
      }

      return this.currentUser.username === commentAuthor.username;
    },
    fetchComments() {
      this.$store.dispatch(commentActionTypes.getComments, { slug: this.articleUrl });
    },
    createComment(commentInput) {
      this.$store.dispatch(createCommentActionTypes.createComment, { slug: this.articleUrl, commentInput })
        .then(() => this.fetchComments());
    },
    deleteComment(commentId) {
      this.$store.dispatch(commentActionTypes.deleteComment, { slug: this.articleUrl, commentId })
        .then(() => this.fetchComments());
    },
  },
};
</script>
