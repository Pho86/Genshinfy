<template>
   <main>
      <section class="mb-8 py-20 text-white text-center relative">
         <div class="absolute inset-0 w-full h-full bg-contain introduction-bg main-banner"></div>
         <div class="container mx-auto">
            <div class="text-white main-header-content">
               <h1 class="font-bold text-5xl mb-5">About Genshinfy!</h1>
            </div>
         </div>

         <img class="relative block mx-auto mt-5 -mb-10 w-auto max-w-xs" src="~/assets/img/hutao-music.gif" />
      </section>
      <section class="container mx-auto">
         <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-6 border-b border-gray-200">
               <p>Genshinfy is a music streaming site, that was created as a <span class="font-bold">non-commercial personal project</span> as a way to practice using NuxtJS/Vue/Firebase. If a song needs to be taken down or if you have any questions, please contact me at <NuxtLink to="mailto:phoph@duck.com" target="_blank" class="text-yellow-500 font-bold">phoph@duck.com.</NuxtLink></p>

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
  background-image: url('~/assets/img/user-header.png');
  z-index: -1;
}
</style>