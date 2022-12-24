import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: "en",
    messages: {
      en: {
        hello: 'Hello, traveller!'
      }
    }
  })

  vueApp.use(i18n)
})
