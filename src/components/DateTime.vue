<template>
  <div id="date-time">
    <h1>{{ time }}</h1>
    <h3>{{ date }}</h3>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import "nody-greeter-types";

@Options({
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
      this.time = window.theme_utils?.get_current_localized_time();
      this.date = window.theme_utils?.get_current_localized_date();
    },
  },
})
export default class DateTime extends Vue {}
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
