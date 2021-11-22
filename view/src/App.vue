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
          <span v-if="$store.state.userDefaults" class="ml-2 text-gray-300">Account: {{$store.state.userDefaults}}</span>
        </div>

        <vs-navbar-item index="0">
          <router-link to="/">Home</router-link>
        </vs-navbar-item>
        <vs-navbar-item index="1">
          <router-link to="/login" v-if="!$store.state.userDefaults">Login</router-link>
          <span v-else @click="logOut">Log out</span>
        </vs-navbar-item>

        <vs-spacer></vs-spacer>

        <vs-button
          color-text="rgb(255, 255, 255)"
          color="rgba(255, 255, 255, 0.3)"
          type="flat"
          icon="more_horiz"
        ></vs-button>
      </vs-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {}
  },
  watch: {
    "$store.state.loading": function(val) {
        //if (window.document.documentMode) return;
        if(val) this.$vs.loading(
          {
            type:'material'
          });
        else this.$vs.loading.close();
    },
    "$store.state.notification": function(val) {
        if(val.status) this.$vs.notify({
          time:3000,
          position: 'bottom-right',
          title: '',
          text: val.message,
          color: val.type
      });
    },
    "localStorage.getItem('token')": async function(val) {
      if(!val){
        this.$router.push('/login')
      }
      else{
        this.$store.dispatch('updateUser', 'admin')
      }
    }
  },
  methods: {
    logOut(){
      localStorage.removeItem('token');
      this.$router.push('/login')
      this.$store.dispatch('updateUser', '')
    }
  },
  async created () {
    if(localStorage.getItem('token')){
        this.$store.dispatch('updateUser', 'admin')
    }
    else{
      this.$router.push('/login')
      this.$store.dispatch('updateUser', '')
    }
  }
}

</script>

<style scoped>
.input-color{
  margin-bottom: 10px;
  position: relative;
  display: block
}
.myNavbar{
  color: rgb(255,255,255)
}
</style>