<template>
  <div id="login-utils">
    <button
      id="sessions-button"
      type="button"
      @click="$router.push('/select/desktop')"
    >
      {{ current_session.name }}
    </button>
    <button
      id="layouts-button"
      type="button"
      @click="$router.push('/select/layout')"
    >
      {{ current_layout.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { settings } from "@/settings";

@Options({
  data() {
    return {
      current_session: settings.desktop,
      current_layout: window.lightdm?.layout,
    };
  },
})
export default class LoginUtils extends Vue {}
</script>

<style lang="less">
#login-utils {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3em;
}
button {
  background-color: transparent;
  padding: 0.5em;
  color: #d3c6aa;
  outline: 0;
  border-width: 2px;
  border-style: solid;
  border-radius: 5px;
  transition: all ease-in-out 0.25s;
  border-color: #5c6a72;
  cursor: pointer;

  &:hover {
    border-color: #b9c0ab !important;
  }
  &:hover,
  &:focus {
    border-color: #d3c6aa !important;
  }
}
</style>
