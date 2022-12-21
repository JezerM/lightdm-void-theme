<template>
  <button class="item" :class="{ selected: selected }" @click="select()">
    {{ fullItem.name }}
    <span>: {{ fullItem.description }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { LightDMUser, LightDMSession, LightDMLayout } from "nody-greeter-types";

interface Item {
  name: string;
  description: string;
}

export default defineComponent({
  props: {
    mode: {
      type: String as PropType<"user" | "desktop" | "layout">,
      required: true,
    },
    item: {
      type: Object as PropType<LightDMUser | LightDMSession | LightDMLayout>,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    fullItem(): Item {
      let name = "";
      let desc = "";

      switch (this.mode) {
        case "user":
          name = (this.item as LightDMUser).display_name;
          desc = (this.item as LightDMUser).username;
          break;
        case "desktop":
          name = (this.item as LightDMSession).name;
          desc = (this.item as LightDMSession).key;
          break;
        case "layout":
          name = (this.item as LightDMLayout).name;
          desc = (this.item as LightDMLayout).description;
          break;
      }
      return {
        name: name,
        description: desc,
      };
    },
  },
  methods: {
    select() {
      this.$emit("select");
    },
  },
});
</script>

<style lang="less">
.item {
  font-size: 1.2rem;
  font-family: inherit;
  background-color: #465258bb;
  color: #d3c6aa;
  outline: 0;
  padding: 0.5em;
  border-radius: 0.25em;
  border-width: 0.15em;
  border-color: #4a555b;
  border-style: solid;
  cursor: pointer;

  transition: background-color ease-in-out 0.25s;

  &:hover,
  &:focus {
    background-color: #5f6d67ee !important;
  }

  &.selected {
    background-color: #e66868bb;
    border-color: #e66868bb;
  }
}
</style>
