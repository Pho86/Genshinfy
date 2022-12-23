import { initializeApp } from "firebase/app";
import {
   getAuth,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin((nuxtApp) => {

   const runtimeConfig = useRuntimeConfig();

   const firebaseConfig = {
      apiKey: runtimeConfig.public.FIREBASE_apiKey,
      authDomain: runtimeConfig.public.FIREBASE_authDomain,
      projectId: runtimeConfig.public.FIREBASE_projectID,
      storageBucket: runtimeConfig.public.FIREBASE_storageBucket,
      messagingSenderId: runtimeConfig.public.FIREBASE_messageSenderID,
      appId: runtimeConfig.public.FIREBASE_appID
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const db = getFirestore(app);
   const storage = getStorage(app)
   
   const usersCollection = collection(db, 'users');
   // console.log(auth)

   return { app, auth, db, usersCollection, storage }
});