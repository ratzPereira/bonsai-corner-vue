import { defineStore } from "pinia";
import { useUserStore } from "@/stores/users";
import { ref } from "vue";
import axios from "axios";

export const usePostsStore = defineStore("posts", () => {
  const user = useUserStore();

  const posts = ref([]);
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

    const { name, age, description, species } = post;

    const isValid = validatePost(name, errorMessage, description, species, age);

    if (!isValid) {
      loading.value = false;
      return;
    }

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

  const validatePost = (
    name,
    errorMessage,
    description,
    species,
    age,
    images
  ) => {
    let isValid = true;

    if (String(name).length < 3) {
      errorMessage.value = "Please insert valid name!";
      isValid = false;
    }

    if (String(description).length < 5) {
      errorMessage.value = "The description is too short";
      isValid = false;
    }

    if (String(species).length < 3) {
      errorMessage.value = "The species name is too short";
      isValid = false;
    }
    console.log(age);
    if (age < 0 || !age) {
      errorMessage.value = "The age must be greater than zero";
      isValid = false;
    }
    return isValid;
  };

  return {
    posts,
    errorMessage,
    loading,
    getPosts,
    handleNewPost,
  };
});
