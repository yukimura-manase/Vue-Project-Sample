<template>
  <div id="app">

    <h1>ロボ玉専用のTodoアプリ</h1>

    <Nav />    

    <!-- router-viewが登録されているviewをpathに応じて、表示する！ -->
    <router-view/>

  </div>
</template>

<script>
import Nav from './components/Nav.vue'; // 読み込み

export default {
  name: 'App',
  components: { // 子コンポーネント登録
    Nav
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
