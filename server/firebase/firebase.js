import { initializeApp } from "firebase/app";
// import "firebase/auth"

export default () => {
   const runtimeConfig = useRuntimeConfig();
   const firebaseConfig = {
      apiKey: runtimeConfig.public.FIREBASE_apiKey,
      authDomain: runtimeConfig.public.FIREBASE_authDomain,
      projectId: runtimeConfig.public.FIREBASE_projectID,
      storageBucket: runtimeConfig.public.FIREBASE_storageBucket,
      messagingSenderId: runtimeConfig.public.FIREBASE_messageSenderID,
      appId: runtimeConfig.public.FIREBASE_appID
   };
   return initializeApp(firebaseConfig)
}