// vue.config.js

const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
        new FaviconsWebpackPlugin()
    ],
  },
  chainWebpack: (config) => {
    //Pug loader
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-plain-loader")
      .loader("pug-plain-loader");
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
