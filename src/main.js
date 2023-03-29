import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "./axios.js";
import "ant-design-vue/dist/antd.css";
import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "@fortawesome/fontawesome-free/css/all.css";

library.add(faFacebookF, faTwitter, faInstagram);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
