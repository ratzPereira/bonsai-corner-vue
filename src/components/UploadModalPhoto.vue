<script setup>
import {ref} from 'vue';
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const visible = ref(false);
const caption = ref('');
const file = ref(null)
const loading = ref(false)
const errorMessage = ref('')
const props = defineProps(['addNewPost'])
const userStore = useUserStore();
const {user} = storeToRefs(userStore);
const showModal = () => {
  visible.value = true;
};
const handleOk = async (e) => {
  // loading.value = true
  // const fileName = Math.floor(Math.random() * 1000000000000)
  // if (file.value) {
  //   const {data, error} = await supabase.storage.from('images').upload('public/' + fileName, file.value);
  //   if (error) {
  //     loading.value = false
  //     return errorMessage.value = 'Failed to upload!'
  //   }
  //   await supabase.from('posts').insert({
  //     url: data.path,
  //     caption: caption.value,
  //     owner_id: user.value.id
  //   })
  //   props.addNewPost({
  //     url: data.path,
  //     caption: caption.value,
  //   })
  // }
  // loading.value = false
  // visible.value = false
  // caption.value = ''
};
const handleUploadChange = (e) => {
  // if (e.target.files[0]) {
  //   file.value = e.target.files[0]
  // }
}
</script>

<template>
  <div>
    <AButton @click="showModal">UploadPhoto</AButton>
    <AModal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input accept=".png,.jpeg" type="file" @change="handleUploadChange">
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