import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("users", () => {
  const user = ref(null);
  const errorMessage = ref("");
  const loading = ref(false);
  const loadingUser = ref(false);
  const token = ref("");

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
          password: response.data.password,
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
        user.value = {
          email: response.data.email,
          password: response.data.password,
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

  const getUser = async () => {};

  const handleLogout = async () => {};

  const clearErrorMessage = () => {
    return (errorMessage.value = "");
  };

  return {
    user,
    handleLogout,
    handleSignup,
    handleLogin,
    getUser,
    errorMessage,
    clearErrorMessage,
    loading,
    loadingUser,
    token,
  };
});
