<script setup>
import Profile from "@/components/Profile.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import Footer from "@/components/Footer.vue";

const userState = useUserStore();
const {currentUserProfile} = storeToRefs(userState)
</script>

<template>
  <main>
    <Profile :key="$route.params.username"/>
  </main>
  <Footer></Footer>
</template>