<template>
  <div id="addons-container">
    <div class="addon" id="brightness-addon" v-if="can_access_brightness">
      <SvgIcon type="mdi" :path="brightness_icon" />
      {{ brightness }} %
    </div>
    <div class="addon" id="battery-addon" v-if="can_access_battery">
      <SvgIcon type="mdi" :path="battery_icon" />
      {{ battery_level }} %
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiBatteryOutline,
  mdiBattery10,
  mdiBattery20,
  mdiBattery30,
  mdiBattery40,
  mdiBattery50,
  mdiBattery60,
  mdiBattery70,
  mdiBattery80,
  mdiBattery90,
  mdiBattery,
  mdiBatteryChargingOutline,
  mdiBatteryCharging10,
  mdiBatteryCharging20,
  mdiBatteryCharging30,
  mdiBatteryCharging40,
  mdiBatteryCharging50,
  mdiBatteryCharging60,
  mdiBatteryCharging70,
  mdiBatteryCharging80,
  mdiBatteryCharging90,
  mdiBatteryCharging,
  mdiBrightness5,
  mdiBrightness6,
  mdiBrightness7,
} from "@mdi/js";

@Options({
  components: {
    SvgIcon,
  },
  data() {
    return {
      battery: {},
      battery_level: 0,
      brightness: 0,
      battery_icon: "",
      can_access_battery: window.lightdm?.can_access_battery,
      can_access_brightness: window.lightdm?.can_access_brightness,
    };
  },
  computed: {
    brightness_icon() {
      if (this.brightness < 30) {
        return mdiBrightness5;
      } else if (this.brightness < 70) {
        return mdiBrightness6;
      } else {
        return mdiBrightness7;
      }
    },
  },
  methods: {
    update_battery_icon() {
      if (this.battery.level < 5) {
        return this.battery.ac_status
          ? mdiBatteryChargingOutline
          : mdiBatteryOutline;
      } else if (this.battery.level < 20) {
        return this.battery.ac_status ? mdiBatteryCharging10 : mdiBattery10;
      } else if (this.battery.level < 30) {
        return this.battery.ac_status ? mdiBatteryCharging20 : mdiBattery20;
      } else if (this.battery.level < 40) {
        return this.battery.ac_status ? mdiBatteryCharging30 : mdiBattery30;
      } else if (this.battery.level < 50) {
        return this.battery.ac_status ? mdiBatteryCharging40 : mdiBattery40;
      } else if (this.battery.level < 60) {
        return this.battery.ac_status ? mdiBatteryCharging50 : mdiBattery50;
      } else if (this.battery.level < 70) {
        return this.battery.ac_status ? mdiBatteryCharging60 : mdiBattery60;
      } else if (this.battery.level < 80) {
        return this.battery.ac_status ? mdiBatteryCharging70 : mdiBattery70;
      } else if (this.battery.level < 90) {
        return this.battery.ac_status ? mdiBatteryCharging80 : mdiBattery80;
      } else if (this.battery.level < 100) {
        return this.battery.ac_status ? mdiBatteryCharging90 : mdiBattery90;
      } else {
        return this.battery.ac_status ? mdiBatteryCharging : mdiBattery;
      }
    },
    update_battery() {
      if (window.lightdm?.can_access_battery) {
        this.battery = window.lightdm.batteryData;
        this.battery_level = this.battery.level;
        this.battery_icon = this.update_battery_icon();
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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .addon {
    padding: 0.5em;
    display: flex;
    flex-direction: revert;
    align-items: center;
    gap: 0.2em;
  }
}
</style>
