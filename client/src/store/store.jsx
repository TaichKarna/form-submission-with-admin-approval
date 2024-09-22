import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const createUserSlice = (set) => ({
    user: null, 
    setUser: (userData) => set({ user: userData }),
    clearUser: () => set({ user: null }),
});

const useUserStore = create(
    persist(
        (set) => ({
            ...createUserSlice(set), 
        }),
        {
            name: 'user-storage', 
            getStorage: () => localStorage, 
        }
    )
);

export default useUserStore;
