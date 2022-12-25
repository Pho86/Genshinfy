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
              <NuxtLink class="px-2 text-white" to="/favourites">Favourites</NuxtLink>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from 'pinia';
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user"

export default {
  name: "Header",
  computed: {
    ...mapStores(useModalStore, useUserStore),
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
    signOut() {
      this.userStore.signout();
      if (this.$route.name === "manage") {
        this.$router.push("/")
      }
    }
  },
}
</script>