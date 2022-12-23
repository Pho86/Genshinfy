<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>

</template>

<script setup>

</script>


<script>
import Header from "@/components/Header.vue"
import Auth from "@/components/Auth.vue"
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import firebase from '@/server/firebase/firebase.ts';


export default {
  name: "App",
  components: {
    Header,
    Auth,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"])
  },
  data() {
    return {
      auth: {},
    }
  },
  async created() {
    this.auth = await firebase().auth;
    if (this.auth.currentUser) {
      this.userLoggedIn = true
    }
    else {
      this.userLoggedIn = true
    }
  }
}

</script>

<style>
@import 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
@import '~/assets/css/main.css';

.main-banner {
  background-image: url('~/assets/img/header.png');
  z-index: -1;
}
</style>