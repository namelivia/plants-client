// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [],
  },
  chainWebpack: (config) => {
    //Pug loader
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-plain-loader")
      .loader("pug-plain-loader");
  },
};