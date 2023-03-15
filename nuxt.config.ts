// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
});
