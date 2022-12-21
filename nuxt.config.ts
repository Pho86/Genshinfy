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
      "~/plugins/vee-validate.js"
   ],
   build: {
      transpile: ["vee-validate"],
   }
})