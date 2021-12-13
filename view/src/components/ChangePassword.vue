<!-- @format -->

<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-change-password">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <div slot="no-body" class="full-page-bg-color">
        <div class="flex justify-center items-center mb-8">
          <span class="font-sans text-4xl"> Change password </span>
          <span class="material-icons text-3xl"> vpn_key </span>
        </div>
        <div class="vx-row flex no-gutter justify-center items-center">
          <div class="vx-col hidden lg:block lg:w-1/2">
            <img src="@/assets/images/change-password.png" alt="login" class="mx-auto pr-2" />
          </div>
          <div>
            <div class="d-flex">
              <vs-input type="password" class="w-full mx-2 pb-2" icon-no-border icon="lock" label-placeholder="Password" v-model="password" />
              <vs-input type="password" class="w-full mx-2 pb-2" icon-no-border icon="lock" label-placeholder="Password" v-model="newPassword" />
              <vs-input type="password" class="w-full mx-2 pb-2" icon-no-border icon="lock" label-placeholder="Re-Password" v-model="confirmNewPassword" />
            </div>
            <div class="flex justify-start items-center">
              <div>
                <vs-button class="my-2 text-xs w-30 mr-10 ml-2" icon="assignment" @click="handleChangePassword">Change</vs-button>
              </div>
              <div class="font-semibold">Go to <span class="text-blue-300 cursor-pointer hover:text-blue-700" @click="$router.push('/home')">Home</span> here !</div>
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
      newPassword: null,
      confirmNewPassword: null,
      email: null,
    }
  },
  methods: {
    ...mapActions({
      changePassword: 'userManagement/changePassword',
    }),
    async handleChangePassword() {
      if (this.newPassword === this.confirmNewPassword) {
        const user = {
          username: this.$store.state.userDefaults,
          password: this.password,
          newPassword: this.newPassword,
        }
        const data = await this.changePassword(user).catch((error) => {
          const message = error.response ? error.response.data.message : 'Change password failed!'
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
            text: 'Please login again with new password!!!',
            color: 'success',
          })
          localStorage.removeItem('token')
          this.$router.push('/login')
          this.$store.dispatch('updateUser', '')
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
