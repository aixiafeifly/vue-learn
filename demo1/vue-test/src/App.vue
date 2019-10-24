<template>
  <div id="app">
    <router-view />
    <product />
    <watch-a />
    <conputed-s />
    <menuS />
  </div>
</template>
<script>
import product from "./views/product/product";
import watchA from "./views/watch/wacth";
import conputedS from "./views/computed/computed";
import menuS from "./views/menu/menu";
export default {
  components: {
    product,
    watchA,
    conputedS,
    menuS
  }
};
</script>
<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
