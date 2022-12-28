<template>
   <li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50 dark:hover:bg-gray-500">
      <div>
         <NuxtLink :to="'/songs/' + song.docID" class="font-bold block text-gray-600 dark:text-gray-50 dark:hover:text-yellow-500" :class="currentlyPlaying">
            {{ song.modified_name }}
         </NuxtLink>
         <NuxtLink :to="'/profile/' + song.uid" class="text-gray-500 text-sm no-active-link dark:text-gray-50 dark:hover:text-yellow-500" >
            {{ song.display_name }} 
         </NuxtLink>
         <span class="text-gray-500 text-sm no-active-link dark:text-gray-50"> - </span> 
         <NuxtLink :to="'/album/' + song.album" class="text-gray-500 text-sm no-active-link dark:text-gray-50 dark:hover:text-yellow-500" >
            {{ song.album }}
         </NuxtLink>
         <template v-if="song.genre">
            <span class="text-gray-500 text-sm no-active-link dark:text-gray-50"> - </span> 
            <NuxtLink :to="'/genre/' + song.genre" class="text-gray-500 text-sm no-active-link dark:text-gray-50 dark:hover:text-yellow-500" >
               {{ song.genre }}
            </NuxtLink>
         </template>
      </div>

      <div class="text-gray-600 text-lg dark:text-gray-50">
         <NuxtLink :to="'/songs/' + song.docID + '#comments'" v-slot="{ navigate }">
            <span class="comments" @click="navigate">
               <i class="fa fa-comments text-gray-600 dark:text-gray-50"></i>
               {{ song.comment_count }}
            </span>
         </NuxtLink>
      </div>
   </li>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import usePlayerStore from "@/stores/player"
export default {
   name: "SongItem",
   data() {
      return {
         currentlyPlaying: ""
      }
   },
   props: {
      song: {
         required: true,
      }
   },
   methods:{
   },
   computed: {
      ...mapState(usePlayerStore, ["current_song"]),
      ...mapActions(usePlayerStore, ["sendSignal"])
   }
}
</script>

<script setup>

const { vIcon } = useVIcon()

</script>