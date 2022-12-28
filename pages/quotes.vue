<template>
   <main>
      <section class="mb-8 py-20 text-white text-center relative">
         <div class="absolute inset-0 w-full h-full bg-cover introduction-bg main-banner"></div>
         <div class="container mx-auto">
            <div class="text-white main-header-content">
               <h1 class="font-bold text-5xl mb-5">Get Random Anime Quotes</h1>
            </div>
         </div>

         <img class="relative block mx-auto mt-5 -mb-10 w-40" src="~/assets/img/hutao-wave.gif" 
            alt="hu tao waving her hands repeatedly" />
      </section>
      <section class="container mx-auto">
         <div
            class="bg-white rounded border border-gray-200 relative flex flex-col text-center dark:bg-gray-700 dark:border-gray-500 dark:text-gray-50 transition duration-500">
            <div class="px-6 pt-6 pb-6 content-center">
               <template v-if="loading">
                  <div>
                     <p class="text-4xl text-slate-800">
                        <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                     </p>
                  </div>
               </template>
               <template v-else-if="error">
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
                  <button
                     class="ml-1 py-2 px-3 text-sm rounded text-white bg-sky-700 float-center mt-4 hover:bg-sky-900"
                     @click.prevent="fetchQuote">Generate New Quote</button>
                  <button
                     class="ml-1 py-2 px-3 text-sm rounded text-white bg-amber-600 float-center mt-4 hover:bg-amber-900"
                     @click.prevent="copyQuote">
                     <p v-if="!copied">Copy Quote</p>
                     <p v-else>Copied!</p>
                  </button>
               </template>

            </div>
         </div>
      </section>

   </main>
</template>

<script>
import fetchQuoteFromAnimeApi from "@/server/api/anime"
export default {
   name: "Quotes",
   layout: 'default',
   data() {
      return {
         quote: {},
         loading: true,
         error: true,
         copied: false,
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
               this.error = false;
               this.loading = false;
               this.quote = quote;
            })
            .catch((error) => {
               console.log(error)
               this.loading = false;
               this.error = true;
            });
      },
      copyQuote() {
         navigator.clipboard.writeText(this.quote.quote);
         this.copied = true;
      }
   }
}
</script>

<style scoped>
.main-banner {
   background-image: url('~/assets/img/about-header.png');
   z-index: -1;
}
</style>