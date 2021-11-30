<template>
  <div id="app">
    <div>
      <vs-navbar
        color="primary"
        text-color="rgba(255,255,255,.6)"
        active-text-color="rgba(255,255,255,1)"
        class="myNavbar"
      >
        <div slot="title" class="d-flex">
          <vs-navbar-title class="font-bold">Zato Project</vs-navbar-title>
        </div>

        <vs-spacer></vs-spacer>
        <div class="flex justify-center items-center">
          <span v-if="$store.state.userDefaults" class="mx-2">{{
            $store.state.userDefaults
          }}</span>
          <vs-dropdown class="mr-4">
            
            <vs-avatar/>
            <vs-dropdown-menu class="w-20">
              <vs-dropdown-item @click="$router.push('/')"> Home </vs-dropdown-item>
              <vs-dropdown-item @click="logOut"> Log out </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  watch: {
    '$store.state.loading': function (val) {
      //if (window.document.documentMode) return;
      if (val)
        this.$vs.loading({
          type: 'material',
        })
      else this.$vs.loading.close()
    },
    '$store.state.notification': function (val) {
      if (val.status)
        this.$vs.notify({
          time: 3000,
          position: 'bottom-right',
          title: '',
          text: val.message,
          color: val.type,
        })
    },
  },
  methods: {
    logOut() {
      localStorage.removeItem('token')
      this.$router.push('/login')
      this.$store.dispatch('updateUser', '')
    },
  },
  async created() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('updateUser', 'admin')
    } else {
      this.$router.push('/login')
      this.$store.dispatch('updateUser', '')
    }
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
