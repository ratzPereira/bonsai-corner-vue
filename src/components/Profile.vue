<script setup>
import Container from "@/components/Container.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import UploadModalPhoto from "@/components/UploadModalPhoto.vue";

const userState = useUserStore();
const {currentUserProfile, loadingUser, user} = storeToRefs(userState)

const route = useRoute();
const {username} = route.params

const dummyImage = 'https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png'
onMounted(() => {
  userState.getProfile(username);
})

</script>

<template>
  <Container>
    <div v-if="currentUserProfile">
      <div v-if="!loadingUser" class="profile">
        <img :src="currentUserProfile.image || dummyImage" alt="User Photo" class="profile_image"/>
        <UploadModalPhoto v-if="currentUserProfile.username === user.username"></UploadModalPhoto>
        <ATypographyTitle :level="2">{{ currentUserProfile.username }}</ATypographyTitle>
        <div class="stats">
          <span class="followers">{{ currentUserProfile.followers || 0 }} followers</span>
          <span class="posts">{{ currentUserProfile.posts || 0 }} posts</span>
        </div>
        <p class="bio">{{ currentUserProfile.bio || 'My bio here' }}</p>
        <div class="profile_buttons">
          <AButton>Follow</AButton>
          <AButton>Following</AButton>
        </div>

      </div>

      <div v-else class="spinner">
        <ASpin/>
      </div>
    </div>
    <div v-if="!currentUserProfile && !loadingUser">
      <h2>User Not Found</h2>
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

.profile_image {
  max-width: 300px;
  max-height: 300px;
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

.profile_buttons {
  justify-content: space-between;
  align-items: center;
}
</style>