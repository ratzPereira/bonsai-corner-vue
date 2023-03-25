import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("users", () => {
  const user = ref(null);
  const errorMessage = ref("");
  const loading = ref(false);
  const loadingUser = ref(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (credentials) => {};

  const handleSignup = async (credentials) => {};

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
  };
});
