import SigmaUiNuxt from '../../../src/module';

export default defineNuxtConfig({
  modules: [SigmaUiNuxt],
  sigmaUi: {
    prefix: 'Ui',
    componentDir: './components/ui',
    tailwind: false,
  },
  compatibilityDate: '2026-10-01',
});
