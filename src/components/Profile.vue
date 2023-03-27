<script setup>
import Container from "@/components/Container.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const userState = useUserStore();
const {currentUserProfile} = storeToRefs(userState)

const userData = ref({
  bio: 'This is my bio',
  photo: 'https://via.placeholder.com/150',
  followers: 100,
  following: 50,
  username: 'JohnDoe',
  posts: 20,
});

const userImage = currentUserProfile.image ? currentUserProfile.image : userData.value.photo
</script>

<template>
  <Container>
    <div class="profile">
      <img :src="userImage" alt="User Photo"/>
      <h2>{{ currentUserProfile.username }}</h2>
      <div class="stats">
        <span class="followers">{{ userData.followers }} followers</span>
        <span class="posts">{{ userData.posts }} posts</span>
      </div>
      <p class="bio">{{ userData.bio }}</p>
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

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
</style>