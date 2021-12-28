<template>
  <div id="app" :class="{ hidden: store.authenticated == 1 }">
    <Background />
    <router-view v-slot="{ Component }">
      <transition appear name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Background from "@/components/Background.vue";
import { settings } from "@/settings";
import { store } from "@/store";

window.lightdm?.show_prompt.connect((_text: string, type: number) => {
  if (type == 0) {
    window.lightdm?.respond(settings.user?.username ?? "");
  } else if (type == 1 && window.lightdm?.in_authentication) {
    store.validating = true;
    window.lightdm?.respond(store.password);
  }
});
window.lightdm?.show_message.connect((text: string, type: number) => {
  console.log({ text, type });
});
window.lightdm?.authentication_complete.connect(() => {
  if (!window.lightdm?.is_authenticated) {
    window.lightdm?.cancel_authentication();
    store.password = "";
    store.authenticated = 2; // Not authenticated
    setTimeout(() => {
      store.authenticated = 0;
    }, 2000);
  } else {
    store.authenticated = 1; // Authenticated
    setTimeout(() => {
      window.lightdm?.start_session(settings.desktop?.name ?? null);
    }, 2000);
  }
  store.validating = false;
});

@Options({
  components: {
    Background,
  },
  data() {
    return { store };
  },
  mounted() {
    this.$router.push("/home");
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

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-property: opacity;
  transition-delay: 0.25s;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
