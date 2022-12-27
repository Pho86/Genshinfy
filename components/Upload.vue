<template>
   <div class="col-span-1">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col dark:border-gray-500">
         <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 dark:bg-gray-700 dark:border-gray-500">
            <span class="card-title dark:text-gray-50">Upload</span>
            <i class="fas fa-upload float-right text-sky-400 text-2xl"></i>
         </div>
         <div class="p-6 dark:bg-gray-700 dark:border-gray-500">
            <!-- Upload Dropbox -->
            <div
               class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-sky-400 hover:border-sky-400 hover:border-solid dark:bg-gray-600"
               :class="{ 'bg-sky-400 border-sky-400 border-solid': is_dragover }" @drag.prevent.stop=""
               @dragstart.prevent.stop="" @dragend.prevent.stop="is_dragover = false"
               @dragover.prevent.stop="is_dragover = true" @dragenter.prevent.stop="is_dragover = true"
               @dragleave.prevent.stop="is_dragover = false" @drop.prevent.stop="upload($event)">
               <h5>Drop your files here</h5>
            </div>
            <input class="dark:text-gray-50" type="file" multiple @change="upload($event)" />
            <hr class="my-6 dark:border-gray-400" />
            <!-- Progess Bars -->
            <div class="mb-4" v-for="upload in uploads" :key="upload.name">
               <div class="font-bold text-sm dark:text-gray-50" :class="upload.text_class">
                  <i :class="upload.icon"></i> {{ upload.name }}
               </div>
               <div class="flex h-4 overflow-hidden bg-gray-200 rounded dark:bg-gray-700">
                  <div class="transition-all progress-bar bg-blue-400" :style="{ width: upload.current_progress + '%' }"
                     :class="upload.variant">
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, doc, collection, getDoc, updateDoc } from '@firebase/firestore';
import { firebaseDB, firebaseAuth, firebaseStorage } from "@/composables/firebase";
export default {
   name: "Upload",
   data() {
      return {
         is_dragover: false,
         uploads: [],
         database: firebaseDB(),
         auth: firebaseAuth(),
         storage: firebaseStorage(),
      }
   },
   props: {
      addSong: {
         type: Function,
      }
   },
   methods: {
      async upload($event) {
         this.is_dragover = false;
         const storage = await this.storage;
         const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];
         files.forEach((file) => {
            if (file.type !== 'audio/mpeg') {
               return;
            }
            const storageRef = ref(storage, `songs/${file.name}`);
            const metadata = {
               contentType: "audio/mpeg",
            };
            const uploadFile = uploadBytesResumable(storageRef, file, metadata);
            const uploadIndex = this.uploads.push({
               uploadFile,
               current_progress: 0,
               name: file.name,
               variant: 'bg-blue-400',
               icon: 'fas fa-spinner fa-spin',
               text_class: '',
            }) - 1;

            uploadFile.on('state_changed', (snapshot) => {
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               this.uploads[uploadIndex].current_progress = progress;
            }, (error) => {

               this.uploads[uploadIndex].variant = 'bg-red-400';
               this.uploads[uploadIndex].icon = 'fas fa-times';
               this.uploads[uploadIndex].text_class = 'text-red-400';

            }, async () => {

               const auth = this.auth
               const song = {
                  uid: auth.currentUser.uid,
                  display_name: auth.currentUser.displayName,
                  original_name: uploadFile.snapshot.ref.name,
                  modified_name: uploadFile.snapshot.ref.name,
                  genre: '',
                  comment_count: 0,
                  album: "default"
               };
               song.url = await getDownloadURL(uploadFile.snapshot.ref)
               const db = this.database;

               const songRef = await addDoc(collection(db, "songs"), song)
               const docRef = await doc(db, "songs", songRef.id)
               const docSnap = await getDoc(docRef)
               if (docSnap.exists()) {
                  const song = {
                     ...docSnap.data(),
                     docID: docSnap.id,
                  }
                  const update = await updateDoc(docRef, {
                     docID: song.docID
                  })
                  this.addSong(song);
               }

               this.uploads[uploadIndex].variant = 'bg-sky-400';
               this.uploads[uploadIndex].icon = 'fas fa-check';
               this.uploads[uploadIndex].text_class = 'text-sky-400';
               this.uploads[uploadIndex].text_class = 'dark:text-sky-400';
            });
         })
      },
      cancelUploads() {
         this.uploads.forEach((upload) => {
            upload.uploadFile.cancel();
         })
      }
   },
   beforeUnmount() {
      this.uploads.forEach((upload) => {
         upload.uploadFile.cancel();
      })
   }
}
</script>