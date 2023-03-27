<script setup>
import {ref} from 'vue';
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import {supabase} from "@/supabase";

const visible = ref(false);
const file = ref(null)
const bio = ref('');
const loading = ref(false)
const router = useRouter();
const errorMessage = ref('')
const props = defineProps(['addNewPost'])
const userStore = useUserStore();
const {user} = storeToRefs(userStore);
const route = useRoute();
const {username} = route.params
const baseURl = 'https://gxqelydwsyyxugmqgmcv.supabase.co/storage/v1/object/public/profile/'

const showModal = () => {
  visible.value = true;
};
const handleOk = async (e) => {
  loading.value = true
  const fileName = Math.floor(Math.random() * 1000000000000)

  if (file.value) {
    const {error} = await supabase.storage.from('profile').upload('public/' + fileName, file.value);
    if (error) {
      loading.value = false
      return errorMessage.value = 'Failed to upload!'
    } else {
      const fullUrl = baseURl + 'public/' + fileName
      await userStore.handleUserProfileEdit({image: fullUrl})
    }
  }
  if (bio.value) {
    await userStore.handleUserProfileEdit({bio: bio.value})
  }
  loading.value = false
  visible.value = false
  bio.value = ''
};


const handleUploadChange = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0]
  }
}
</script>

<template>
  <div>
    <AButton @click="showModal">Edit Profile</AButton>
    <AModal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input accept=".png,.jpeg,.jpg" type="file" @change="handleUploadChange">
        <AInput v-model:value="bio" :maxlength="250" placeholder="Your biography here"/>
        <ATypographyText v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
      </div>
      <div v-else class="spinner">
        <ASpin></ASpin>
      </div>
    </AModal>
  </div>
</template>


<style scoped>
input {
  margin-top: 10px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>