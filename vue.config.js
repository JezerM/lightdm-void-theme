module.exports = {
  publicPath: "",
  productionSourceMap: false,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  parallel: undefined,
  css: undefined,
  pages: {
    index: {
      filename: "index.html",
      entry: "./src/main.ts",
      template: "./public/index.html",
    },
    secondary: {
      filename: "secondary.html",
      entry: "./src/secondary.ts",
      template: "./public/secondary.html",
    },
  },
};
