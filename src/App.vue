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
import { defineComponent } from "vue";
import { settings } from "@/settings";
import { store } from "@/store";
import Background from "@/components/Background.vue";
import { LightDMPromptType } from "nody-greeter-types";

// When prompt, respond to lightdm with the user or password according to the requested type
window.lightdm?.show_prompt.connect((_text, type) => {
  if (type == LightDMPromptType.Question) {
    window.lightdm?.respond(settings.user?.username ?? "");
  } else if (
    type == LightDMPromptType.Secret &&
    window.lightdm?.in_authentication
  ) {
    store.validating = true;
    window.lightdm?.respond(store.password);
  }
});
window.lightdm?.show_message.connect((text, type) => {
  console.log({ text, type });
});

/**
 * The user is authenticated, start session
 */
function startSession() {
  store.authenticated = 1; // Authenticated
  setTimeout(() => {
    window.lightdm?.start_session(settings.desktop?.key ?? null);
  }, 2000);
}
/**
 * The user is not authenticated, cancel authentication
 */
function denySession() {
  window.lightdm?.cancel_authentication();
  store.password = "";
  store.authenticated = 2; // Not authenticated
  setTimeout(() => {
    store.authenticated = 0;
    let pass: HTMLInputElement | null =
      document.querySelector("#password-input");
    pass?.focus();
  }, 2000);
}

// When authenticated, check if the authentication succeeded or not to start the selected session
window.lightdm?.authentication_complete.connect(() => {
  if (!window.lightdm?.is_authenticated) {
    denySession();
  } else {
    startSession();
  }
  store.validating = false;
});

export default defineComponent({
  components: {
    Background,
  },
  data() {
    return { store };
  },
  mounted() {
    this.$router.push("/home");
  },
});
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
