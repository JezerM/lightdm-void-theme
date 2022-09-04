<template>
  <div id="splash" @click="back()">
    <div id="content">
      <h1>{{ message }}</h1>
      <h3>Press any key to go back</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const mode = this.$route.params.mode;
    if (typeof mode !== "string") return {};
    let message: string;

    if (mode == "shutdown") {
      message = "Shutting down";
    } else if (mode == "restart") {
      message = "Restarting";
    } else if (mode == "suspend") {
      message = "Suspending";
    } else if (mode == "hibernate") {
      message = "Hibernating";
    } else {
      message = mode;
    }
    return {
      message,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
  mounted() {
    window.addEventListener("keyup", this.back);
  },
  unmounted() {
    window.removeEventListener("keyup", this.back);
  },
});
</script>

<style lang="less">
#splash {
  background-color: #2b333933;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #content {
    font-weight: bold;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  h1 {
    font-size: 3em;
    margin: 0;
  }
}
</style>
