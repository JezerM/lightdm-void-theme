<template>
  <div id="home">
    <Addons />
    <div id="header-container">
      <DateTime />
      <h3 id="lock-message" v-if="locked">Your session is locked</h3>
    </div>
    <Card
      id="login-card"
      :class="{
        success: store.authenticated == 1,
        failure: store.authenticated == 2,
      }"
      radius="0.5em"
    >
      <div id="login-header">
        <UserImage />
        <LoginForm id="LoginForm" />
      </div>

      <div id="login-footer">
        <LoginUtils />
        <Power />
      </div>
    </Card>

    <button id="settings-button" @click="$router.push('/config')">
      <SvgIcon type="mdi" :path="config_icon" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
import DateTime from "@/components/DateTime.vue";
import LoginForm from "@/components/LoginForm.vue";
import LoginUtils from "@/components/LoginUtils.vue";
import Power from "@/components/Power.vue";
import Addons from "@/components/Addons.vue";
import UserImage from "@/components/UserImage.vue";
import { store } from "@/store";
import { mdiCog } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

export default defineComponent({
  components: {
    Card,
    DateTime,
    LoginForm,
    LoginUtils,
    Power,
    UserImage,
    Addons,
    SvgIcon,
  },
  data() {
    return {
      store,
      config_icon: mdiCog,
      locked: window.lightdm?.lock_hint,
    };
  },
});
</script>

<style lang="less">
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: space-around;
  width: 100vw;
}

#login-card {
  max-width: 25em;
  max-height: 15em;
  padding-bottom: 1em;
  background-color: #465258ee;
  transition: background-color ease-in-out 0.25s;

  * {
    font-family: inherit;
    font-size: inherit;
  }

  &.success {
    background-color: #5f6d67;
  }
  &.failure {
    background-color: #59454b;
  }
}

#header-container {
  display: flex;
  flex-direction: column;
}

#login-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #5c6a72;
  border-bottom-style: inset;
  border-bottom-width: 0.15em;
  padding-bottom: 1em;
}
#login-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1em;
}

#LoginForm {
  width: 60%;
}

#settings-button {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  margin: 1.1rem;
  padding: 0.5em;
  font-size: 1.2em;
  font-family: inherit;
  opacity: 0;

  background-color: #465258bb;
  color: #d3c6aa;
  outline: 0;
  border-width: 0.15em;
  border-style: solid;
  border-radius: 0.25em;
  transition: all ease-in-out 0.25s;
  border-color: #5c6a72;
  cursor: pointer;

  &:hover,
  &:focus {
    border-color: #d3c6aa !important;
    opacity: 1;
  }
}
</style>
