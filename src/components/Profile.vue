<script setup>
import Container from "@/components/Container.vue";
import UserBar from "@/components/UserBar.vue";
import ImageGallery from "@/components/ImageGallery.vue";</script>

<template>
  <Container>
    <div class="profile-container">
      <UserBar :userInfo="{posts: 4, followers: 100, following:2382}" username="ratz"></UserBar>
      <ImageGallery
          :posts="[
          {
            id: 1, image:'https://qph.cf2.quoracdn.net/main-qimg-134e3bf89fff27bf56bdbd04e7dbaedf.webp'
            },
          {
            id: 2, image:'https://qph.cf2.quoracdn.net/main-qimg-134e3bf89fff27bf56bdbd04e7dbaedf.webp'
            },
          {
            id: 3, image:'https://qph.cf2.quoracdn.net/main-qimg-134e3bf89fff27bf56bdbd04e7dbaedf.webp'
          }
          ]"></ImageGallery>
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
</style>