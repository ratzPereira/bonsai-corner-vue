import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import router from "@/router";

export const authGuard = () => {
  const store = useUserStore();
  const { user } = storeToRefs(store);

  if (!user) {
    router.push({ name: "home" });
  }
};
