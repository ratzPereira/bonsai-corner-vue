import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("users", () => {
  const user = ref(null);
  const errorMessage = ref("");
  const loading = ref(false);
  const loadingUser = ref(false);
  const token = ref("");
  const currentUserProfile = ref(null);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (credentials) => {
    const { email, password } = credentials;

    if (!isValidEmail(email)) {
      return (errorMessage.value = "Please insert valid email!");
    }

    if (String(password).length <= 0)
      return (errorMessage.value = "Please insert your password!");

    loading.value = true;

    await axios
      .post("auth/login", credentials)
      .then((response) => {
        user.value = {
          email: response.data.email,
          username: response.data.username,
          id: response.data.id,
        };

        console.log({ user });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        token.value = response.data.token;
      })
      .catch((error) => {
        errorMessage.value = error.message;
        loading.value = false;
      });
    loading.value = false;
  };

  const handleSignup = async (credentials) => {
    const { email, password, username } = credentials;

    if (String(password).length < 6) {
      return (errorMessage.value = "Password is too short!");
    }

    if (String(username).length < 4) {
      return (errorMessage.value = "Username is too short!");
    }

    if (!isValidEmail(email)) {
      return (errorMessage.value = "Please insert valid email!");
    }

    loading.value = true;

    errorMessage.value = "";

    await axios
      .post("auth", credentials)
      .then((response) => {
        user.value = {
          email: response.data.email,
          username: response.data.username,
          id: response.data.id,
        };

        localStorage.setItem("token", JSON.stringify(response.data.token));
        token.value = response.data.token;
      })
      .catch((error) => {
        errorMessage.value = error.message;
        loading.value = false;
      });

    loading.value = false;
  };

  const getUser = async () => {
    loadingUser.value = true;

    await axios
      .get("/auth/user")
      .then((response) => {
        user.value = {
          email: response.data.email,
          username: response.data.username,
          id: response.data.id,
        };
        console.log({ user });
      })
      .catch((error) => {
        //errorMessage.value = error.message;
      });

    loadingUser.value = false;
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    user.value = null;
  };

  const getProfile = async (username) => {
    loadingUser.value = true;
    await axios
      .get("/profile/" + username)
      .then((response) => {
        currentUserProfile.value = {
          bio: response.data.profile.bio,
          following: response.data.profile.following,
          id: response.data.profile.id,
          image: response.data.profile.image,
          username: response.data.profile.username,
        };
        loadingUser.value = false;
      })
      .catch((error) => {
        //errorMessage.value = error.message;
        currentUserProfile.value = null;
        loadingUser.value = false;
      });
  };

  const handleUserProfileEdit = async (data) => {
    loadingUser.value = true;

    const userToUpdate = {
      email: user.value.email,
      username: user.value.username,
      image: data.image,
      bio: data.bio ? data.bio : user.value.bio,
    };
    await axios
      .put("/auth/user", userToUpdate)
      .then((response) => {
        currentUserProfile.value = {
          bio: response.data.bio,
          following: response.data.following,
          id: response.data.id,
          image: response.data.image,
          username: response.data.username,
        };
        loadingUser.value = false;
      })
      .catch((error) => {
        errorMessage.value = error.message;
        currentUserProfile.value = null;
        loadingUser.value = false;
      });
    loadingUser.value = false;
  };

  const followUser = async (username) => {
    await axios
      .post(`/profile/${username}/follow`)
      .then((response) => {})
      .catch((error) => {});
  };

  const unFollowUser = async (username) => {
    await axios
      .delete(`/profile/${username}/follow`)
      .then((response) => {})
      .catch((error) => {});
  };

  const clearErrorMessage = () => {
    return (errorMessage.value = "");
  };

  return {
    user,
    loading,
    loadingUser,
    token,
    errorMessage,
    currentUserProfile,
    handleLogout,
    handleSignup,
    handleLogin,
    getUser,
    getProfile,
    clearErrorMessage,
    handleUserProfileEdit,
    followUser,
    unFollowUser,
  };
});
