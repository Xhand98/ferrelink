import { writable } from 'svelte/store';
import { apiAdapter } from '../services/api.adapter.js';

function createProvidersStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    
    async load() {
      const providers = await apiAdapter.getAll('providers');
      set(providers);
    },

    async create(providerData) {
      const newProvider = await apiAdapter.create('providers', providerData);
      update(providers => [...providers, newProvider]);
      return newProvider;
    },

    async update(id, providerData) {
      const updated = await apiAdapter.update('providers', id, providerData);
      update(providers => providers.map(p => p.id === id ? updated : p));
      return updated;
    },

    async delete(id) {
      await apiAdapter.delete('providers', id);
      update(providers => providers.filter(p => p.id !== id));
    }
  };
}

export const providersStore = createProvidersStore();
