import { theme_utils, greeter_config } from "nody-greeter-types";
import { settings } from "@/settings";
import def_image from "@/assets/everforest_stairs.jpg";

export async function get_backgrounds(): Promise<string[]> {
  const images: string[] = [];
  images.push(def_image, "user_image");
  await new Promise((resolve) => {
    theme_utils.dirlist(
      greeter_config.branding.background_images_dir,
      true,
      (files) => {
        images.push(...files);
        resolve(true);
      }
    );
  });
  return images;
}

export function get_default_background(): string {
  const background: string = settings.background ?? def_image;
  return background;
}
