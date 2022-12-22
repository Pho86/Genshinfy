import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const useFirebase = () => {
   const runtimeConfig = useRuntimeConfig();

   const firebaseConfig = {
      apiKey: runtimeConfig.public.FIREBASE_apiKey,
      authDomain: runtimeConfig.public.FIREBASE_authDomain,
      projectId: runtimeConfig.public.FIREBASE_projectID,
      storageBucket: runtimeConfig.public.FIREBASE_storageBucket,
      messagingSenderId: runtimeConfig.public.FIREBASE_messageSenderID,
      appId: runtimeConfig.public.FIREBASE_appID
   };

   const firebaseApp = initializeApp(firebaseConfig);
   const firestore = getFirestore(firebaseApp);
   const firebaseAuth = getAuth(firebaseApp);


   return {
      firebaseApp,
      firestore,
      firebaseAuth
   }
}