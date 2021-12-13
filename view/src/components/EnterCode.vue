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
            <span class="font-sans text-lg font-medium"> Please enter verification code from your email: </span>
            <vs-input v-validate="'required'" icon="vpn_key" class="pb-2 w-full h-4 mx-2 mt-4 mb-10" name="code" label="CODE" v-model="code" />
            <div class="flex justify-start items-center">
              <div>
                <vs-button :disabled="errors.first('code')" class="my-2 text-xs w-30 mt-2 mr-10 ml-2" icon="login" @click="handleConfirmRegister">Confirm</vs-button>
              </div>
              <div class="d-flex justify-start items-center">
                <div>Change information, please return <span class="text-blue-300 cursor-pointer hover:text-blue-700" @click="$router.push('/sign-up')">Sign Up</span></div>
                <div>You have a account ? <span class="text-blue-300 cursor-pointer hover:text-blue-700" @click="$router.push('/login')">Login</span></div>
              </div>
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
      code: null,
    }
  },
  methods: {
    ...mapActions({
      confirmRegister: 'userManagement/confirmRegister',
    }),
    async handleConfirmRegister() {
      const data = await this.confirmRegister({ code: this.code }).catch((error) => {
        const message = error.response ? error.response.data.message : null
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
          text: 'Register user complete !!!',
          color: 'success',
        })
        this.$router.push('/login')
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
