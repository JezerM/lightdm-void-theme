<template>
  <div id="app-secondary" :class="{ hidden: store.authenticated == 1 }">
    <Background />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Background from "@/components/Background.vue";
import { store } from "@/store";

@Options({
  components: {
    Background,
  },
  data() {
    return { store };
  },
})
export default class App extends Vue {}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d3c6aa;
  position: absolute;
  max-height: 100vh;
  max-width: 100vw;
  transition: all 1.25s ease-in-out 0.25s;

  &.hidden {
    opacity: 0;
  }
}

html {
  background-color: #000000;
  height: 100vh;
  width: 100vw;
}

body {
  padding: 0;
  margin: 0;
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
