<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
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
  async created() {
    if(localStorage.getItem('token') && !this.$route.query.code){
      this.$router.push('/home')
    }
  }
}

</script>
