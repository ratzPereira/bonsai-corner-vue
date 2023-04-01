<script setup>
import 'swiper/swiper-bundle.css';
import {onMounted} from "vue";
import 'swiper/css/navigation';
import SwiperCore, {Navigation, Pagination} from 'swiper';

SwiperCore.use([Navigation, Pagination]);

const props = defineProps(['post']);
const baseUrl = 'https://gxqelydwsyyxugmqgmcv.supabase.co/storage/v1/object/public/bonsai/'

const togglePublic = async () => {
}

const formatDate = (dateString) => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
}


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
            <img :src="baseUrl + image" class="plant-image"/>
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
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
        <button class="share-button" @click="togglePublic">
          {{ post.isPublic ? 'Make Private' : 'Share' }}
        </button>
      </div>
    </div>
  </ACard>

</template>

<style scoped>

.plant-card {
  width: 600px;
  margin: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
}

.share-button {
  border-radius: 20px;
  border: none;
  padding: 5px 15px;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: #4CAF50;
  color: #fff;
}

.share-button:hover {
  background-color: #3e8e41;
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