<script setup>
import Navbar from "@/components/Navbar.vue";
import {useUserStore} from "@/stores/users";
import {onMounted} from "vue";

const userStore = useUserStore()

onMounted(() => {
  console.log('Loggin in in app.vue main component')
  userStore.getUser()
})
</script>

<template>
  <main>
    <Navbar></Navbar>
    <RouterView></RouterView>

  </main>
</template>

<style>

</style>
