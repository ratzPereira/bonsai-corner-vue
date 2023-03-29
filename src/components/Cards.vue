<script setup>

import Card from "@/components/Card.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {usePostsStore} from "@/stores/posts";

const userStore = useUserStore()
const {user} = storeToRefs(userStore);
const postStore = usePostsStore()
const {posts} = storeToRefs(postStore);

const lastCardIndex = ref(2)
const owner_ids = ref([])
const reachEnd = ref(false)

const fetchData = async () => {
  await postStore.getPosts()
}

const fetchNextSet = async () => {
}

onMounted(() => {
  console.log(Array(posts).length)
  console.log(posts)
  fetchData()
})

</script>

<template>
  <div class="timeline-container">
    <Card
        v-for="post in posts"
        :key="post.id"
        :post="post">
    </Card>
    <!--    <Observer v-if="posts.length" @intersecting="fetchNextSet"></Observer>-->
  </div>
</template>


<style scoped>

.timeline-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

</style>