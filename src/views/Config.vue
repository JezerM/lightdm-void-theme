<template>
  <div id="config">
    <button class="back" @click="$router.back()">Back</button>
    <div id="background-image">
      <img :src="current_image" :alt="current_image" />
    </div>
    <div id="image-buttons">
      <button id="left-button" @click="left()">Previous</button>
      <span id="image-name">{{ current_image_name }}</span>
      <button id="right-button" @click="right()">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { get_backgrounds } from "@/utils/backgrounds";
import { settings, save_settings } from "@/settings";

export default defineComponent({
  data() {
    return {
      backgrounds: [] as string[],
      position: 0,
      current_image: settings.background,
      current_image_name: settings.background,
    };
  },
  async mounted() {
    const images: string[] = await get_backgrounds();
    let index = 0;
    images.forEach((img, ind) => {
      if (img == settings.background) index = ind;
    });
    this.position = index;
    this.backgrounds = images;
  },
  watch: {
    position() {
      let current = this.backgrounds[this.position];
      settings.background = current;
      this.current_image_name = current;
      if (current == "user_image" && settings.user?.background) {
        this.current_image = settings.user.background;
      } else {
        this.current_image = current;
      }
      save_settings();
    },
  },
  methods: {
    left() {
      if (this.position <= 0) this.position = this.backgrounds.length - 1;
      else this.position--;
    },
    right() {
      if (this.position >= this.backgrounds.length - 1) this.position = 0;
      else this.position++;
    },
  },
});
</script>

<style lang="less">
#config {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #2b3339;
}

#background-image {
  max-width: calc(50vh * 16 / 9);
  background-size: cover;
  height: calc(80vw * 9 / 16);
  max-height: 50vh;
  width: 80vw;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;

  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
  }
}
#image-buttons {
  display: flex;
  flex-direction: row;
  max-width: calc(50vh * 16 / 9);
  align-items: center;
  justify-content: space-between;
  width: 75vw;
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
