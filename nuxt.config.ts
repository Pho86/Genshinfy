export default defineNuxtConfig({
   app: {
      head: {
         charset: 'utf-16',
         viewport: 'width=500, initial-scale=1',
         title: 'Genshinfy Music',
         meta: [
            { name: 'description', content: 'Genshinfy is a platform that allows users to easily listen to music mainly from the game Genshin Impact. It offers a wide selection of songs from the game, making it easy for fans to enjoy their favorite music.' }
         ],
      },
      pageTransition: { name: 'fade', mode: 'out-in' },
   },
   modules: [
      '@nuxtjs/tailwindcss',
      '@nuxtjs/google-fonts',
      [
         '@pinia/nuxt',
         {
            autoImports: [
               'defineStore', // import { defineStore } from 'pinia'
               ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
            ],
         },

      ],
      '@pinia-plugin-persistedstate/nuxt',
   ],

   googleFonts: {
      families: {
         // Roboto: true,
         'Noto+Sans': true,
         'Merriweather+Sans': true,
      }
   },

   piniaPersistedstate: {
      cookieOptions: {
         sameSite: 'strict',
      },
      storage: 'localStorage'
   },

   plugins: [
      "~/plugins/vee-validate.js",
      "~/plugins/vee-validate-rules.ts",

   ],

   build: {
      transpile: ["vee-validate"],
      analyze: true
   },

   runtimeConfig: {
      // The private keys which are only available server-side
      apiSecret: '123',
      // Keys within public are also exposed client-side keys are added in a file called .env
      public: {
         FIREBASE_apiKey: process.env.NUXT_API_KEY || "default_api_key",
         FIREBASE_authDomain: process.env.NUXT_AUTH_DOMAIN || "default_auth_domain",
         FIREBASE_projectID: process.env.NUXT_PROJECT_ID || "default_project_id",
         FIREBASE_storageBucket: process.env.NUXT_STORAGE_BUCKET || "default_storage_bucket",
         FIREBASE_messageSenderID: process.env.NUXT_MESSAGING_SENDER_ID || "default_messaging_id",
         FIREBASE_appID: process.env.NUXT_APP_ID || "default_app_id",
      }
   },

})