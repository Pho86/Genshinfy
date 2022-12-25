import firebase from "@/server/firebase/firebase";

export const firebaseDB = () => {
   const db = firebase().db
   return db
}

export const firebaseAuth = () => {
   const auth = firebase().auth;
   return auth
}

export const firebaseStorage = () => {
   const storage = firebase().storage;
   return storage
}