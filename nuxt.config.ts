// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    accessKeyId: "",
    bucket: "",
    region: "",
    secret_access_key: "",

    prefixPath: "js/form",
    ahaformBaseCdn: "https://ecstatic.ptengine.com/sdk/ahaform/ahaform.js",
    ahaformTemplateCdn:
      "https://ecstatic.ptengine.com/sdk/ahaform/ahaform.template.js",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@element-plus/nuxt"],
  //ts-ignore
  elementPlus: {
    /** Options */
  },
});
