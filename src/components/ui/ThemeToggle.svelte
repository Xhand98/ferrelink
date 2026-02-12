<script>
  import { theme } from '../../stores/themeStore.js';
  
  let isDark = false;
  
  theme.subscribe(value => {
    isDark = value === 'dark';
  });
  
  function toggleTheme() {
    theme.toggle();
  }
</script>

<button
  class="theme-toggle"
  on:click={toggleTheme}
  aria-label="Toggle theme"
  title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
>
  {#if isDark}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  {:else}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    color: var(--fg-primary);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .theme-toggle:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--border-secondary);
    transform: rotate(15deg);
  }

  .theme-toggle:active {
    transform: rotate(15deg) scale(0.95);
  }
</style>
