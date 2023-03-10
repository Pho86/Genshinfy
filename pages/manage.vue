<template>
   <main>
      <section class="container mx-auto mt-6">
         <div class="md:grid md:grid-cols-3 md:gap-4 transition duration-500">
            <app-upload :addSong="addSongInfo" />
            <div class="col-span-2 ">
               <div
                  class="bg-white rounded border border-gray-200 relative flex flex-col dark:bg-gray-700 dark:border-gray-500 dark:text-gray-50 transition duration-500">
                  <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 dark:border-gray-500">
                     <span class="card-title">My Songs</span>
                     <i class="fa fa-compact-disc float-right text-sky-400 text-2xl"></i>
                  </div>
                  <div class="p-6">
                     <composition-item v-if="songs.length > 0" v-for="(song, i) in songs" :key="song.docID" :song="song"
                        :updateSong="updateSong" :index="i" :removeSong="removeSong"
                        :updateUnsavedFlag="updateUnsavedFlag" />
                     <p v-else>No songs uploaded 😖</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </main>
</template>

<script>
import useUserStore from '@/stores/user';
import AppUpload from "@/components/Upload.vue";
import CompositionItem from "@/components/CompositionItem.vue";

import { where, getDocs, query, collection, orderBy } from '@firebase/firestore';
import { firebaseDB, firebaseAuth, firebaseStorage } from "@/composables/firebase";

export default {
   name: "Manage",
   layout: 'default',
   components: {
      AppUpload,
      CompositionItem
   },
   data() {
      return {
         songs: [],
         unsavedFlag: false,
         database: firebaseDB(),
         auth: firebaseAuth(),
         storage: firebaseStorage()
      }
   },
   beforeRouteEnter(to, from, next) {
      const store = useUserStore();
      if (store.userLoggedIn) {
         next();
      } else {
         next('/')
      }
   },
   async created() {
      const auth = this.auth;
      const db = this.database;
      if (this.auth.currentUser) {
         const songCollection = await query(collection(db, "songs"), where("uid", "==", auth.currentUser.uid), orderBy("upload_date", "desc"));
         const querySnapshot = await getDocs(songCollection);
         querySnapshot.forEach(this.addSong);
      } else {
         this.$router.push('/')
      }
   },
   methods: {
      updateSong(i, values) {
         this.songs[i].modified_name = values.modified_name;
         this.songs[i].genre = values.genre;
      },
      removeSong(i) {
         this.songs.splice(i, 1);
      },
      addSong(doc) {
         const song = {
            ...doc.data(),
            docID: doc.id,
         }
         this.songs.push(song)
      },
      addSongInfo(song) {
         this.songs.push(song)
      },
      updateUnsavedFlag(value) {
         this.unsavedFlag = value;
      }
   },
   beforeRouteLeave(to, from, next) {
      if (!this.unsavedFlag) {
         next();
      } else {
         const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
         next(leave);
      }
   }
}
</script>