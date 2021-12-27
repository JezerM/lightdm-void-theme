<template>
  <div>
    <form action="POST" @submit.prevent="authenticate()">
      <button
        type="button"
        @click="$router.push('/select/user')"
        :disabled="store.validating"
      >
        {{ current_user.display_name }}
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
          S
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import "nody-greeter-types";
import { settings } from "@/settings";
import { store } from "@/store";

@Options({
  data() {
    return {
      store,
      current_user: settings.user,
    };
  },
  methods: {
    authenticate() {
      window.lightdm?.authenticate(null);
    },
  },
})
export default class LoginForm extends Vue {}
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
}

input {
  background-color: transparent;
  padding: 1em;
  color: #d3c6aa;
  outline: 0;
  border-width: 2px;
  border-style: solid;
  border-radius: 5px;
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
  padding: 1em;
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
