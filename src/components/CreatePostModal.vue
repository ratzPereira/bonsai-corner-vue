<script setup>

import {ref} from "vue";

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const handleOk = e => {
  console.log(e);
  visible.value = false;
};

</script>

<template>
  <div>
    <AButton class="btn" type="primary" @click="showModal">coiso</AButton>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<style scoped>

</style>