// API Adapter - Interface for data operations
// Switch between localStorage and API by changing USE_API flag

import { localStorageService, STORAGE_KEYS } from './localStorage.service.js';
import { nanoid } from 'nanoid';

const USE_API = false; // Set to true when backend is ready
const API_BASE_URL = 'http://localhost:5000/api'; // Update with your API URL

class APIAdapter {
  // Generic CRUD operations
  async getAll(resource) {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/${resource}`);
      return response.json();
    } else {
      return localStorageService.get(STORAGE_KEYS[resource.toUpperCase()]) || [];
    }
  }

  async getById(resource, id) {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/${resource}/${id}`);
      return response.json();
    } else {
      const items = localStorageService.get(STORAGE_KEYS[resource.toUpperCase()]) || [];
      return items.find(item => item.id === id);
    }
  }

  async create(resource, data) {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/${resource}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } else {
      const items = localStorageService.get(STORAGE_KEYS[resource.toUpperCase()]) || [];
      const newItem = { 
        ...data, 
        id: data.id || nanoid(),
        fecha_creacion: data.fecha_creacion || new Date().toISOString(),
        fecha_actualizacion: data.fecha_actualizacion || new Date().toISOString()
      };
      items.push(newItem);
      localStorageService.set(STORAGE_KEYS[resource.toUpperCase()], items);
      return newItem;
    }
  }

  async update(resource, id, data) {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/${resource}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } else {
      const items = localStorageService.get(STORAGE_KEYS[resource.toUpperCase()]) || [];
      const index = items.findIndex(item => item.id === id);
      if (index !== -1) {
        items[index] = { 
          ...items[index], 
          ...data, 
          fecha_actualizacion: new Date().toISOString() 
        };
        localStorageService.set(STORAGE_KEYS[resource.toUpperCase()], items);
        return items[index];
      }
      return null;
    }
  }

  async delete(resource, id) {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/${resource}/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    } else {
      const items = localStorageService.get(STORAGE_KEYS[resource.toUpperCase()]) || [];
      const filtered = items.filter(item => item.id !== id);
      localStorageService.set(STORAGE_KEYS[resource.toUpperCase()], filtered);
      return { success: true };
    }
  }

  // Auth specific methods
  async login(correo, password) {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });
      return response.json();
    } else {
      const users = localStorageService.get(STORAGE_KEYS.USERS) || [];
      const user = users.find(u => u.correo === correo);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Import bcrypt for password comparison
      const bcrypt = await import('bcryptjs');
      const isValid = await bcrypt.compare(password, user.password);
      
      if (!isValid) {
        throw new Error('Contraseña incorrecta');
      }

      const token = nanoid();
      const authData = {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      };
      
      localStorageService.set(STORAGE_KEYS.AUTH, authData);
      
      return { user, token };
    }
  }

  async register(userData) {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return response.json();
    } else {
      const users = localStorageService.get(STORAGE_KEYS.USERS) || [];
      
      // Check if email exists
      if (users.find(u => u.correo === userData.correo)) {
        throw new Error('El correo ya está registrado');
      }

      // Hash password
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = {
        id: nanoid(),
        rol_id: userData.rol_id || 2, // Default to Vendedor
        primer_nombre: userData.primer_nombre,
        segundo_nombre: userData.segundo_nombre || null,
        primer_apellido: userData.primer_apellido,
        segundo_apellido: userData.segundo_apellido || null,
        correo: userData.correo,
        password: hashedPassword
      };

      users.push(newUser);
      localStorageService.set(STORAGE_KEYS.USERS, users);

      return { user: newUser };
    }
  }

  async logout() {
    if (USE_API) {
      // API logout logic
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST'
      });
      return response.json();
    } else {
      localStorageService.remove(STORAGE_KEYS.AUTH);
      return { success: true };
    }
  }

  getCurrentAuth() {
    return localStorageService.get(STORAGE_KEYS.AUTH);
  }
}

export const apiAdapter = new APIAdapter();
