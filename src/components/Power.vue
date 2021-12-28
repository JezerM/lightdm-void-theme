<template>
  <div id="power">
    <button
      id="shutdown-button"
      type="button"
      @click="shutdown()"
      v-if="can_shutdown"
    >
      <SvgIcon type="mdi" :path="shutdown_icon" />
    </button>
    <button
      id="restart-button"
      type="button"
      @click="restart()"
      v-if="can_restart"
    >
      <SvgIcon type="mdi" :path="restart_icon" />
    </button>
    <button
      id="suspend-button"
      type="button"
      @click="suspend()"
      v-if="can_suspend"
    >
      <SvgIcon type="mdi" :path="suspend_icon" />
    </button>
    <button
      id="hibernate-button"
      type="button"
      @click="hibernate()"
      v-if="can_hibernate"
    >
      <SvgIcon type="mdi" :path="hibernate_icon" />
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPower, mdiRestart, mdiPowerSleep, mdiPowerCycle } from "@mdi/js";

@Options({
  components: {
    SvgIcon,
  },
  data() {
    return {
      shutdown_icon: mdiPower,
      restart_icon: mdiRestart,
      suspend_icon: mdiPowerSleep,
      hibernate_icon: mdiPowerCycle,
      can_shutdown: window.lightdm?.can_shutdown,
      can_restart: window.lightdm?.can_restart,
      can_suspend: window.lightdm?.can_suspend,
      can_hibernate: window.lightdm?.can_hibernate,
    };
  },
  methods: {
    shutdown() {
      this.$router.push("/splash/shutdown");
      window.lightdm?.shutdown();
    },
    restart() {
      this.$router.push("/splash/restart");
      window.lightdm?.restart();
    },
    suspend() {
      this.$router.push("/splash/suspend");
      window.lightdm?.suspend();
    },
    hibernate() {
      this.$router.push("/splash/hibernate");
      window.lightdm?.hibernate();
    },
  },
})
export default class Power extends Vue {}
</script>

<style lang="less">
#power {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3em;

  button {
    display: flex;
  }
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
