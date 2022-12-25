<template>
   <main>
      <!-- Music Header -->
      <section class="w-full mb-8 py-14 text-center text-white relative">
         <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg header"></div>
         <div class="container mx-auto flex items-center">
            <!-- Play/Pause Button -->
            <button type="button" class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
               @click.prevent="newSong(song)">
               <i class="fas fa-play"></i>
            </button>
            <button type="button"
               class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none ml-8"
               @click.prevent="addQueue(song)">
               <i class="fas fa-plus"></i>
            </button>
            <div class="z-50 text-left ml-8">
               <!-- Song Info -->
               <div class="text-3xl font-bold">{{ song.modified_name }}</div>
               <div>{{ song.genre }}</div>
            </div>
         </div>
      </section>
      <!-- Form -->
      <section class="container mx-auto mt-6" id="comments">
         <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
               <!-- Comment Count -->
               <span class="card-title">Comments {{ song.comment_count }}</span>
               <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
               <div class="text-white text-center font-bold p-4 mb-4" v-if="comment_show_alert"
                  :class="comment_alert_variant">
                  {{ comment_alert_message }}
               </div>
               <VForm :validation-schema="schema" @submit="addComment" v-if="userLoggedIn">
                  <VField as="textarea" name="comment"
                     class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                     placeholder="Your comment here..."></VField>
                  <VErrorMessage class="text-red-600" name="comment" />
                  <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 block"
                     :disabled="comment_in_submission">
                     Submit
                  </button>
               </VForm>
               <!-- Sort Comments -->
               <select v-model="sort"
                  class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                  <option value="1">Latest</option>
                  <option value="2">Oldest</option>
               </select>
            </div>
         </div>
      </section>
      <!-- Comments -->
      <ul class="container mx-auto">
         <li class="p-6 bg-gray-50 border border-gray-200" v-for="comment in sortedComments" :key="comment.docID">
            <!-- Comment Author -->
            <div class="mb-5">
               <div class="font-bold">{{ comment.name }}</div>
               <time>{{ comment.datePosted }}</time>
            </div>
            <p>
               {{ comment.content }}
            </p>
         </li>
      </ul>
   </main>
</template>

<script>
import { doc, getDoc, addDoc, collection, where, query, getDocs, updateDoc } from '@firebase/firestore';
import { mapState, mapActions } from 'pinia';
import useUserStore from "@/stores/user";
import usePlayerStore from "@/stores/player";
import { firebaseDB, firebaseAuth } from "@/composables/firebase";

export default {
   name: "Song",
   layout: "default",
   data() {
      return {
         song: {},
         schema: {
            comment: "required|min:3",
         },
         comment_in_submission: false,
         comment_show_alert: false,
         comment_alert_variant: 'bg-blue-500',
         comment_alert_message: 'Please wait! Your comment is being submitted.',
         comments: [],
         sort: "1",
         database: firebaseDB(),
         auth: firebaseAuth(),
      }
   },
   computed: {
      ...mapState(useUserStore, ["userLoggedIn"]),
      sortedComments() {
         return this.comments.slice().sort((a, b) => {
            if (this.sort === '1') {
               return new Date(b.datePosted) - new Date(a.datePosted);
            }
            return new Date(a.datePosted) - new Date(b.datePosted);
         });
      }
   },
   async beforeRouteEnter(to, from, next) {
      const db = await firebaseDB();
      const song = await doc(db, "songs", to.params.song);
      const songSnapshot = await getDoc(song);

      next((vm) => {
         if (!songSnapshot.exists()) {
            vm.$router.push({ name: 'home' })
            return;
         }
         const { sort } = vm.$route.query;

            vm.sort = sort === "1" || sort === "2" ? sort : "1"

            vm.song = songSnapshot.data();
            vm.getComments();

      })

   },
   created() {
   },
   methods: {
      ...mapActions(usePlayerStore, ["newSong", "addQueue"]),
      async addComment(values, { resetForm }) {
         const auth = this.auth;
         this.comment_in_submission = true;
         this.comment_show_alert = true;
         this.comment_alert_variant = 'bg-blue-500';
         this.comment_alert_message = 'Please wait! Your comment is being submitted.'

         const comment = {
            content: values.comment,
            datePosted: new Date().toString(),
            songID: this.$route.params.song,
            name: auth.currentUser.displayName,
            uid: auth.currentUser.uid,
         }
         const db = this.database;
         const addSong = await addDoc(collection(db, "comments"), comment);
         this.song.comment_count += 1;
         const currentDoc = await doc(db, "songs", this.$route.params.song)
         const currentSong = await updateDoc(currentDoc, {
            comment_count: this.song.comment_count
         })
         this.getComments();

         this.comment_in_submission = false;
         this.comment_alert_variant = 'bg-green-500';
         this.comment_alert_message = 'Comment added!';

         resetForm();
      },
      async getComments() {
         const db = this.database;

         const songCollection = await query(collection(db, "comments"), where('songID', '==', this.$route.params.song));
         const songSnapshots = await getDocs(songCollection);
         this.comments = [];

         songSnapshots.forEach((doc) => {
            this.comments.push({
               ...doc.data(),
               docID: doc.id,
            })
         })
      },

      watch: {
         sort(newVal) {
            if (newVal === this.$route.query.sort) {
               return
            }
            this.$router.push({
               query: {
                  sort: newVal,
               }
            })
         }
      }
   }
}
</script>

<style scoped>
.header {
   background-image: url('~/assets/img/song-header.png');
}
</style>