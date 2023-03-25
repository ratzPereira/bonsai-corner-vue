<script setup>
const props = defineProps(['username', 'userInfo'])
</script>

<template>
  <div class="userbar-container">
    <div class="top-content">
      <ATypographyTitle :level="2">{{ props.username }}</ATypographyTitle>
    </div>
    <div class="bottom-content">
      <ATypographyTitle :level="5">{{ props.userInfo.posts }}</ATypographyTitle>
      <ATypographyTitle :level="5">{{ props.userInfo.followers }}</ATypographyTitle>
      <ATypographyTitle :level="5">{{ props.userInfo.following }}</ATypographyTitle>
    </div>
  </div>

</template>

<style scoped>
.userbar-container {
  padding-bottom: 75px
}

.bottom-content {
  display: flex;
  align-items: center
}

.bottom-content h5 {
  padding: 0;
  margin: 0 30px 0 0;
}
</style>