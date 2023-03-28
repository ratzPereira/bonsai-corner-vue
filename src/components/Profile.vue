<script setup>
import Container from "@/components/Container.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import UploadModalPhoto from "@/components/UploadModalPhoto.vue";

const userState = useUserStore();
const {currentUserProfile, loadingUser, user, followingUsers, followedUsers, userFollow} = storeToRefs(userState)

const route = useRoute();
const {username} = route.params
const isFollowing = ref(false)

const dummyImage = 'https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png'

const handlerFollow = async () => {
  await userState.followUser(username)
}

const handlerUnFollow = async () => {
  await userState.unFollowUser(username)
}
onMounted(() => {
  userState.getProfile(username);
})

watch(userFollow, () => {
  // Trigger a re-render of the component when userFollow changes
})

</script>

<template>
  <Container>
    <div v-if="currentUserProfile">
      <div v-if="!loadingUser" class="profile">
        <UploadModalPhoto v-if="currentUserProfile.username === user.username" class="edit_btn"></UploadModalPhoto>
        <img :src="currentUserProfile.image || dummyImage" alt="User Photo" class="profile_image"/>

        <ATypographyTitle :level="2">{{ currentUserProfile.username }}</ATypographyTitle>
        <div class="stats">
          <span class="followers">{{
              followedUsers.length || 0
            }}{{ username === user.username ? ' followers' : ' following' }}</span>
          <span class="following">{{
              followingUsers.length || 0
            }}{{ username === user.username ? ' following' : ' followers' }}</span>
          <span class="posts">{{ currentUserProfile.posts || 0 }} posts</span>
        </div>
        <p class="bio">{{ currentUserProfile.bio || 'My bio here' }}</p>
        <div v-if="(username !==user.username)" class="profile_buttons">
          <div>
            <AButton v-if="!userFollow" class="follow_button" @click="handlerFollow">
              <template #icon>
                <img alt="Like" class="buttonImage" src="../assets/like.png">
              </template>
              follow
            </AButton>
            <AButton v-if="userFollow" class="unfollow_button" @click="handlerUnFollow">
              <template #icon>
                <img alt="Unlike" class="buttonImage" src="../assets/dont-like.png">
              </template>
              unfollow
            </AButton>
          </div>
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

.edit_btn {
  margin-bottom: 20px;
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

.buttonImage {
  width: 1.7em; /* or any other desired width */
  height: 1.7em; /* or any other desired height */
  margin-right: 20px;
}

.unfollow_button {
  background-color: #db2a2a;
  font-weight: bold;
  transition: background-color 0.3s ease; /* Add a transition effect */
}

.follow_button {
  background-color: aqua;
  font-weight: bold;
  transition: background-color 0.3s ease; /* Add a transition effect */
}

.unfollow_button:hover {
  background-color: #ff4d4d; /* Change the background color */
  color: black;
}

.follow_button:hover {
  background-color: #e8e0e0; /* Change the background color */

}
</style>