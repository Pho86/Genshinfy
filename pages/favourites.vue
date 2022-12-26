<template>
   <main>
      <!-- Introduction -->
      <section class="w-full mb-8 py-14 text-center text-white relative">
         <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg header"></div>
         <div class="container mx-auto flex items-center">
            <!-- Play/Pause Button -->
            <button type="button" class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
               @click.prevent="playPlaylist(songs)">
               <i class="fas fa-play"></i>
            </button>
            <button type="button"
               class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none ml-8"
               @click.prevent="randomizePlaylist(songs)">
               <i class="fas fa-random"></i>
            </button>
            <div class="z-50 text-left ml-8">
               <!-- Song Info -->
               <div class="text-3xl font-bold">Your Favourites</div>
               <div>{{ auth.currentUser.displayName }}</div>
            </div>
         </div>
      </section>

      <!-- Main Content -->
      <section class="container mx-auto">
         <div
            class="bg-white rounded border border-gray-200 bg-white-500 relative flex flex-col dark:bg-gray-700 dark:border-gray-500">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 dark:border-gray-500"
               v-icon.right="'headphones-alt'">
               <span class="card-title dark:text-gray-100">Songs</span>
            </div>
            <!-- Playlist -->
            <ol id="playlist">
               <app-song-item v-for="song in songs" :key="song.docID" :song="song" />
            </ol>
            <!-- .. end Playlist -->
         </div>
      </section>

      <Auth />
   </main>
</template>
 
 
<script>
import { getDocs, query, collection, limit, startAfter, getDoc, doc, orderBy, where } from '@firebase/firestore';
import AppSongItem from "@/components/SongItem.vue";
import { firebaseDB, firebaseAuth } from '@/composables/firebase';
import { mapActions } from 'pinia';
import usePlayerStore from "@/stores/player"

export default {
   name: "Favourites",
   layout: 'default',
   data() {
      return {
         songs: [],
         maxPerPage: 10,
         pendingRequest: false,
         database: firebaseDB(),
         auth: firebaseAuth(),
         songIDs: [],
      }
   },
   components: {
      AppSongItem
   },
   async created() {
      this.getSongs();

      if (process.client) {
         window.addEventListener("scroll", this.handleScroll)
      }
   },
   beforeUnmount() {
      if (process.client) {
         window.removeEventListener("scroll", this.handleScroll);
      }
   },
   methods: {
      ...mapActions(usePlayerStore, ["playPlaylist", "randomizePlaylist"]),

      handleScroll() {
         const { scrollTop, offsetHeight } = document.documentElement;
         const { innerHeight } = window;
         // calculates the bottom of the window
         const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

         if (bottomOfWindow) {
            this.getSongs();
         }
      },
      async getSongs() {
         if (this.pendingRequest) {
            return;
         }
         this.pendingRequest = true;
         const auth = this.auth;
         const db = this.database;

         const favouriteCollection = await query(collection(db, "favourites"), where('uid', '==', auth.currentUser.uid));
         const favSnapshots = await getDocs(favouriteCollection);
         let favDocIDs = [];
         favSnapshots.forEach((doc) => {
            favDocIDs.push(doc.data().songID)
         });

         let querySnapshot;
         let songCollection;

         if (this.songs.length) {
            const lastDocRef = doc(db, "songs", (this.songs[this.songs.length - 1].docID))
            const lastDoc = await getDoc(lastDocRef)
            for (let i = 0; i < favDocIDs.length; i++) {
               songCollection = query(collection(db, "songs"), limit(this.maxPerPage), where("docID", "==", favDocIDs[i]), orderBy('modified_name'), startAfter(lastDoc));
               querySnapshot = await getDocs(songCollection);
               querySnapshot.forEach((doc) => {
                  console.log(doc.data())
                  this.songs.push({
                     ...doc.data(),
                     docID: doc.id,
                  })
               })
            }
         }
         else {
            for (let i = 0; i < favDocIDs.length; i++) {
               songCollection = query(collection(db, "songs"), limit(this.maxPerPage), where("docID", "==", favDocIDs[i]), orderBy('modified_name'));
               querySnapshot = await getDocs(songCollection);
               querySnapshot.forEach((doc) => {
                  console.log(doc.data())
                  this.songs.push({
                     ...doc.data(),
                     docID: doc.id,
                  })
               })
            }
         }
         this.pendingRequest = false;
      }
   },

}
</script>
 
<script setup>
const { vIcon } = useVIcon()

</script>

<style>
.header {
   background-image: url('~/assets/img/song-header.png');
}
</style>