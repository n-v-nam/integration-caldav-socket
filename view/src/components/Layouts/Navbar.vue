<!-- @format -->

<template>
  <div>
    <vs-navbar color="primary" text-color="rgba(255,255,255,.6)" active-text-color="rgba(255,255,255,1)" class="myNavbar">
      <div slot="title" class="d-flex">
        <vs-navbar-title class="font-medium text-xl flex items-center">
          <span class="material-icons mx-2"> event_note </span>
          Caldav
        </vs-navbar-title>
      </div>

      <vs-input icon="search" class="mx-5 text-black" placeholder="Search" v-model="searchFilter" />
      <vs-spacer></vs-spacer>
      <div class="flex justify-center items-center" v-if="$store.state.userDefaults">
        <span class="mx-2"> Notifications </span>
        <vs-dropdown class="mr-4">
          <span class="material-icons-outlined mt-1" v-if="notifications().length > 0"> notification_add </span>
          <span class="material-icons-outlined mt-1" v-else> notifications </span>
          <vs-dropdown-menu class="w-56">
            <vs-dropdown-item class="bg-yellow-50 border" v-show="notifications().length > 0" v-for="(notify, index) in notifications()" :key="index">
              <b>{{ index + 1 }}</b
              >: {{ notify.title }} you {{ notify.content }}
            </vs-dropdown-item>
            <vs-dropdown-item v-show="!notifications() || notifications().length == 0"> No notifications </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <div class="flex justify-center items-center" v-if="$store.state.userDefaults">
        <span class="mx-2">{{ $store.state.userDefaults }}</span>
        <vs-dropdown class="mr-4">
          <vs-avatar class="mb-1" />
          <vs-dropdown-menu class="w-40">
            <vs-dropdown-item @click="$router.push('/')"> Home </vs-dropdown-item>
            <vs-dropdown-item @click="$router.push('/me/profile')"> Profile </vs-dropdown-item>
            <vs-dropdown-item @click="$router.push('/me/change-password')"> Change Password </vs-dropdown-item>
            <vs-dropdown-item @click="logOut"> Log out </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
    </vs-navbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {},
  data() {
    return {
      searchFilter: null
    }
  },

  mounted() {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification')
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (!('permission' in Notification)) {
          Notification.permission = permission
        }
      })
    }
  },
  methods: {
    ...mapGetters({
      notifications: 'userManagement/getNotification',
    }),
    ...mapActions({
      getProfile: 'userManagement/getProfile'
    }),
    logOut() {
      localStorage.removeItem('token')
      this.$router.push('/login')
      this.$store.dispatch('updateUser', '')
    },
  },
  async created() {
    await this.getProfile()
  },
}
</script>

<style scoped>
.input-color {
  margin-bottom: 10px;
  position: relative;
  display: block;
}
.myNavbar {
  color: rgb(255, 255, 255);
}
</style>
