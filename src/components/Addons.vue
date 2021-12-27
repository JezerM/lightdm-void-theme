<template>
  <div id="addons-container">
    <div class="addon" id="brightness-addon" v-if="can_access_brightness">
      {{ brightness }} %
    </div>
    <div class="addon" id="battery-addon" v-if="can_access_battery">
      {{ battery.level }} %
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  data() {
    return {
      battery: {},
      brightness: 0,
      can_access_battery: window.lightdm?.can_access_battery,
      can_access_brightness: window.lightdm?.can_access_brightness,
    };
  },
  methods: {
    update_battery() {
      if (window.lightdm?.can_access_battery) {
        this.battery = window.lightdm.batteryData;
      }
    },
    update_brightness() {
      if (window.lightdm?.can_access_brightness) {
        this.brightness = window.lightdm.brightness;
      }
    },
  },
  mounted() {
    this.update_battery();
    this.update_brightness();
    window.lightdm?.battery_update.connect(this.update_battery);
    window.lightdm?.brightness_update.connect(this.update_brightness);
  },
  unmounted() {
    window.lightdm?.battery_update.disconnect(this.update_battery);
    window.lightdm?.brightness_update.disconnect(this.update_brightness);
  },
})
export default class Addons extends Vue {}
</script>

<style lang="less">
#addons-container {
  position: fixed;
  top: 0;
  right: 0;
  margin: 1em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;

  .addon {
    padding: 0.5em;
  }
}
</style>
