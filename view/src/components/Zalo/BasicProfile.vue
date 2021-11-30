<!-- @format -->

<template>
  <div>
    <vs-card v-if="basicProfileZalo" class="w-64">
      <div slot="header">
        <h3>{{ basicProfileZalo.name }}</h3>
      </div>
      <div slot="media">
        <img :src="basicProfileZalo.picture.data.url" />
      </div>
      <div>
        <span><span class="font-bold mx-2">Id: </span>{{ basicProfileZalo.id }}</span>
      </div>
    </vs-card>
    <vs-button class="text-xs" color="success" @click="fetchBasicProfileZalo" icon="folder_shared">Fetch Basic Profile</vs-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      basicProfileZalo: null
    }
  },
  methods: {
    ...mapActions({
      getAccessToken: 'userManagement/getAccessToken',
      actionBasicProfileZalo: 'userManagement/getBasicProfileZalo',
    }),
    ...mapGetters({
      getBasicProfile: 'userManagement/getBasicProfile',
      getContact: 'userManagement/getContact',
    }),
    async fetchBasicProfileZalo() {
      const res = await this.getAccessToken({
        service: 'zalo',
        username: this.$store.state.userDefaults,
      })
      console.log(res.token)
      await this.actionBasicProfileZalo({ access_token: res.token })
      this.basicProfileZalo = this.getBasicProfile().zalo
      console.log(this.basicProfileGoogle).zalo
    },
  },
  created(){
    this.basicProfileZalo = this.getBasicProfile().zalo
  }
}
</script>

<style></style>
