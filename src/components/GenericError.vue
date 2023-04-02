<template>
  <div class="container">
    <div class="title">
      <FontAwesomeIcon class="anticon" icon="exclamation-triangle"/>
      Oops! Something went wrong.
    </div>
    <p class="text">{{ errorMessage }}</p>
    <AButton class="btn" type="primary" @click="goHome">
      <FontAwesomeIcon class="anticon" icon="home"/>
      Go Home
    </AButton>
    <img alt="Error image" class="image" src="/path/to/image">
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

const errorMessage = ref('');

const router = useRouter();

function goHome() {
  router.push('/');
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.title {
  padding-top: 300px;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.text {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.btn {
  margin-top: 20px;
}

.anticon {
  margin-right: 5px;
}

.image {
  max-width: 100%;
  max-height: 400px;
  margin-top: 20px;
}
</style>