<template>
  <div id="app">
    <div>
      <Navbar/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './Layouts/Navbar.vue'
export default {
  components: { Navbar }
}
</script>