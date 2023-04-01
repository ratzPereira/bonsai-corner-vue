<script setup>
import {usePostsStore} from "@/stores/posts";
import {storeToRefs} from "pinia";
import MyPostsCards from "@/components/MyPostsCards.vue";

const postsStore = usePostsStore();
const {loading, myPosts} = storeToRefs(postsStore);

</script>

<template>

  <div>
    <MyPostsCards/>
  </div>
  <div v-if="loading" class="spinner">
    <ASpin/>
  </div>
</template>

<style scoped>

</style>