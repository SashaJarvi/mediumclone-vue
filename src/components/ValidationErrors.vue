<template>
  <ul class="error-messages">
    <li v-for="errorMsg in errorMessages" :key="errorMsg">
      {{ errorMsg }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map(name => {
        const messages = this.validationErrors[name].join(', ');
        return `${name} ${messages}`;
      });
    },
  },
};
</script>

<style scoped>

</style>
