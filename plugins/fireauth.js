import firebase from '@/server/firebase/firebase.ts'
import { onAuthStateChanged } from "@firebase/auth";
import { mapWritableState } from 'pinia';
import useUserStore from "@/stores/user";
// import {useStore } from 'pinia'
// export default defineNuxtPlugin(async (nuxtApp) => {
//    const auth = firebase().auth;
//    let app = false;
//    console.log(auth)
   
//    if (app === false) {
//       auth.onAuthStateChanged(() => {
//          if (auth.currentUser) {
//             const run = mapWritableState(useUserStore, ["userLoggedIn"])
//             console.log(run)
//             // userLoggedIn = true
//             // piniaauth()

//             // piniaauth.methods.user = true
//             // console.log(piniaauth.methods.user = true)
//             // console.log(mapWritableState(useUserStore, ["userLoggedIn"]))
//             // console.log(auth.currentUser)
//             // const x = useStore()
//             // this.userStore = true;
//          }
//       })
//    }
// });

export default defineNuxtPlugin(() => {

})