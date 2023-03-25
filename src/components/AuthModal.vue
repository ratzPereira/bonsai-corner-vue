<script setup>
import {reactive, ref} from 'vue';
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const props = defineProps(['isLogin'])
const visible = ref(false);
const userStore = useUserStore();
const {errorMessage, loading, user} = storeToRefs(userStore);
const userCredentials = reactive({
  email: '',
  password: '',
  username: ''
})
const showModal = () => {
  visible.value = true;
};
const clearUserCredentials = () => {
  userCredentials.email = ''
  userCredentials.password = ''
  userCredentials.username = ''
  userStore.clearErrorMessage();
  visible.value = false;
}
const handleOk = async (e) => {
  if (props.isLogin) {
    await userStore.handleLogin({
      password: userCredentials.password,
      email: userCredentials.email
    })
  } else {
    await userStore.handleSignup(userCredentials);
  }
  if (user.value) {
    clearUserCredentials()
  }
};
const handleCancel = () => {
  clearUserCredentials()
  visible.value = false
}
const title = props.isLogin ? 'Login' : 'Signup';
</script>


<template>
  <div>
    <AButton class="btn" type="primary" @click="showModal">{{ title }}</AButton>
    <AModal v-model:visible="visible" :title="title" @ok="handleOk">
      <template #footer>
        <AButton key="back" @click="handleCancel">Cancel</AButton>
        <AButton key="submit" :disabled="loading" :loading="loading" type="primary" @click="handleOk">Submit</AButton>
      </template>
      <div v-if="!loading" class="input-container">
        <AInput v-if="!isLogin" v-model:value="userCredentials.username" class="input" placeholder="Username"/>
        <AInput v-model:value="userCredentials.email" class="input" placeholder="Email"/>
        <AInput v-model:value="userCredentials.password" class="input" placeholder="Password" type="password"/>
      </div>
      <div v-else class="spinner">
        <ASpin></ASpin>
      </div>
      <ATypographyText v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
    </AModal>
  </div>
</template>


<style scoped>
.btn {
  margin-left: 10px;
}

.input {
  margin-top: 5px;
}

.input-container {
  height: 120px;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}
</style>