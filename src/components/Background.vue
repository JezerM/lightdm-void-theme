<template>
  <div
    :class="{ background: full_background }"
    :style="{
      'background-color': background_color,
      'background-image': 'url(\'' + background + '\')',
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { settings, BackgroundData } from "@/settings";

window.greeter_comm?.whenReady().then(() => {
  window.addEventListener("GreeterBroadcastEvent", (ev) => {
    const data = ev.data as BackgroundData;
    if (data.type == "change-background") {
      settings.background = data.path;
    }
  });
});

export default defineComponent({
  data() {
    return {
      settings,
      background: settings.background,
      background_color: "#2b3339",
    };
  },
  methods: {
    update_background() {
      if (settings.background == "user_image" && settings.user?.background) {
        this.background = settings.user.background;
      } else {
        this.background = settings.background;
      }
    },
  },
  watch: {
    "settings.background"() {
      this.update_background();
    },
    "settings.user"() {
      this.update_background();
    },
  },
  props: {
    full_background: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.update_background();
  },
});
</script>

<style lang="less" scoped>
.background {
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center center;
}
</style>
