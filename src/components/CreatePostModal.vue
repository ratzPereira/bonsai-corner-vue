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
  clearData()
  visible.value = true;
};

const handleOk = async e => {

  try {
    loading.value = true;

    if (!validatePost(post)) {
      loading.value = false;
      return;
    }

    errorMessage.value = ''
    await uploadImagesToBucket(imagesToUpload);
    await postStore.handleNewPost(post);
    visible.value = false;

  } catch (error) {
    errorMessage.value = error.message

  } finally {
    loading.value = false;
  }
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

const clearData = () => {
  post.name = ''
  post.age = ''
  post.species = ''
  post.interventions = ''
  post.images = []
  post.description = ''
  imagesToUpload.length = 0;
}

const validatePost = (post) => {
  let isValid = true;
  if (imagesToUpload.length === 0) {
    errorMessage.value = 'please upload one photo'
    isValid = false
  }
  if (String(post.name).length < 3) {
    errorMessage.value = "Please insert valid name!";
    isValid = false;
  }

  if (String(post.description).length < 5) {
    errorMessage.value = "The description is too short";
    isValid = false;
  }

  if (String(post.species).length < 3) {
    errorMessage.value = "The species name is too short";
    isValid = false;
  }

  if (post.age < 0 || !Number.isInteger(post.age)) {
    errorMessage.value = "Please insert a valid age!";
    isValid = false;
  }

  return isValid;
};
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