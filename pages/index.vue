<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div class="absolute inset-0 w-full h-full bg-cover introduction-bg main-banner"></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Genshinfy Music!</h1>
          <p class="w-11/12 md:w-10/12 mx-auto">
            Genshinfy is a music streaming platform that allows users to easily listen to music. It offers a wide
            selection of songs from the game, making it easy for fans to enjoy their
            favourite music. (Any type or genre of music is fine to be
            uploaded.) <br><br> Whether you want to relax and listen to the game's soundtrack or get pumped up for
            battle, Genshinfy has you covered with its extensive collection of music. Whether you're a casual player or
            a hardcore fan, Genshinfy is a place for you to listen to music. 
          </p>
        </div>
      </div>

      <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full pointer-events-none"
        src="~/assets/img/introduction-music.png"
        alt="a collection of music players, a cassette, mp3 player, disc, radio, piano, cd, and headphones" />
    </section>

    <!-- <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 bg-white-500 relative flex flex-col dark:bg-gray-700 dark:border-gray-500">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 dark:border-gray-500"
          v-icon.right="'headphones-alt'">
          <span class="card-title dark:text-gray-100">Most Favourited Songs</span>
        </div>
        <ol class="flex flex-row justify-center gap-5">
          <song-card v-for="song in randomSongs" :key="song.docID" :song="song" />
        </ol>
      </div>
    </section> -->

    <!-- Main Content -->
    <section class="container mx-auto mt-10">
      <div
        class="bg-white rounded border border-gray-200 bg-white-500 relative flex flex-col dark:bg-gray-700 dark:border-gray-500 transition duration-500">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 dark:border-gray-500"
          v-icon.right="'headphones-alt'">
          <span class="card-title dark:text-gray-100">Songs</span>
          <!-- <div class="font-normal dark:text-gray-100 flex items-center mt-4 ">Sort By:
            <select v-model="sort"
              class="ml-2 block py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
              <option value="name(a-z)">Name(A-Z)</option>
              <option value="name(z-a)">Name(Z-A)</option>
              <option value="favourites">Favourites</option>
            </select>
          </div> -->


        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <app-song-item v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>

  </main>
</template>


<script>
import firebase from '@/server/firebase/firebase.ts';
import { getDocs, query, collection, limit, startAfter, getDoc, doc, orderBy } from '@firebase/firestore';
import AppSongItem from "@/components/SongItem.vue";

export default {
  name: "Home",
  layout: 'default',
  data() {
    return {
      songs: [],
      maxPerPage: 10,
      pendingRequest: false,
      sort: "name",
      randomSongs: [],
    }
  },
  components: {
    AppSongItem,
  },
  async created() {
    await this.getSongs();
    await this.getPopularSongs();
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
        const songCollection = await query(collection(db, "songs"), limit(this.maxPerPage), orderBy('modified_name', "asc"), startAfter(lastDoc));
        querySnapshot = await getDocs(songCollection);
      }

      else {
        const songCollection = await query(collection(db, "songs"), limit(this.maxPerPage), orderBy('modified_name', "asc"));
        querySnapshot = await getDocs(songCollection);
      }
      querySnapshot.forEach((doc) => {
        this.songs.push({
          ...doc.data(),
          docID: doc.id,
        })
      })
      this.pendingRequest = false;
    },
    async getPopularSongs() {
      const db = firebase().db;
      const songCollection = await query(collection(db, "songs"), limit(3), orderBy("favourited", "desc"));
      const querySnapshot = await getDocs(songCollection);
      querySnapshot.forEach((doc) => {
        this.randomSongs.push({
          ...doc.data(),
          docID: doc.id,
        })
      })
    }
  },

}
</script>

<script setup>
const { vIcon } = useVIcon()

</script>
<style scoped>
.main-banner {
  background-image: url('~/assets/img/header.png');
  z-index: -1;
}

</style>