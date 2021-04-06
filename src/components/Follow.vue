<template>
  <button
    class="btn btn-sm action-btn btn-secondary"
    @click="handleSubscription"
  >
    <i class="ion-plus-round"></i>
    {{ isFollowingOptimistic ? 'Unfollow' : 'Follow' }} {{ userProfileUsername }}
  </button>
</template>

<script>
import subscribeActionTypes from '@/store/modules/subscribe/action-types';

export default {
  name: 'Follow',
  props: {
    isFollowing: {
      type: Boolean,
      required: true,
    },
    userProfileSlug: {
      type: String,
      required: true,
    },
    userProfileUsername: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFollowingOptimistic: this.isFollowing,
    };
  },
  methods: {
    handleSubscription() {
      this.$store.dispatch(subscribeActionTypes.subscribe, {
        slug: this.userProfileSlug,
        isSubscribed: this.isFollowingOptimistic,
      });

      this.isFollowingOptimistic = !this.isFollowingOptimistic;
    },
  },
};
</script>
