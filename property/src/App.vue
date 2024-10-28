<template>
  <div id="app">
    <!-- <home></home> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {
    // Home: () => import('./views/Home.vue')
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   // padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: #e7e7e7;
  border: 1px solid #cacaca;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #aaa;
}
</style>
