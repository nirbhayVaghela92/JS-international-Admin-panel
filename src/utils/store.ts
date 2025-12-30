/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type StoreState = {
  email: string;
  token: string;
  clearStore: () => void;
  setEmail:(email:string) => void;
  setToken:(token:string) => void;
};

export const useAuthStore = create<StoreState>()(
  persist(
    (set, get) => ({
      email: "",
      token: "",
      setEmail: (email: string) => set({ email }),
      setToken: (token: string) => set({ token }),
      clearStore: () => {
        set({
          email: "",
          token: "",
        });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
