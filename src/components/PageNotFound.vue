<script setup>

import Footer from "@/components/Footer.vue";

const title = '404'
const subTitle = 'Sorry, the page you visited does not exist.'

</script>

<template>
  <AResult :status="404" :subTitle="subTitle" :title="title" class="result">
    <template #extra>
      <AButton type="primary" @click="$router.push('/')">Back Home</AButton>
    </template>
  </AResult>
  <Footer></Footer>
</template>

<style scoped>
.result {
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  padding-bottom: 20%;
}

</style>