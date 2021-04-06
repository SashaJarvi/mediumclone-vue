<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-xs-12 col-md-6 offset-md-3">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">Need an account?</router-link>
          </p>

          <validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>

          <form action="" @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Email" v-model="email">
            </fieldset>

            <fieldset class="form-group">
              <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password">
            </fieldset>

            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors.vue';
import actionTypes from '@/store/modules/auth/action-types';
import { mapState } from 'vuex';

export default {
  name: 'Login',
  components: {
    ValidationErrors,
  },
  data: () => ({
    email: '',
    password: '',
  }),
  computed: {
    ...mapState({
      isSubmitting: state => state.authModule.isSubmitting,
      validationErrors: state => state.authModule.validationErrors,
    }),
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.login, {
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.push({ name: 'globalFeed' });
        });
    },
  },
};
</script>
