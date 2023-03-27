<script setup>
import Container from "@/components/Container.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const userState = useUserStore();
const {currentUserProfile} = storeToRefs(userState)

const route = useRoute();
const {username} = route.params

const loading = ref(false)

const userData = ref({
  bio: 'This is my bio',
  photo: 'https://via.placeholder.com/150',
  followers: 100,
  following: 50,
  username: 'John Doe',
  posts: 20,
});

const userImage = currentUserProfile.image ? currentUserProfile.image : userData.value.photo

onMounted(() => {
  userState.getProfile(username);
})

</script>

<template>
  <Container>
    <div v-if="!loading" class="profile">
      <img :src="userImage" alt="User Photo"/>
      <h2>{{ currentUserProfile.username }}</h2>
      <div class="stats">
        <span class="followers">{{ userData.followers }} followers</span>
        <span class="posts">{{ userData.posts }} posts</span>
      </div>
      <p class="bio">{{ userData.bio }}</p>
    </div>
    <div v-else class="spinner">
      <ASpin/>
    </div>
  </Container>
</template>

<style scoped>
.profile {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stats {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.stats span {
  margin-right: 10px;
  font-weight: bold;
}

.bio {
  margin-top: 20px;
  text-align: center;
}

.spinner {
  justify-content: center;
  display: flex;
  align-items: center;
  height: 85vh;
}
</style>