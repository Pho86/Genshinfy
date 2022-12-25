<template>
   <main>
      <section class="mb-8 py-20 text-white text-center relative">
         <div class="absolute inset-0 w-full h-full bg-cover introduction-bg main-banner"></div>
         <div class="container mx-auto">
            <div class="text-white main-header-content">
               <h1 class="font-bold text-5xl mb-5">Get Random Anime Quotes.</h1>
            </div>
         </div>

         <img class="relative block mx-auto mt-5 -mb-10 w-auto" src="~/assets/img/hutao-wave.gif"/>
      </section>
      <section class="container mx-auto">
         <div class="bg-white rounded border border-gray-200 relative flex flex-col text-center">

            <div class="px-6 pt-6 pb-6 border-b border-gray-200 content-center">
               <template v-if="error">
                  <div>
                     <p>The hourly limit of 100 generated quotes has been reached. Please try again later.</p>
                  </div>
               </template>
               <template v-else>
                  <div>
                     <p class="font-bold text-lg">{{ quote.quote }}</p>
                     <p class="italic leading-loose">- {{ quote.character }} from <span class="">{{ quote.anime }}
                        </span></p>
                  </div>
                  <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-center mt-5"
                     @click.prevent="fetchQuote">Generate New Quote</button>
                  <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-yellow-600 float-center mt-5"
                     @click.prevent="copyQuote">Copy Quote</button>
               </template>

            </div>
         </div>
      </section>
   </main>
</template>

<script>

export default {
   name: "Quotes",
   layout: 'default',
   data() {
      return {
         quote: {},
         error: false,
      }
   },
   created() {
      if (Object.keys(this.quote).length === 0) {
         this.fetchQuote();
      }
   },
   methods: {
      async fetchQuote() {
         fetch("https://animechan.vercel.app/api/random")
            .then((response) => response.json())
            .then((quote) => {
               this.quote = quote;
            })
            .catch((error) => {
               console.log(error)
               this.error = true;
            });
      },
      copyQuote() {
         navigator.clipboard.writeText(this.quote.quote)
      }
   }
}
</script>

<style scoped>
.main-banner {
   background-image: url('~/assets/img/user-header.png');
   z-index: -1;
}
</style>