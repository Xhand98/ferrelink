import { writable } from 'svelte/store';
import { apiAdapter } from '../services/api.adapter.js';
import { nanoid } from 'nanoid';

function createSalesStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    
    async load() {
      const sales = await apiAdapter.getAll('sales');
      set(sales);
    },

    async create(saleData) {
      // Create sale with items
      const saleId = nanoid();
      const sale = {
        id: saleId,
        usuario_id: saleData.usuario_id,
        fecha: new Date().toISOString(),
        total: saleData.total
      };
      
      const newSale = await apiAdapter.create('sales', sale);
      
      // Create sale items
      for (const item of saleData.items) {
        await apiAdapter.create('sale_items', {
          sale_id: saleId,
          product_codigo: item.product_codigo,
          cantidad: item.cantidad,
          precio_unitario: item.precio_unitario,
          subtotal: item.subtotal
        });
      }
      
      update(sales => [...sales, newSale]);
      return newSale;
    },

    async getById(id) {
      const sale = await apiAdapter.getById('sales', id);
      const items = await apiAdapter.getAll('sale_items');
      sale.items = items.filter(item => item.sale_id === id);
      return sale;
    }
  };
}

export const salesStore = createSalesStore();
