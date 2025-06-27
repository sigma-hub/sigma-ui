export default defineNuxtConfig({
  modules: ['sigma-ui-nuxt'],
  sigmaUi: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./src/components/ui"
     */
    componentDir: './src/components/ui',
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-02-06',
  css: ['./src/assets/index.css'],
});
