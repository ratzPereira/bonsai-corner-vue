<script setup>
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import Cards from "@/components/FeedCards.vue";
import LoginMessage from "@/components/LoginMessage.vue";

const userStore = useUserStore();

const {user, loadingUser} = storeToRefs(userStore);
</script>

<template>

  <div v-if="!loadingUser">
    <Cards v-if="user"/>
    <LoginMessage v-else/>
  </div>
  <div v-else class="spinner">
    <ASpin/>
  </div>

</template>

<style scoped>


.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}


</style>