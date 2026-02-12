import { writable } from 'svelte/store';
import { apiAdapter } from '../services/api.adapter.js';

function createUsersStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    
    async load() {
      const users = await apiAdapter.getAll('users');
      set(users);
    },

    async create(userData) {
      const newUser = await apiAdapter.create('users', userData);
      update(users => [...users, newUser]);
      return newUser;
    },

    async update(id, userData) {
      const updated = await apiAdapter.update('users', id, userData);
      update(users => users.map(u => u.id === id ? updated : u));
      return updated;
    },

    async delete(id) {
      await apiAdapter.delete('users', id);
      update(users => users.filter(u => u.id !== id));
    }
  };
}

export const usersStore = createUsersStore();
