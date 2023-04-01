<script setup>
import 'swiper/swiper-bundle.css';
import {onMounted, onUnmounted, ref} from "vue";
import 'swiper/css/navigation';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import ImagePopup from "@/components/ImagePopup.vue";

SwiperCore.use([Navigation, Pagination]);

const props = defineProps(['post']);

const showPopup = ref(false);
const currentImageUrl = ref('');

const showButton = ref(false);
const scrollOffset = 200;

const baseUrl = 'https://gxqelydwsyyxugmqgmcv.supabase.co/storage/v1/object/public/bonsai/'

const togglePublic = async () => {
}

const formatDate = (dateString) => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleScroll = () => {
  showButton.value = window.pageYOffset > scrollOffset;
};

onMounted(() => {
  SwiperCore.use([Navigation, Pagination]);
  const swiper = new SwiperCore('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 3000,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>

<template>
  <ACard v-for="post in props.post" v-if="Object.keys(post).length > 0" :key="post.id" class="plant-card">
    <div slot="title" class="plant-card-title ">
      {{ post.name }}
    </div>
    <div v-if="post.images.length > 0">
      <div class="swiper-container mySwiper">
        <div class="swiper-wrapper">
          <div v-for="(image, index) in post.images" :key="index" class="swiper-slide">
            <img :src="baseUrl + image" class="plant-image"
                 @click="showPopup = true; currentImageUrl = baseUrl + image">
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
      <image-popup :image-url="currentImageUrl" :show-popup="showPopup" @close-popup="showPopup = false"></image-popup>
    </div>
    <div class="plant-details">
      <div class="plant-species">
        <strong>Species:</strong> {{ post.species }}
      </div>
      <div class="plant-age">
        <strong>Age:</strong> {{ post.age }}
      </div>
      <div v-if="post.owner" class="plant-owner">
        <strong>Owner:</strong> {{ post.owner.username }}
      </div>
      <div class="plant-description">
        <strong>Description:</strong> {{ post.description }}
      </div>
      <div class="plant-interventions">
        <strong>Interventions:</strong>
        <ul>
          <li v-for="(intervention, index) in post.interventions" :key="index">
            {{ intervention ? intervention : 'No interventions yet' }}
          </li>
        </ul>
      </div>
      <div class="plant-bonsai-creation-date">
        <strong>Bonsai creation date:</strong> {{ formatDate(post.bonsaiCreationDate) }}
      </div>
      <div class="plant-bonsai-updated-date">
        <strong>Bonsai updated date:</strong> {{ formatDate(post.bonsaiUpdatedDate) }}
      </div>
      <div class="plant-favorites-count">
        <strong>Favorites count:</strong> {{ post.favoritesCount }}
      </div>
      <div class="plant-public">
        <strong>Public:</strong> {{ post.isPublic ? 'Yes' : 'No' }}
      </div>
      <div class="plant-card-buttons-container">
        <button class="share-button" @click="togglePublic">
          {{ post.isPublic ? 'Make Private' : 'Share' }}
        </button>
        <button class="edit-button" @click="editPost(post)">
          Edit post
        </button>
        <button class="delete-button" @click="deletePost(post)">
          Delete post
        </button>
      </div>
      <button v-if="showButton" class="go-top-button" @click="scrollToTop">
        <i class="fas fa-chevron-up"></i>
      </button>
    </div>
  </ACard>
</template>


<style scoped>

.go-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  border-radius: 10%;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  z-index: 999;
}

.fa-chevron-up {
  font-size: 20px;
}

.plant-details {
  margin-bottom: 50px;
}

.plant-card-buttons-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 5px 96px 40px;

}

.plant-public button {
  padding: 8px;
  margin-left: 5px;
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-button {
  background-color: #4CAF50;
}

.edit-button {
  background-color: #2196F3;
}

.delete-button {
  background-color: #f44336;
}

.share-button:hover {
  background-color: #3e8e41;
}

.edit-button:hover {
  background-color: #0b7dda;
}

.delete-button:hover {
  background-color: #e83030;
}

/* Add the following rules for the button icons */

.share-button:before,
.edit-button:before,
.delete-button:before {
  display: inline-block;
  margin-right: 5px;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 14px;
}

.share-button:before {
  content: "\f1e0";
}

.edit-button:before {
  content: "\f044";
}

.delete-button:before {
  content: "\f2ed";
}

.plant-card {
  width: 600px;
  margin: 20px 20px 0;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
}

.swiper-container {
  overflow: visible;
}

.plant-image {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  object-fit: contain;
}

.plant-details {
  padding: 20px;
}

.plant-species,
.plant-age,
.plant-owner,
.plant-description,
.plant-interventions,
.plant-bonsai-creation-date,
.plant-bonsai-updated-date,
.plant-public,
.plant-favorites-count {
  margin-bottom: 10px;
}

.plant-card-title {
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.plant-card div[slot="title"] {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.swiper-slide {
  display: flex;
  justify-content: center;
}

.swiper-button-prev,
.swiper-button-next {
  top: calc(30% - 15px);
  transform: translateY(-10%);
  width: 30px;
  height: 30px;
  margin-top: -15px;
  z-index: 10;
  cursor: pointer;
  background-color: #121312;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.swiper-button-prev {
  left: 10px;
}

.swiper-button-next {
  right: 10px;
}
</style>