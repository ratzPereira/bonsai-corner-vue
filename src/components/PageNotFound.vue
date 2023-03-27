<script setup>
const props = defineProps(['message'])
</script>

<template>
  <div class="page-not-found">
    <h1>Oops!</h1>
    <p>{{ props.message ? props.message : "Sorry, the page you are looking for cannot be found." }}</p>
  </div>
</template>

<style scoped>
.page-not-found {
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 2rem;
  text-align: center;
  max-width: 50rem;
  margin-bottom: 2rem;
}
</style>