import firebase from '@/server/firebase/firebase.ts';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';

export default defineStore("user", {
   state: () => ({
      userLoggedIn: false,
   }),
   actions: {
      async register(values) {
         const auth = firebase().auth;
         const db = firebase().db;
         const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password);

         const usersRef = await setDoc(doc(db, "users", userCred.user.uid), {
            name: values.name,
            email: values.email,
            age: values.age,
            country: values.country,
            favourited: 0
         });

         const userUpdate = await updateProfile(userCred.user, {
            displayName: values.name
         })
         this.userLoggedIn = true;
      },
      async authenticate(values) {
         const auth = firebase().auth;
         const userCred = await signInWithEmailAndPassword(auth, values.email, values.password);
         this.userLoggedIn = true;
      },
      async signout() {
         const auth = firebase().auth;
         await signOut(auth)
         this.userLoggedIn = false;
      }
   },
});
