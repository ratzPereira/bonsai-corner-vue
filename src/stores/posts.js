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
        console.log({ response });
        posts.value = response.data;
      })
      .catch((error) => {});
  };

  const handleNewPost = async (post) => {
    loading.value = true;

    const { name, age, description, images, species, interventions } = post;

    validatePost(name, errorMessage, description, species, age, images);

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
    if (String(name) <= 3) {
      return (errorMessage.value = "Please insert valid name!");
    }

    if (String(description) <= 5) {
      return (errorMessage.value = "The description is too short");
    }

    if (String(species) <= 3) {
      return (errorMessage.value = "The species name is too short");
    }

    if (age < 0) {
      return (errorMessage.value = "The age must be greater than zero");
    }

    if (!images) {
      return (errorMessage.value = "Please add at least one image");
    }
  };

  return {
    posts,
    errorMessage,
    loading,
    getPosts,
    handleNewPost,
  };
});
