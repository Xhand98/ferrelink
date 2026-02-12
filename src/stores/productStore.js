import { writable } from 'svelte/store';
import { apiAdapter } from '../services/api.adapter.js';

function createProductsStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    
    async load() {
      const products = await apiAdapter.getAll('products');
      set(products);
    },

    async create(productData) {
      const newProduct = await apiAdapter.create('products', productData);
      update(products => [...products, newProduct]);
      return newProduct;
    },

    async update(codigo, productData) {
      const updated = await apiAdapter.update('products', codigo, productData);
      update(products => products.map(p => p.codigo === codigo ? updated : p));
      return updated;
    },

    async delete(codigo) {
      await apiAdapter.delete('products', codigo);
      update(products => products.filter(p => p.codigo !== codigo));
    },

    async updateStock(codigo, cantidad) {
      const products = await apiAdapter.getAll('products');
      const product = products.find(p => p.codigo === codigo);
      if (product) {
        return this.update(codigo, { ...product, stock: product.stock - cantidad });
      }
    }
  };
}

export const productsStore = createProductsStore();
