<template>
  <img class="img-logo" alt="Koerber logo" src="./assets/Koerber-logo-black-white.jpg">
  <MainPage msg="Welcome to this Code Challenge"/>
</template>

<script>
import MainPage from './views/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
  }
}
</script>

<style>

#img-logo{
  margin-left: auto;
  margin-right: auto;
  width: 500px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>