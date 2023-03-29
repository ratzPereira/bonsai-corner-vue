import { defineStore } from "pinia";
import { useUserStore } from "@/stores/users";
import { ref } from "vue";
import axios from "axios";

export const usePostsStore = defineStore("posts", () => {
  const user = useUserStore();

  const posts = ref([]);

  const getPosts = async () => {
    await axios
      .get("/bonsai/feed")
      .then((response) => {
        console.log({ response });
        posts.value = response.data;
      })
      .catch((error) => {});
  };
  return {
    posts,
    getPosts,
  };
});
