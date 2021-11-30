<!-- @format -->

<template>
  <div>
    <vs-card v-if="basicProfileMicrosoft" class="w-64">
      <div slot="header">
        <h3>{{ basicProfileMicrosoft.profile.displayName }}</h3>
      </div>
      <div slot="media">
        <img :src="`data:image/jpg;base64,${basicProfileMicrosoft.picture}`"/>
      </div>
      <div>
        <span><span class="font-bold mx-2">Email: </span>{{ basicProfileMicrosoft.profile.userPrincipalName }}</span>
      </div>
    </vs-card>
    <vs-button class="text-xs" color="success" @click="fetchBasicProfileMicrosoft" icon="folder_shared">Fetch Basic Profile</vs-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      basicProfileMicrosoft: null
    }
  },
  methods: {
    ...mapActions({
      getAccessToken: 'userManagement/getAccessToken',
      getProfileMicrosoft: 'userManagement/getProfileMicrosoft',
    }),
    ...mapGetters({
      getBasicProfile: 'userManagement/getBasicProfile',
      getContact: 'userManagement/getContact',
    }),
    async fetchBasicProfileMicrosoft() {
      const res = await this.getAccessToken({
        service: 'microsoft',
        username: this.$store.state.userDefaults,
      })
      console.log(res.token)
      await this.getProfileMicrosoft({ access_token: res.token })
      this.basicProfileMicrosoft = this.getBasicProfile().microsoft
      console.log(this.basicProfileMicrosoft)
    },
  },
  created(){
    this.basicProfileMicrosoft = this.getBasicProfile().microsoft
  }
}
</script>

<style></style>
