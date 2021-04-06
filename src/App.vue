<template>
  <div>
    <topbar />

    <router-view />
  </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue';
import actionTypes from '@/store/modules/auth/action-types';

export default {
  name: 'App',
  components: {
    Topbar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
};
</script>

<style lang="scss">

</style>
