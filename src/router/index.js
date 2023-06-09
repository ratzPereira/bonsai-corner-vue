import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import { authGuard } from "@/guards/AuthGuard";
import PageNotFound from "@/components/PageNotFound.vue";
import MyPosts from "@/components/MyPosts.vue";
import GenericError from "@/components/GenericError.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile/:username",
      name: "profile",
      component: ProfileView,
      beforeEnter: authGuard,
    },
    {
      path: "/my-posts",
      name: "myPosts",
      component: MyPosts,
      beforeEnter: authGuard,
    },
    {
      path: "/error",
      component: GenericError,
    },

    {
      path: "/:pathMatch(.*)*",
      name: "page not found",
      component: PageNotFound,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/error",
    },
  ],
});

export default router;
