<template>
  <div id="select">
    <button class="back" @click="$router.back()">Back</button>
    <transition-group id="content" name="list" tag="div">
      <SelectItem
        v-for="item of content"
        :key="getKey(item)"
        :mode="mode"
        :item="item"
        :selected="getKey(item) === getKey(selected)"
        @select="select(item)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { settings, save_settings } from "../settings";
import { LightDMUser, LightDMSession, LightDMLayout } from "nody-greeter-types";
import SelectItem from "@/components/SelectItem.vue";

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

interface Data {
  mode: "user" | "desktop" | "layout";
  type: mode_t;
  content: LightDMUser[] | LightDMSession[] | LightDMLayout[];
  selected: LightDMUser | LightDMSession | LightDMLayout | undefined;
}

const undefinedData: Data = {
  mode: "user",
  type: modes.user,
  content: [],
  selected: undefined,
};

export default defineComponent({
  components: { SelectItem },
  data(): Data {
    const mode = this.$route.params.mode;
    if (typeof mode !== "string") return undefinedData;
    if (mode != "user" && mode != "desktop" && mode != "layout")
      return undefinedData;
    const type: mode_t = modes[mode];

    let content: LightDMUser[] | LightDMSession[] | LightDMLayout[];
    let selected: LightDMUser | LightDMSession | LightDMLayout | undefined;

    if (mode == "user") {
      content = window.lightdm?.users ?? [];
      selected = settings.user;
    } else if (mode == "desktop") {
      content = window.lightdm?.sessions ?? [];
      selected = settings.desktop;
    } else if (mode == "layout") {
      content = window.greeter_config?.layouts ?? [];
      selected = settings.layout;
    } else content = [];

    return {
      mode,
      type,
      content,
      selected,
    };
  },
  methods: {
    select(item: LightDMUser | LightDMSession | LightDMLayout) {
      if (this.mode == "user" && this.isUser(item)) {
        settings.user = item;
      } else if (this.mode == "desktop" && this.isSession(item)) {
        settings.desktop = item;
      } else if (this.mode == "layout" && this.isLayout(item)) {
        if (window.lightdm) {
          window.lightdm.layout = { ...item };
          settings.layout = { ...item };
        }
      }
      this.selected = item;
      save_settings();
    },
    escape(event: KeyboardEvent) {
      if (event.code === "Escape") this.$router.back();
    },
    isUser(object: unknown): object is LightDMUser {
      return Object.prototype.hasOwnProperty.call(object, "display_name");
    },
    isSession(object: unknown): object is LightDMSession {
      return Object.prototype.hasOwnProperty.call(object, "comment");
    },
    isLayout(object: unknown): object is LightDMLayout {
      return Object.prototype.hasOwnProperty.call(object, "short_description");
    },
    getKey(
      item: LightDMUser | LightDMSession | LightDMLayout | undefined
    ): string {
      if (this.isUser(item)) {
        return item.username;
      } else if (this.isSession(item)) {
        return item.key;
      } else if (this.isLayout(item)) {
        return item.name;
      }
      return "undefined";
    },
  },
  mounted() {
    window.addEventListener("keyup", this.escape);
  },
  unmounted() {
    window.removeEventListener("keyup", this.escape);
  },
});
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
  border-radius: 0.25em;
  border-width: 0.15em;
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
