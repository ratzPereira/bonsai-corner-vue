<script setup>
import {RouterLink, useRouter} from "vue-router";
import Container from "@/components/Container.vue";
import {ref} from "vue"
import AuthModal from "@/components/AuthModal.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const router = useRouter();
const userStore = useUserStore();
const searchUsername = ref('')
const {user, loadingUser} = storeToRefs(userStore)

const onSearch = () => {
  if (searchUsername.value) {
    router.push(`/profile/${searchUsername.value}`)
    searchUsername.value = ""
  }
};
const handleLogout = async () => {
  await userStore.handleLogout()
  await router.push('/')
}

const goToUsersProfile = () => {
  router.push(`/profile/${user.value.username}`)
  userStore.getUserFollowers()
  userStore.getUserFollowings()

}
</script>
<template>

  <ALayoutHeader>
    <Container>

      <div class="nav-container">
        <div class="right-content">
          <RouterLink to="/">Bonsai Corner</RouterLink>
          <AInputSearch
              v-if="user"
              v-model:value="searchUsername"
              placeholder="username"
              style="width: 200px"
              @search="onSearch"
          />
        </div>
        <div v-if="!loadingUser" class="content">
          <div v-if="!user" class="left-content">
            <AuthModal :is-login="false"></AuthModal>
            <AuthModal :is-login="true"></AuthModal>
          </div>
          <div v-else class="left-content">
            <AButton type="primary" @click="goToUsersProfile">Profile</AButton>
            <AButton :onclick="handleLogout" type="primary">Logout</AButton>
          </div>
        </div>
      </div>

    </Container>
  </ALayoutHeader>

</template>

<style scoped>

.nav-container {
  display: flex;
  justify-content: space-between;
}

.content {
  display: flex;
  align-items: center;
}

.right-content {
  display: flex;
  align-items: center;
}

.right-content a {
  margin-right: 10px;
}

.left-content {
  display: flex;
  align-items: center;
}

.left-content button {
  margin-left: 10px;
}
</style>