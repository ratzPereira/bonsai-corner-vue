<script setup>

import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import {usePostsStore} from "@/stores/posts";
import MyPostsCard from "@/components/MyPostsCard.vue";

const userStore = useUserStore()
const {user} = storeToRefs(userStore);
const postStore = usePostsStore()
const {myPosts} = storeToRefs(postStore);

// const lastCardIndex = ref(2)
// const owner_ids = ref([])
// const reachEnd = ref(false)

const fetchData = async () => {
  await postStore.getMyPosts()
}

const fetchNextSet = async () => {
}

onMounted(() => {
  fetchData()
})

</script>

<template>
  <div class="timeline-container">
    <MyPostsCard
        v-for="post in myPosts"
        :key="post.id"
        :post="post">
    </MyPostsCard>
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