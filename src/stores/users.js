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
  const followingUsers = ref([]);
  const followedUsers = ref([]);
  const userFollow = ref(false);

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
        console.log("a registar novo user");
        user.value = {
          email: response.data.email,
          username: response.data.username,
          id: response.data.id,
        };

        localStorage.setItem("token", JSON.stringify(response.data.token));
        token.value = response.data.token;
      })
      .catch((error) => {
        console.log("erro a registar");
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
      })
      .catch((error) => {
        //errorMessage.value = error.message;
      });

    loadingUser.value = false;
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    user.value = null;
    followingUsers.value = [];
    followedUsers.value = [];
    userFollow.value = false;
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
    await getUserFollowings();
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
    console.log("quero followar");
    await axios
      .post(`/profile/${username}/follow`)
      .then((response) => {})
      .catch((error) => {});

    await getUserFollowings();
    await userFollows(username);
  };

  const unFollowUser = async (username) => {
    await axios
      .delete(`/profile/${username}/follow`)
      .then((response) => {})
      .catch((error) => {});

    await getUserFollowings();
    await userFollows(username);
  };

  const clearErrorMessage = () => {
    return (errorMessage.value = "");
  };

  const getUserFollowers = async () => {
    await axios
      .get("/auth/user/followers")
      .then((response) => {
        followedUsers.value = response.data.followers;
      })
      .catch((error) => {});
  };
  const getUserFollowings = async () => {
    await axios
      .get("/auth/user/followings")
      .then((response) => {
        followingUsers.value = response.data.followings;
      })
      .catch((error) => {});
  };

  const userFollows = async (searchUsername) => {
    userFollow.value = followingUsers.value.some(
      (user) => user === searchUsername
    );
  };

  return {
    user,
    loading,
    loadingUser,
    token,
    errorMessage,
    currentUserProfile,
    followingUsers,
    followedUsers,
    userFollow,
    handleLogout,
    handleSignup,
    handleLogin,
    getUser,
    getProfile,
    clearErrorMessage,
    handleUserProfileEdit,
    followUser,
    unFollowUser,
    getUserFollowers,
    getUserFollowings,
    userFollows,
  };
});
