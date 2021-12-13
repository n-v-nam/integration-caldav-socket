<!-- @format -->

<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <div slot="no-body" class="full-page-bg-color">
        <div class="flex justify-center items-center mb-8">
          <span class="font-sans text-4xl"> Welcome to CALDAV </span>
          <span class="material-icons text-6xl"> insert_invitation </span>
        </div>
        <div class="vx-row flex no-gutter justify-center items-center">
          <div class="vx-col hidden lg:block lg:w-1/2">
            <img src="@/assets/images/login.png" alt="login" class="mx-auto" />
          </div>
          <div>
            <div class="flex">
              <vs-input icon="account_circle" class="pb-2 w-full mx-2" label-placeholder="Username" v-model="username" />
              <vs-input v-validate="'required|email'" icon="email" class="pb-2 w-full" label-placeholder="Email" v-model="email" />
            </div>
            <div class="flex">
              <vs-input type="password" class="w-full mx-2" icon-no-border icon="lock" label-placeholder="Password" v-model="password" />
              <vs-input type="password" class="w-full" icon-no-border icon="lock" label-placeholder="Re-Password" v-model="confirmPassword" />
            </div>
            <div class="flex justify-start items-center">
              <div>
                <vs-button :disabled="errors.any()" class="my-2 text-xs w-30 mr-10 ml-2" icon="login" @click="handleSignUp">Sign Up</vs-button>
              </div>
              <div>You have a account ? <span class="text-blue-300 cursor-pointer hover:text-blue-700" @click="$router.push('/login')">Login</span></div>
            </div>
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
      username: null,
      confirmPassword: null,
      email: null,
    }
  },
  methods: {
    ...mapActions({
      register: 'userManagement/register',
    }),
    async handleSignUp() {
      if (this.password === this.confirmPassword) {
        const user = {
          email: this.email,
          password: this.password,
          username: this.username,
        }
        const data = await this.register(user).catch((error) => {
          const message = error.response ? error.response.data.message : 'Register failed !'
          this.$vs.notify({
            time: 3000,
            position: 'bottom-right',
            title: 'An error has occurred',
            text: message || null,
            color: 'danger',
          })
        })
        if (data) {
          this.$vs.notify({
            time: 3000,
            position: 'bottom-right',
            title: 'Success',
            text: 'Please check email to enter code',
            color: 'success',
          })
          this.$router.push('/sign-up-confirm')
        }
      } else {
        this.$vs.notify({
          time: 3000,
          position: 'bottom-right',
          title: '',
          text: 'Confirm password no match !',
          color: 'danger',
        })
      }
    },
  },
}
</script>
<style lang="scss">
.login-button .vs-con-input input {
  cursor: pointer !important;
}
</style>
