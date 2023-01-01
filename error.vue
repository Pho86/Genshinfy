<template>
   <NuxtLayout>
      <NuxtLoadingIndicator color="#FFCF0D" />
      <transition name="fade" mode="out-in">
         <main>
            <section class="mb-8 py-20 text-white text-center relative ">
               <div class="absolute inset-0 w-full h-full bg-cover introduction-bg banner transition duration-500">
               </div>
               <div class="container mx-auto">
                  <div class="text-white main-header-content">
                     <h1 class="font-bold text-5xl mb-5">Sorry, an error has occured.</h1>
                  </div>
               </div>
            </section>
            <section class="container mx-auto">
               <div
                  class="bg-white rounded border border-gray-200 relative flex flex-col text-center dark:border-gray-500">
                  <div
                     class="px-6 pt-6 pb-6 border-b border-gray-200 flex flex-col items-center dark:bg-gray-700 dark:border-gray-500 dark:text-gray-50">
                     <p> We are sorry and apologize for any inconvenience that has occured. <NuxtLink
                           class="text-yellow-400" to="/">Please go back home.</NuxtLink>
                     </p>
                     <img class="justify-self-center" src="https://media.tenor.com/bN43FNYePAcAAAAi/hutao.gif"
                        alt="hand rubbing a chibi hu tao" width="250" />
                  </div>
               </div>
            </section>
         </main>
      </transition>
   </NuxtLayout>
</template>
   
<script lang="ts">
export default {
   name: "Error",
   layout: 'default',
}
</script>

<style scoped>
.banner {
   background-image: url('~/assets/img/header.png');
   z-index: -1;
}
</style>