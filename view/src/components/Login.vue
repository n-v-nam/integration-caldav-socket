<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">

        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row flex no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto" />
            </div>
            <div>
              <vs-input icon="account_circle" label-placeholder="icon-disabled" v-model="username" />
              <vs-input
                icon-no-border
                icon="lock"
                label-placeholder="icon-no-border"
                v-model="password"
              />
              <vs-button class="my-2" @click="handleLogin">Login</vs-button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      password: null,
      username: null
    }
  },
  methods:{
    ...mapActions({
      login: 'userManagement/login',
    }),
    async handleLogin(){
      const user = {
        password: this.password,
        username: this.username
      }
      const data = await this.login(user);
      if(data.token){
        localStorage.setItem('token', data.token)
        this.$store.dispatch('updateUser', this.username)
        this.$router.push('/')
      }
      else{
        this.$vs.notify({
          time:3000,
          position: 'bottom-right',
          title: '',
          text: "Error",
          color: "danger"
      });
      }
    }
  }
}
</script>
<style lang="scss">
.login-button .vs-con-input input {
  cursor: pointer !important;
}
</style>
