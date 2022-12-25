<template>
   <!-- Player -->
   <div class="fixed bottom-0 left-0 bg-white px-8 py-3 w-screen">
      <!-- Track Info -->
      <div class="text-center" v-if="current_song.modified_name">
         <span class="song-title font-bold">{{ current_song.modified_name }}</span> by
         <span class="song-artist">{{ current_song.display_name }}</span>
      </div>
      <div class="flex flex-nowrap gap-4 items-center">
         <!-- Play/Pause Button -->
         <button type="button" @click.prevent="toggleAudio">
            <i class="fa text-gray-500 text-xl" :class="{ 'fa-play': !playing, 'fa-pause': playing }"></i>
         </button>
         <!-- Current Position -->
         <div class="player-currenttime">{{ seek }}</div>
         <!-- Scrub Container  -->
         <div @click.prevent="updateSeek" class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
            <!-- Player Ball -->
            <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" :style="{ left: playerProgress }">
               <i class="fas fa-circle"></i>
            </span>
            <!-- Player Progress Bar-->
            <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
               :style="{ width: playerProgress }"></span>
         </div>
         <!-- Duration -->
         <div class="player-duration">{{ duration }}</div>
         <button type="button" @click.prevent="toggleLoop">
            <i class="fas fa-repeat" :class="loop_class"></i>
         </button>
      </div>
   </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import usePlayerStore from "@/stores/player";

export default {
   name: "Player",
   data() {
      return {
         looping: false,
         loop_class: "text-gray-500",
      }
   },
   methods: {
      ...mapActions(usePlayerStore, ["toggleAudio", "updateSeek", "toggleLoop"]),
      async toggleLoop() {
         this.looping = !this.looping;
         if (this.looping === false) {
            this.loop_class = "text-grey-400";
            this.loop = this.looping
         } else {
            this.loop = this.looping
            this.loop_class = "text-green-500";
         }
      }
   },
   computed: {
      ...mapState(usePlayerStore, ["playing", "duration", "seek", "playerProgress", "current_song"]),
      ...mapWritableState(usePlayerStore, ["loop"])
   }
}
</script>