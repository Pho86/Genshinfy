<template>
   <Header />

   <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
         <app-upload />
         <div class="col-span-2">
            <div class="bg-white rounded border border-gray-200 relative flex flex-col">
               <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                  <span class="card-title">My Songs</span>
                  <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
               </div>
               <div class="p-6">
                  <composition-item v-for="(song, i) in songs" :key="song.docID" :song="song" :updateSong="updateSong" :index="i" :removeSong="removeSong"/>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script lang="ts">
import useUserStore from '@/stores/user';
import AppUpload from "@/components/Upload.vue";
import CompositionItem from "@/components/CompositionItem.vue";

import firebase from '@/server/firebase/firebase.ts';
import { where, getDocs, query, collection } from '@firebase/firestore';
export default {
   name: "Manage",
   layout: 'default',
   components: {
      AppUpload,
      CompositionItem
   },
   data() {
      return {
         songs: []
      }
   },
   beforeRouteEnter(to, from, next) {
      const store = useUserStore();
      if (store.userLoggedIn) {
         next();
      } else {
         next();
      }
      // next({ name: "About" })
   },
   async created() {
      const auth = firebase().auth;
      const db = firebase().db;
      const songCollection = await query(collection(db, "songs"), where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(songCollection);
      querySnapshot.forEach((doc) => {
         const song = {
            ...doc.data(),
            docID: doc.id,
         }
         console.log(song)
         this.songs.push(song)
         
      });
   },
   methods:{
      updateSong(i, values) {
         this.songs[i].modified_name = values.modified_name;
         this.songs[i].genre = values.genre;
      },
      removeSong(i) {
         this.songs.splice(i, 1);
      }
   }
   // beforeRouteLeave(to, from, next) {
   //    this.$refs.upload.cancelUploads()
   //    next()
   // },
}
</script>