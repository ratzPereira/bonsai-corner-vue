<script setup>
import RightContainer from "@/components/RightContainer.vue";
import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const userStone = useUserStore()
const {user} = storeToRefs(userStone);
</script>

<template>
  <div class="container">
    <slot></slot>
    <RightContainer class="right-container">
      <div class="button_create">
        <AButton v-if="user" class="button_create" type="primary">
          Create new Post
        </AButton>
      </div>
    </RightContainer>
  </div>
</template>

<style scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}

.button_create {
  text-align: center;
  margin-top: 20px; /* add some margin to separate the button from the top of the container */
}

.right-container {
  position: fixed;
  top: 100px;
  right: 100px;
  width: 100px; /* adjust width as needed */
  margin-left: 10px; /* add some margin to separate the two containers */
}
</style>
