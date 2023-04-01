import { defineStore } from "pinia";
import { useUserStore } from "@/stores/users";
import { ref } from "vue";
import axios from "axios";

export const usePostsStore = defineStore("posts", () => {
  const user = useUserStore();

  const posts = ref([]);
  const myPosts = ref([]);
  const loading = ref(false);
  const errorMessage = ref("");

  const getPosts = async () => {
    await axios
      .get("/bonsai/feed")
      .then((response) => {
        posts.value = response.data;
      })
      .catch((error) => {});
  };

  const handleNewPost = async (post) => {
    loading.value = true;
    await axios
      .post("/bonsai", post)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        errorMessage.value = "error creating new post";
      });
    loading.value = false;
  };

  const getMyPosts = async () => {
    loading.value = true;

    await axios
      .get("/bonsai")
      .then((response) => {
        console.log(response.data);
        myPosts.value = response.data;
        loading.value = false;
      })
      .catch((error) => {
        loading.value = false;
      });
  };

  return {
    posts,
    errorMessage,
    loading,
    myPosts,
    getPosts,
    handleNewPost,
    getMyPosts,
  };
});
