import { writable } from 'svelte/store';

function createThemeStore() {
  const stored = typeof window !== 'undefined' 
    ? localStorage.getItem('ferrelink_theme') || 'light'
    : 'light';
  
  const { subscribe, set, update } = writable(stored);

  return {
    subscribe,
    toggle: () => {
      update(current => {
        const newTheme = current === 'light' ? 'dark' : 'light';
        if (typeof window !== 'undefined') {
          localStorage.setItem('ferrelink_theme', newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
        }
        return newTheme;
      });
    },
    set: (theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('ferrelink_theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
      }
      set(theme);
    },
    init: () => {
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-theme', stored);
      }
    }
  };
}

export const theme = createThemeStore();
