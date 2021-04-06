<template>
  <button
    @click="handleLike"
    class="btn btn-sm"
    :class="isFavoriteOptimistic ? 'btn-primary' : 'btn-outline-primary'"
  >
    <i class="ion-heart" />
    <span>&nbsp; {{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import actionTypes from '@/store/modules/add-to-favorites/action-types';

export default {
  name: 'AddToFavorites',
  props: {
    isFavorite: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isFavoriteOptimistic: this.isFavorite,
      favoritesCountOptimistic: this.favoritesCount,
    };
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorite: this.isFavoriteOptimistic,
      });

      if (this.favoritesCountOptimistic) {
        this.favoritesCountOptimistic--;
      } else {
        this.favoritesCountOptimistic++;
      }

      this.favoritedOptimistic = !this.favoritedOptimistic;
    },
  },
};
</script>
