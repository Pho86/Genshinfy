<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div class="absolute inset-0 w-full h-full bg-cover introduction-bg main-banner"></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Genshinfy Music!</h1>
          <p class="w-11/12 md:w-10/12 mx-auto">
            Genshinfy is a music streaming platform that allows users to easily listen to music mainly from the game Genshin Impact. It offers a wide selection of songs from the game, making it easy for fans to enjoy their favourite music. <br><br> Whether you want to relax and listen to the game's soundtrack or get pumped up for battle, Genshinfy has you covered with its extensive collection of music. Whether you're a casual player or a hardcore fan, Genshinfy is a place for you to listen to music. (Any type or genre of music is fine to be uploaded.)
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
          <span class="card-title dark:text-gray-100">Recommended Songs</span>
        </div>
      </div>
    </section> -->

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
    }
  },
  components: {
    AppSongItem
  },
  async created() {
    await this.getSongs();
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

<script setup>

const { vIcon } = useVIcon()

</script>
<style>

</style>