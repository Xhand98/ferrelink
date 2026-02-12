import { writable, derived } from 'svelte/store';
import { apiAdapter } from '../services/api.adapter.js';

function createAuthStore() {
  const { subscribe, set, update } = writable({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  });

  return {
    subscribe,
    
    async init() {
      const authData = apiAdapter.getCurrentAuth();
      if (authData && authData.expiresAt) {
        if (new Date(authData.expiresAt) > new Date()) {
          const users = await apiAdapter.getAll('users');
          const user = users.find(u => u.id === authData.userId);
          if (user) {
            set({
              user,
              token: authData.token,
              isAuthenticated: true,
              loading: false,
              error: null
            });
            return;
          }
        }
      }
      set({ user: null, token: null, isAuthenticated: false, loading: false, error: null });
    },

    async login(correo, password) {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const { user, token } = await apiAdapter.login(correo, password);
        set({
          user,
          token,
          isAuthenticated: true,
          loading: false,
          error: null
        });
        return { success: true };
      } catch (error) {
        update(state => ({
          ...state,
          loading: false,
          error: error.message
        }));
        return { success: false, error: error.message };
      }
    },

    async register(userData) {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const { user } = await apiAdapter.register(userData);
        update(state => ({ ...state, loading: false, error: null }));
        return { success: true, user };
      } catch (error) {
        update(state => ({
          ...state,
          loading: false,
          error: error.message
        }));
        return { success: false, error: error.message };
      }
    },

    async logout() {
      await apiAdapter.logout();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      });
    },

    clearError() {
      update(state => ({ ...state, error: null }));
    }
  };
}

export const authStore = createAuthStore();
export const currentUser = derived(authStore, $auth => $auth.user);
export const isAuthenticated = derived(authStore, $auth => $auth.isAuthenticated);
