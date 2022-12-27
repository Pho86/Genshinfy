<template>
   <main>
      <!-- Introduction -->
      <section class="w-full mb-8 py-14 text-center text-white relative">
         <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg header"></div>
         <div class="container mx-auto flex items-center">
            <!-- Play/Pause Button -->
            <button type="button"
               class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none hover:text-blue-600"
               @click.prevent="playPlaylist(song)">
               <i class="fas fa-play"></i>
            </button>
            <button type="button"
               class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none ml-8 hover:text-blue-600"
               @click.prevent="randomizePlaylist(songs)">
               <i class="fas fa-random"></i>
            </button>
            <div class="z-50 text-left ml-8">
               <!-- Song Info -->
               <div v-if="!user" class="text-3xl font-bold">This user does not exist or have any songs uploaded</div>
               <div v-else>
                  <p class="text-3xl font-bold">Songs uploaded by {{ user.name }}</p>
                  <p v-if="user.favourited > 0">Their songs have been favourited {{ user.favourited }} times.</p>
                  <p v-else>Their songs have not been favourited.</p>
               </div>
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
   name: "Profile",
   layout: 'default',
   data() {
      return {
         songs: [],
         maxPerPage: 10,
         pendingRequest: false,
         database: firebaseDB(),
         auth: firebaseAuth(),
         songIDs: [],
         user: ''
      }
   },
   components: {
      AppSongItem
   },
   async created() {
      this.getSongs();
      this.getUser();
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
         const db = this.database;

         let querySnapshot;
         let songCollection;

         if (this.songs.length) {
            const lastDocRef = doc(db, "songs", (this.songs[this.songs.length - 1].docID))
            const lastDoc = await getDoc(lastDocRef)
            songCollection = query(collection(db, "songs"), limit(this.maxPerPage), where("uid", "==", this.$route.params.user), orderBy('modified_name'), startAfter(lastDoc));
            querySnapshot = await getDocs(songCollection);
            querySnapshot.forEach((doc) => {
               this.songs.push({
                  ...doc.data(),
                  docID: doc.id,
               })
            })
         }

         else {
            songCollection = query(collection(db, "songs"), limit(this.maxPerPage), where("uid", "==", this.$route.params.user), orderBy('modified_name'));
            querySnapshot = await getDocs(songCollection);
            querySnapshot.forEach((doc) => {
               this.songs.push({
                  ...doc.data(),
                  docID: doc.id,
               })
            })
         }
         this.pendingRequest = false;
      },
      async getUser() {
         const db = this.database;
         const docRef = doc(db, "users", this.$route.params.user);
         const currentUser = await getDoc(docRef)
         if (currentUser.exists()) {
            this.user = currentUser.data()
         } else {
            this.user = false;
         }
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