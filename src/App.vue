<template>
  <div id="app">
    <div id="header">
      <img class="header_bg" src="./assets/image/web_bg1.png">
      <img class="header_logo" src="./assets/image/web_logo2.png">
    </div>
    <div class="apk_dist_main">
      <ApkDistMain />
    </div>
  </div>
</template>

<script>
import ApkDistMain from './components/ApkDistMain.vue'

export default {
  name: 'app',
  components: {
    ApkDistMain
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header_bg {
  width: 100%;
  height:12rem;
}
.header_logo {
  width: 16rem;
  position: absolute;
  top: 2rem;
  left: 4rem;
}
.apk_dist_main {
  position: absolute;
  width: 100%;
  height: 100%;
  top:12rem;
}
body {
  margin: 0 !important;
}
</style>
