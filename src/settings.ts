import { reactive } from "vue";
import { LightDMSession, LightDMUser } from "nody-greeter-types";
import def_image from "@/assets/everforest_stairs.jpg";
let sett: string | null = localStorage.getItem("void-settings");

if (sett === "undefined") sett = null;

interface settings_t {
  theme: string;
  background: string;
  user: LightDMUser | undefined;
  desktop: LightDMSession | undefined;
}

const settings_object: settings_t = sett
  ? (JSON.parse(sett) as settings_t)
  : ({
      theme: "everforest",
      background: def_image,
      user: window.lightdm?.users[0],
      desktop: window.lightdm?.sessions[0],
    } as settings_t);

export const settings = reactive(settings_object);

if (!settings.user) settings.user = window.lightdm?.users.find((u) => !!u);

if (!settings.desktop)
  settings.desktop = window.lightdm?.sessions.find((s) => !!s);

window.lightdm?.users.forEach((u) => {
  if (u.username === settings.user?.username) settings.user = u;
});
window.lightdm?.sessions.forEach((s) => {
  if (s.key === settings.desktop?.key) settings.desktop = s;
});

export function save_settings(): void {
  localStorage.setItem("void-settings", JSON.stringify(settings));
}

console.log("Loaded settings:", settings);
export {};
