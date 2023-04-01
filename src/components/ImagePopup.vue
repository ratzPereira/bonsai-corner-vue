<template>
  <div v-if="showPopup" class="image-popup" @click="closePopup">
    <div class="popup-background"></div>
    <div class="popup-content">
      <img :src="imageUrl" alt="Popup Image" class="popup-image">
    </div>
    <button class="popup-close-btn" @click="closePopup">Close</button>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: String,
    showPopup: Boolean
  },
  methods: {
    closePopup() {
      this.$emit('close-popup');
      document.body.style.overflow = ''; // Enable scrolling
    }
  },
  watch: {
    showPopup(newVal) {
      document.body.style.overflow = newVal ? 'hidden' : ''; // Disable scrolling
    }
  }
};
</script>

<style scoped>
.image-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.popup-content {
  position: relative;
  max-width: 70%;
  max-height: 70%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.popup-image {
  max-width: 600px;
  max-height: 600px;
}

.popup-close-btn {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  font-size: 18px;
  cursor: pointer;
}
</style>