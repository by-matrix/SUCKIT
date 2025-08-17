import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';
import { toast } from './toastStore';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Login action
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.login(credentials);
          const { token, user } = response;

          localStorage.setItem('authToken', token);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success(`Welcome back, ${user.name}!`);
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.message || 'Login failed');
          return { success: false, error: error.message };
        }
      },

      // Register action
      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.register(userData);
          const { token, user } = response;

          localStorage.setItem('authToken', token);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success(`Welcome to SUCKIT, ${user.name}!`);
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.message || 'Registration failed');
          return { success: false, error: error.message };
        }
      },

      // Logout action
      logout: () => {
        localStorage.removeItem('authToken');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        toast.info('Logged out successfully');
      },

      // Initialize auth from storage
      initializeAuth: async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
          try {
            const response = await authAPI.getProfile();
            set({
              user: response.user,
              token,
              isAuthenticated: true,
            });
          } catch (error) {
            // Token is invalid, clear it
            localStorage.removeItem('authToken');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
          }
        }
      },

      // Update user profile
      updateProfile: async (profileData) => {
        try {
          const response = await authAPI.updateProfile?.(profileData);
          if (response?.user) {
            set((state) => ({
              user: { ...state.user, ...response.user }
            }));
          }
          toast.success('Profile updated successfully');
          return { success: true };
        } catch (error) {
          toast.error(error.message || 'Failed to update profile');
          return { success: false, error: error.message };
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
