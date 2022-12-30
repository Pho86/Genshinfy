<template>
   <main>
      <section class="mb-8 py-20 text-white text-center relative">
         <div class="absolute inset-0 w-full h-full bg-cover introduction-bg main-banner"></div>
         <div class="container mx-auto">
            <div class="text-white main-header-content">
               <h1 class="font-bold text-5xl mb-5">About Genshinfy!</h1>
            </div>
         </div>

         <img class="relative block mx-auto mt-5 -mb-10 w-auto max-w-xs" src="~/assets/img/hutao-music.gif" alt="hu tao dancing while listening to music and wearing headphones"/>
      </section>
      <section class="container mx-auto">
         <div class="bg-white rounded border border-gray-200 relative flex flex-col ">
            <div class="px-6 pt-6 pb-6 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-50 transition duration-500">
               <p>Genshinfy is a music streaming site, created as a non-commercial
                     personal project to practice using Nuxt 3/Firebase. If you want something taken down or
                  if you have any questions, please contact me at <NuxtLink to="mailto:phoph@duck.com" target="_blank"
                     class="text-yellow-500 font-bold">phoph@duck.com.</NuxtLink> The site currently only accepts mp3 files under 10MB. Any type of music is fine to be uploaded.
                  <br> <br>
                  The loop button, only loops the current song. To have songs auto-play after another song, multiple songs must be favourited, and then
                  played through the favourite page or played through an album or genre. Currently if you press randomize playlist, there is no option to turn it off. Sorry for the inconvenience. More features will come out soon.
               </p>

            </div>
         </div>
      </section>


   </main>
</template>

<script>

export default {
   name: "About",
   layout: 'default',
}
</script>

<style scoped>

.main-banner {
   background-image: url('~/assets/img/about-header.png');
   z-index: -1;
}
</style>