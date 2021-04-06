<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea
          class="form-control"
          rows="3"
          placeholder="Write a comment..."
          v-model="body"
        />
      </div>

      <div class="card-footer">
        <img class="comment-author-img" :src="currentUser.image" :alt="currentUser.username">

        <button class="btn btn-sm btn-primary" type="submit" :disabled="isSubmitting">
          Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import authGetterTypes from '@/store/modules/auth/getter-types';

export default {
  name: 'CommentForm',
  props: {
    author: {
      type: Object,
      required: true,
    },
    initialValues: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      body: this.initialValues.body,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
  },
  methods: {
    onSubmit() {
      const form = {
        body: this.body,
      };

      this.$emit('commentSubmit', form);
    },
  },
};
</script>
