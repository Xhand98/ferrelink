import { writable } from 'svelte/store';
import { apiAdapter } from '../services/api.adapter.js';

function createRolesStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    
    async load() {
      const roles = await apiAdapter.getAll('roles');
      set(roles);
    },

    async create(roleData) {
      const newRole = await apiAdapter.create('roles', roleData);
      update(roles => [...roles, newRole]);
      return newRole;
    },

    async update(id, roleData) {
      const updated = await apiAdapter.update('roles', id, roleData);
      update(roles => roles.map(r => r.id === id ? updated : r));
      return updated;
    },

    async delete(id) {
      await apiAdapter.delete('roles', id);
      update(roles => roles.filter(r => r.id !== id));
    }
  };
}

export const rolesStore = createRolesStore();
