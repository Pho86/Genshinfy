<template>
  <div>

    <Header />

    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div class="absolute inset-0 w-full h-full bg-contain introduction-bg main-banner"></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Genshinfy Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
            suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
            pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full" src="~/assets/img/introduction-music.png" />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <app-song-item v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>

    <!-- Player -->
    <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
      <!-- Track Info -->
      <div class="text-center">
        <span class="song-title font-bold">Song Title</span> by
        <span class="song-artist">Artist</span>
      </div>
      <div class="flex flex-nowrap gap-4 items-center">
        <!-- Play/Pause Button -->
        <button type="button">
          <i class="fa fa-play text-gray-500 text-xl"></i>
        </button>
        <!-- Current Position -->
        <div class="player-currenttime">00:00</div>
        <!-- Scrub Container  -->
        <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
          <!-- Player Ball -->
          <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" style="left: 50%">
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400" style="width: 50%"></span>
        </div>
        <!-- Duration -->
        <div class="player-duration">03:06</div>
      </div>
    </div>

    <Auth />
  </div>
</template>


<script>
import firebase from '@/server/firebase/firebase.ts';
import { where, getDocs, query, collection, limit, startAfter, getDoc, doc, orderBy } from '@firebase/firestore';
import AppSongItem from "@/components/SongItem.vue"
export default {
  name: "Home",
  layout: 'default',
  data() {
    return {
      songs: [],
      maxPerPage: 10,
      pendingRequest: false,
    }
  },
  components: {
    AppSongItem
  },
  async created() {
    this.getSongs();

    if (process.client) {
      // console.log(window.innerWidth, window.innerHeight);
      window.addEventListener("scroll", this.handleScroll)
    }
  },
  beforeUnmount() {
    if (process.client) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  methods: {
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
      const db = firebase().db;
      let querySnapshot;

      if (this.songs.length) {
        const lastDocRef = doc(db, "songs", (this.songs[this.songs.length - 1].docID))
        const lastDoc = await getDoc(lastDocRef)
        const songCollection = await query(collection(db, "songs"), limit(this.maxPerPage), orderBy('modified_name'), startAfter(lastDoc));
        querySnapshot = await getDocs(songCollection);
      }

      else {
        const songCollection = await query(collection(db, "songs"), limit(this.maxPerPage), orderBy('modified_name'));
        querySnapshot = await getDocs(songCollection);
      }
      querySnapshot.forEach((doc) => {
        this.songs.push({
          ...doc.data(),
          docID: doc.id,
        })
      })
      this.pendingRequest = false;
    }
  },

}
</script>

<style>

</style>