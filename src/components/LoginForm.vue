<template>
  <div>
    <form action="POST" @submit.prevent="authenticate()">
      <button
        type="button"
        @click="$router.push('/select/user')"
        :disabled="store.validating"
      >
        {{ current_user?.display_name ?? current_user?.username }}
      </button>
      <div id="password-section">
        <input
          id="password-input"
          type="password"
          name="password"
          placeholder="Enter your password"
          autofocus="true"
          autocomplete="off"
          :disabled="store.validating"
          v-model="store.password"
        />
        <button id="submit-button" type="submit" :disabled="store.validating">
          <SvgIcon type="mdi" :path="submit_icon" />
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "nody-greeter-types";
import { settings } from "@/settings";
import { store } from "@/store";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenuRight } from "@mdi/js";

export default defineComponent({
  components: {
    SvgIcon,
  },
  data() {
    return {
      store,
      current_user: settings.user,
      submit_icon: mdiMenuRight,
    };
  },
  methods: {
    authenticate() {
      window.lightdm?.authenticate(null);
    },
  },
});
</script>

<style lang="less" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  height: 100%;
  justify-content: center;
}

#password-section {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.3em;
}
#password-input {
  flex-grow: 2;
  width: 100%;
}
#submit-button {
  flex-grow: 0;
  display: flex;
}

input {
  background-color: transparent;
  padding: 0.8em;
  color: #d3c6aa;
  outline: 0;
  border-width: 0.15em;
  border-style: solid;
  border-radius: 0.25em;
  transition: all ease-in-out 0.25s;
  border-color: #5c6a72;

  &:hover {
    border-color: #b9c0ab !important;
  }
  &:hover,
  &:focus {
    border-color: #d3c6aa !important;
  }
}
button {
  background-color: transparent;
  padding: 0.8em;
  color: #d3c6aa;
  outline: 0;
  border-width: 0.15em;
  border-style: solid;
  border-radius: 0.25em;
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
