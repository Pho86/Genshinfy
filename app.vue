<template>
<NuxtLayout>
  <NuxtPage></NuxtPage>
</NuxtLayout>

</template>


<script >
import Header from "@/components/Header.vue"
import Auth from "@/components/Auth.vue"
export default {
  name: "App",
  components:{
    Header,
    Auth,
  }
}
</script>

<style>
@import 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
@import '~/assets/css/main.css';

.main-banner {
   background-image: url('~/assets/img/header.png');
   z-index: -1 ;
}

</style>