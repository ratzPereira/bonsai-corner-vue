import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "./axios.js";
import "ant-design-vue/dist/antd.css";
import "./assets/main.css";
import "swiper/swiper-bundle.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueCarousel from "vue-carousel";
import "@fortawesome/fontawesome-free/css/all.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faFacebookF, faTwitter, faInstagram);

const app = createApp(App);
app.use(VueAwesomeSwiper);
app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(VueCarousel);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
