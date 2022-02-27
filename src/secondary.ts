import "@/utils/mock";
import { createApp } from "vue";
import Secondary from "./Secondary.vue";
import router from "./router";

createApp(Secondary).use(router).mount("#app-secondary");
