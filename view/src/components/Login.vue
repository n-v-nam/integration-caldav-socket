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
            <vs-input icon="account_circle" class="pb-2 w-full" label-placeholder="Username" v-model="username" />
            <vs-input v-if="!isReset" type="password" class="w-full" icon-no-border icon="lock" label-placeholder="Password" v-model="password" />
            <vs-button v-if="!isReset" class="my-2 text-xs h-10 w-20" icon="login" @click="handleLogin"> Login</vs-button>
            <vs-button v-else class="my-2 text-xs h-10 w-20" icon="send" @click="isConfirm = true"> Reset</vs-button>
            <vs-row>
              <div v-if="!isReset">Forget password ? <span class="text-blue-300 cursor-pointer hover:text-blue-700" @click="isReset = !isReset">Reset Password</span></div>
              <div v-else>Go to <span class="text-blue-300 cursor-pointer hover:text-blue-700" @click="isReset = !isReset">Login</span></div>
            </vs-row>
            <vs-row>
              <div>Create a new account ? <span class="text-blue-300 cursor-pointer hover:text-blue-700" @click="$router.push('/sign-up')">Sign Up</span></div>
            </vs-row>
          </div>
        </div>
      </div>
    </div>

    <vs-popup title="Warning" background-color-popup="warning" :active.sync="isConfirm">
      <div>
        <span class="mb-2 text-sm">Please enter your email to confirm:</span>
        <vs-input icon="email" class="w-3/4 mb-4 font-bold text-black" name="email" v-validate="'required'" placeholder="Email" v-model="email" />
      </div>
      <div class="flex justify-end">
        <vs-button class="text-xs mx-2" @click="handleResetPassword" icon="check">Confirm</vs-button>
        <vs-button
          class="text-xs"
          @click="
            isConfirm == false
            email = null
          "
          icon="close"
          >Cancel</vs-button
        >
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      password: null,
      username: null,
      isReset: false,
      isConfirm: false,
      email: null
    }
  },
  methods: {
    ...mapActions({
      login: 'userManagement/login',
      resetPassword: 'userManagement/resetPassword',
    }),
    async handleLogin() {
      const user = {
        password: this.password,
        username: this.username,
      }
      const data = await this.login(user).catch((error) => {
        const message = error.response ? error.response.data.message : null
        this.$vs.notify({
          time: 3000,
          position: 'bottom-right',
          title: 'An error has occurred',
          text: message,
          color: 'danger',
        })
      })
      if (data.token) {
        localStorage.setItem('token', data.token)
        this.$store.dispatch('updateUser', this.username)
        this.$socket.emit('connected', data.id)
        this.$router.push('/')
      }
    },
    async handleResetPassword() {
      const reset = await this.resetPassword({ username: this.username, email: this.email }).catch((error) => {
        const message = error.response ? error.response.data.message : null
        this.$vs.notify({
          time: 3000,
          position: 'bottom-right',
          title: 'An error has occurred',
          text: message,
          color: 'danger',
        })
      })
      if (reset) {
        this.$vs.notify({
          time: 3000,
          position: 'bottom-right',
          title: 'Success',
          text: 'Please check your email to get new password',
          color: 'success',
        })
      }
      this.email = null
      this.isConfirm = false
    },
  },
}
</script>
<style lang="scss">
.login-button .vs-con-input input {
  cursor: pointer !important;
}
</style>
