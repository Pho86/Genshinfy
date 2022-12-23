export default defineNuxtConfig({
   modules: [
      '@nuxtjs/tailwindcss',
      [
         '@pinia/nuxt',
         {
            autoImports: [
               // automatically imports `defineStore`
               'defineStore', // import { defineStore } from 'pinia'
               // automatically imports `defineStore` as `definePiniaStore`
               ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
            ],
         },
      ],
   ],
   plugins: [
      "~/plugins/vee-validate.js",
   ],
   build: {
      transpile: ["vee-validate"],
   },
   runtimeConfig: {
      // The private keys which are only available server-side
      apiSecret: '123',
      // Keys within public are also exposed client-side
      public: {
         FIREBASE_apiKey: process.env.NUXT_API_KEY || "default_api_key",
         FIREBASE_authDomain: process.env.NUXT_AUTH_DOMAIN || "default_auth_domain",
         FIREBASE_projectID: process.env.NUXT_PROJECT_ID || "default_project_id",
         FIREBASE_storageBucket: process.env.NUXT_STORAGE_BUCKET || "default_storage_bucket",
         FIREBASE_messageSenderID: process.env.NUXT_MESSAGING_SENDER_ID || "default_messaging_id",
         FIREBASE_appID: process.env.NUXT_APP_ID || "default_app_id",
      }
   }
})