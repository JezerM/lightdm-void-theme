<template>
  <div id="date-time">
    <h1>{{ time }}</h1>
    <h3>{{ date }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "nody-greeter-types";

export default defineComponent({
  data() {
    return {
      time: "00:00",
      date: "",
    };
  },
  beforeMount() {
    this.update();
    setInterval(() => {
      this.update();
    }, 1000);
  },
  methods: {
    update() {
      this.time = window.theme_utils?.get_current_localized_time() ?? "00:00";
      this.date = window.theme_utils?.get_current_localized_date() ?? "";
    },
  },
});
</script>

<style lang="less">
#date-time {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;

  h1 {
    font-size: 5em;
    margin: 0;
  }
  h3 {
    margin-top: 0.2em;
    margin-bottom: 0.2em;
  }
}
</style>
