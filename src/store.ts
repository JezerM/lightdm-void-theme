import { reactive } from "vue";

export const store = reactive({
  password: "",
  validating: false,
  authenticated: 0,
});
