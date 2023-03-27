<script setup>
import Profile from "@/components/Profile.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const userState = useUserStore();
const {currentUserProfile} = storeToRefs(userState)
</script>

<template>
  <main>
    <Profile :key="$route.params.username"/>
  </main>
</template>