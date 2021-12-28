<template>
  <div id="user-image-container" :style="{ 'background-color': image_color }">
    <img
      id="user-image"
      :src="current_user.image"
      :alt="current_user.username"
      @error="no_image = true"
      v-if="!no_image"
    />
    <span id="initials" v-if="no_image">{{ initials }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { settings } from "@/settings";
import { get_color_from_string } from "@/utils/color";

@Options({
  data() {
    return {
      no_image: false,
      current_user: settings.user,
      image_color: get_color_from_string(settings.user?.username ?? ""),
    };
  },
  computed: {
    initials() {
      const display_name = this.current_user.display_name;
      const splitted = display_name.split(" ");
      let initials = "";
      for (let i = 0; i < splitted.length; i++) {
        initials += splitted[i][0].toUpperCase();
      }
      return initials;
    },
  },
})
export default class UserImage extends Vue {}
</script>

<style lang="less">
#user-image-container {
  width: 8rem;
  border-radius: 100%;
  border-color: #d3c6aa;
  border-style: solid;
  border-width: 4px;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  #initials {
    font-size: 2em;
    font-weight: bold;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
#user-image {
  width: 100%;
  border-radius: 100%;
}
</style>
