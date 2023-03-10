import { initializeApp } from "firebase/app";
import {
   initializeAuth, browserLocalPersistence,
   browserSessionPersistence, indexedDBLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin((_nuxtApp) => {

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
   const auth = initializeAuth(app, {
      persistence: [indexedDBLocalPersistence, browserSessionPersistence, browserLocalPersistence],
   });
   const db = getFirestore(app);
   const storage = getStorage(app)

   // console.log(auth)

   return { app, auth, db, storage }
});