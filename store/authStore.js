import create from 'zustand'
import { persist } from 'zustand/middleware';

const authStore = (set) => ({
    userProfile: null,
    userDetails: null,
    addUserDets: (user) => set({ userDetails: user }),
    addUser: (user) => set({ userProfile: user }),
})




const useAuthStore = create(
    persist(authStore, {
        name: 'auth',
    })
)

export default useAuthStore;

