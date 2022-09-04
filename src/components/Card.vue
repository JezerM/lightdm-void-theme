<template>
  <div
    class="card"
    :style="{
      'background-color': bg_color ? bg_color + 'ee' : '',
      'border-radius': radius,
    }"
  >
    <slot>Hello world!</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },
  props: {
    radius: String,
    bg_color: String,
  },
});
</script>

<style lang="less">
.card {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 2em;
  box-shadow: 1.2px 1.2px 1.9px rgba(0, 0, 0, 0.003),
    3px 3px 4.7px rgba(0, 0, 0, 0.008), 5.6px 5.6px 8.8px rgba(0, 0, 0, 0.014),
    10.1px 10.1px 15.6px rgba(0, 0, 0, 0.024),
    18.8px 18.8px 29.2px rgba(0, 0, 0, 0.038),
    45px 45px 70px rgba(0, 0, 0, 0.07);
}
</style>
