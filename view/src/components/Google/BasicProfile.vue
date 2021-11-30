<!-- @format -->

<template>
  <div>
    <vs-card v-if="basicProfileGoogle" class="w-64">
      <div slot="header">
        <h3>{{ basicProfileGoogle.name }}</h3>
      </div>
      <div slot="media">
        <img :src="basicProfileGoogle.picture" />
      </div>
      <div>
        <span><span class="font-bold mx-2">Email: </span>{{ basicProfileGoogle.email }}</span>
      </div>
    </vs-card>
    <vs-button class="text-xs" color="success" @click="fetchBasicProfileGoogle" icon="folder_shared">Fetch Basic Profile</vs-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      basicProfileGoogle: null
    }
  },
  methods: {
    ...mapActions({
      getAccessToken: 'userManagement/getAccessToken',
      actionBasicProfileGoogle: 'userManagement/getBasicProfileGoogle',
    }),
    ...mapGetters({
      getBasicProfile: 'userManagement/getBasicProfile',
      getContact: 'userManagement/getContact',
    }),
    async fetchBasicProfileGoogle() {
      const res = await this.getAccessToken({
        service: 'google',
        username: this.$store.state.userDefaults,
      })
      console.log(res.token)
      await this.actionBasicProfileGoogle({ access_token: res.token })
      this.basicProfileGoogle = this.getBasicProfile().google
      console.log(this.basicProfileGoogle)
    },
  },
  created(){
    this.basicProfileGoogle = this.getBasicProfile().google
  }
}
</script>

<style></style>
