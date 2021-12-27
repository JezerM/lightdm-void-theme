<template>
  <button class="item" :class="{ selected: selected }" @click="select()">
    {{ mode === "user" ? item.display_name : item.name }}
    <span v-if="mode === 'user'">: {{ item.username }}</span>
    <span v-if="mode === 'desktop'">: {{ item.key }}</span>
    <span v-if="mode === 'layout'">: {{ item.description }}</span>
  </button>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { PropType } from "vue";
import { LightDMUser, LightDMSession } from "nody-greeter-types";

@Options({
  props: {
    mode: String,
    item: {
      type: Object as PropType<LightDMUser | LightDMSession>,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    select() {
      this.$emit("select");
    },
  },
})
export default class SelectItem extends Vue {}
</script>

<style lang="less">
.item {
  font-size: 1.2rem;
  font-family: inherit;
  background-color: #465258bb;
  color: #d3c6aa;
  outline: 0;
  padding: 0.5em;
  border-radius: 5px;
  border-width: 2px;
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
