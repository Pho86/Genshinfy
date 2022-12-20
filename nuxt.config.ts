export default {
   modules: ['@nuxtjs/tailwindcss'],
   buildModules:['@nuxtjs/fontawesome'],
   head: {
      link: [
         {
            rel: 'stylesheet',
            href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
            integrity: "sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU",
            crossorigin: "anonymous"
         },
         {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Roboto'
         }
      ]
   }
}