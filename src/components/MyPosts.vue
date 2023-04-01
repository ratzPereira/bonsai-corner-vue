<script setup>
import {onMounted} from "vue";
import {usePostsStore} from "@/stores/posts";

const postsStore = usePostsStore();

onMounted(() => {
  postsStore.getMyPosts()
})
</script>

<template>

</template>

<style scoped>

</style>