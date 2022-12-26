<template>
  <header id="header" class="bg-slate-800">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <NuxtLink class="text-white font-bold uppercase text-2xl mr-4 no-active" to="/" exact-active-class="no-active">
        Genshinfy</NuxtLink>
      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <NuxtLink class="px-2 text-white" to="/about">About</NuxtLink>
          </li>
          <li>
            <NuxtLink class="px-2 text-white" to="/quotes">Quotes</NuxtLink>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Login / Register</a>
          </li>
          <template v-else>
            <li>
              <NuxtLink class="px-2 text-white" to="/manage">Manage</NuxtLink>
            </li>
            <li>
              <NuxtLink class="px-2 text-white" :to="'/favourites/'">Favourites</NuxtLink>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
      <div>
        <button @click.prevent="toggleDarkMode">
          <svg v-if="darkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-50" viewBox="0 0 20 20"
            fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-50" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { mapStores } from 'pinia';
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";
import { signOut } from '@firebase/auth';
import { firebaseAuth } from '@/composables/firebase';


export default {
  name: "Header",
  data() {
    return {
      darkMode: false,
    }
  },
  computed: {
    ...mapStores(useModalStore, useUserStore),
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
    signOut() {
      const auth = firebaseAuth();
      this.userStore.signout();
      signOut(auth).then(() => {
        if (this.$route.name === "manage") {
          this.$router.push("/")
        }

      }).catch((error) => {
        console.log(error)
      })
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
  },
  created() {
    // console.log(this.$colorMode)
  }
}
</script>
<script setup lang="ts">

</script>