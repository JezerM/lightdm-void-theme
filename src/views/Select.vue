<template>
  <div id="select">
    <button class="back" @click="$router.back()">Back</button>
    <transition-group id="content" name="list" tag="div">
      <SelectItem
        v-for="item of content"
        :key="item[type.key]"
        :mode="mode"
        :item="item"
        :selected="item[type.key] === selected[type.key]"
        @select="select(item)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { settings, save_settings } from "../settings";
import SelectItem from "@/components/SelectItem.vue";
import { LightDMUser, LightDMSession, LightDMLayout } from "nody-greeter-types";

interface mode_t {
  field: string;
  name: string;
  key: string;
}

const modes = {
  user: { field: "users", name: "display_name", key: "username" } as mode_t,
  desktop: { field: "sessions", name: "name", key: "key" } as mode_t,
  layout: { field: "layouts", name: "name", key: "name" } as mode_t,
};

function isUser(object: unknown): object is LightDMUser {
  return Object.prototype.hasOwnProperty.call(object, "display_name");
}
function isSession(object: unknown): object is LightDMSession {
  return Object.prototype.hasOwnProperty.call(object, "comment");
}
function isLayout(object: unknown): object is LightDMLayout {
  return Object.prototype.hasOwnProperty.call(object, "short_description");
}

@Options({
  components: { SelectItem },
  data() {
    const mode = this.$route.params.mode;
    if (typeof mode !== "string") return {};
    if (mode != "user" && mode != "desktop" && mode != "layout") return {};
    const type: mode_t = modes[mode];

    let content: LightDMUser[] | LightDMSession[] | LightDMLayout[] | unknown[];
    let selected: LightDMUser | LightDMSession | LightDMLayout | unknown;

    if (mode == "user") {
      content = window.lightdm?.users ?? [];
      selected = settings.user;
    } else if (mode == "desktop") {
      content = window.lightdm?.sessions ?? [];
      selected = settings.desktop;
    } else if (mode == "layout") {
      content = window.greeter_config?.layouts ?? [];
      selected = window.lightdm?.layout;
    } else content = [];

    return {
      mode,
      type,
      content,
      selected,
    };
  },
  methods: {
    select(item: LightDMUser | LightDMSession) {
      if (this.mode == "user" && isUser(item)) {
        settings.user = item;
      } else if (this.mode == "desktop" && isSession(item)) {
        settings.desktop = item;
      } else if (this.mode == "layout" && isLayout(item)) {
        if (window.lightdm) window.lightdm.layout = { ...item };
      }
      this.selected = item;
      save_settings();
    },
    escape(event: KeyboardEvent) {
      if (event.code === "Escape") this.$router.back();
    },
  },
  mounted() {
    window.addEventListener("keyup", this.escape);
  },
  unmounted() {
    window.removeEventListener("keyup", this.escape);
  },
})
export default class Select extends Vue {}
</script>

<style lang="less">
#select {
  background-color: #2b333933;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #content {
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

.back {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5em;
  margin: 1.1rem;
  background-color: #465458bb;
  color: #d3c6aa;
  outline: 0;
  border-radius: 5px;
  border-width: 2px;
  border-color: #4a555b;
  border-style: solid;
  cursor: pointer;
  font-size: 1.2em;
  font-family: inherit;

  transition: background-color ease-in-out 0.25s;

  &:hover,
  &:focus {
    background-color: #5f6d67ee !important;
  }
}
</style>
