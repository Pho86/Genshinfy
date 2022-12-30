<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#FFCF0D" />
    <!-- <transition name="fade" mode="out-in" appear> -->
      <NuxtPage></NuxtPage>
    <!-- </transition> -->
  </NuxtLayout>

</template>


<script lang="ts">
import Header from "@/components/Header.vue"
import Auth from "@/components/Auth.vue"
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import { firebaseAuth } from "@/composables/firebase";
import Player from "@/components/Player.vue";
import { onAuthStateChanged } from "@firebase/auth";

export default {
  name: "App",
  components: {
    Header,
    Auth,
    Player
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  data() {
    return {
      auth: firebaseAuth(),
    }
  },
  async created() {
    const auth = this.auth;
    const authChange = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        this.userLoggedIn = true;
      }
    })
  }
}
</script>

<style>
@import 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
@import '~/assets/css/main.scss';

body {
  font-family: 'Merriweather Sans', sans-serif;
  transition: all 500ms;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(.25rem);
}
</style>