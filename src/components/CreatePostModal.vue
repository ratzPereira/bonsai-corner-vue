<script setup>

import {reactive, ref} from "vue";
import {usePostsStore} from "@/stores/posts";
import {storeToRefs} from "pinia";
import {supabase} from "@/supabase";

const postStore = usePostsStore()
const {errorMessage, loading} = storeToRefs(postStore)

const visible = ref(false);
const imagesToUpload = reactive([])

const post = reactive({
  name: '',
  age: '',
  description: '',
  images: [],
  species: '',
  interventions: '',
})


const showModal = () => {
  errorMessage.value = ''
  visible.value = true;
};
const handleOk = async e => {

  loading.value = true

  await uploadImagesToBucket(imagesToUpload)
  await postStore.handleNewPost(post)

  loading.value = false
  //visible.value = false;
};


const handleUploadChange = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    imagesToUpload.push(files[i]);
  }
};

const uploadImagesToBucket = async (images) => {
  for (const image of images) {
    const fileName = Math.floor(Math.random() * 1000000000000)
    const {data, error} = await supabase.storage.from('bonsai').upload('public/' + fileName, image)
    if (error) {
      //TODO: handle error here
    }
    post.images.push(data.path)
  }
}

</script>

<template>
  <div>
    <AButton class="btn" type="primary" @click="showModal">New Post</AButton>
    <AModal v-model:visible="visible" title="New Post" @ok="handleOk">
      <div v-if="!loading">
        <AForm :form="post">
          <AFormItem label="Name" required>
            <AInput v-model:value="post.name"/>
          </AFormItem>
          <AFormItem label="Age" required>
            <AInputNumber v-model:value="post.age"/>
          </AFormItem>
          <AFormItem label="Description" required>
            <ATextarea v-model:value="post.description"/>
          </AFormItem>
          <AFormItem label="Images" required>
            <input
                :multiple="true"
                accept=".png,.jpeg"
                type="file"
                @change="handleUploadChange"
            >
          </AFormItem>
          <AFormItem label="Species" required>
            <AInput v-model:value="post.species"/>
          </AFormItem>
          <AFormItem label="Interventions">
            <AInput v-model:value="post.interventions"/>
          </AFormItem>
        </AForm>
      </div>
      <div v-else class="spinner">
        <ASpin></ASpin>
      </div>
      <ATypographyText v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
    </AModal>
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}
</style>