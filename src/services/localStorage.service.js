// LocalStorage Service - Abstraction layer for data persistence
// This service will be replaced by API calls when backend is ready

const STORAGE_KEYS = {
  ROLES: 'ferrelink_roles',
  USERS: 'ferrelink_users',
  PRODUCTS: 'ferrelink_products',
  PROVIDERS: 'ferrelink_providers',
  PROVIDERS_PRODUCTS: 'ferrelink_providers_products',
  SALES: 'ferrelink_sales',
  SALE_ITEMS: 'ferrelink_sale_items',
  AUTH: 'ferrelink_auth'
};

class LocalStorageService {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    // Initialize with default data if empty
    if (!this.get(STORAGE_KEYS.ROLES)) {
      this.set(STORAGE_KEYS.ROLES, [
        { id: 1, nombre: 'Admin', description: 'Administrator with full access' },
        { id: 2, nombre: 'Vendedor', description: 'Sales person' },
        { id: 3, nombre: 'Gerente', description: 'Manager with reports access' }
      ]);
    }

    if (!this.get(STORAGE_KEYS.USERS)) {
      // Default admin user (password: admin123)
      this.set(STORAGE_KEYS.USERS, []);
    }

    if (!this.get(STORAGE_KEYS.PRODUCTS)) {
      this.set(STORAGE_KEYS.PRODUCTS, []);
    }

    if (!this.get(STORAGE_KEYS.PROVIDERS)) {
      this.set(STORAGE_KEYS.PROVIDERS, []);
    }

    if (!this.get(STORAGE_KEYS.PROVIDERS_PRODUCTS)) {
      this.set(STORAGE_KEYS.PROVIDERS_PRODUCTS, []);
    }

    if (!this.get(STORAGE_KEYS.SALES)) {
      this.set(STORAGE_KEYS.SALES, []);
    }

    if (!this.get(STORAGE_KEYS.SALE_ITEMS)) {
      this.set(STORAGE_KEYS.SALE_ITEMS, []);
    }
  }

  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      return false;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }

  clear() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
}

export const localStorageService = new LocalStorageService();
export { STORAGE_KEYS };
