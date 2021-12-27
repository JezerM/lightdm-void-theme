import murmur32 from "murmur-32";

export const colors = {
  bg0: "#2b3339",
  bg1: "#323c41",
  bg2: "#3a454a",
  bg3: "#445055",
  bg4: "#4c555b",
  bg5: "#53605c",
  bg_red: "#4e3e43",
  bg_green: "#404d44",
  bg_blue: "#394f5a",
  bg_yellow: "#4a4940",
  bg_void: "#295340",
};

export function get_color_from_string(str: string): string {
  let color = "";
  const hash = new Uint32Array(murmur32(str))[0];
  let proportion = hash / Math.pow(2, 32);
  if (proportion > 1) proportion -= 1;

  const values = Object.values(colors);

  const index = Math.round(proportion * (values.length - 1));

  color = values[index];
  console.log({ color, index, proportion });

  return color;
}

export {};
