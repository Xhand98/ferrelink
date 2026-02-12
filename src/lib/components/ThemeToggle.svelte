<script>
  import { onMount } from 'svelte';
  import { Sun, Moon } from 'lucide-svelte';
  
  let theme = $state('light');
  
  onMount(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
  });
  
  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    theme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
</script>

<button 
  onclick={toggleTheme}
  class="theme-toggle"
  aria-label="Toggle theme"
>
  {#if theme === 'light'}
    <Moon size={20} />
  {:else}
    <Sun size={20} />
  {/if}
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border: 3px solid var(--border-primary);
    background-color: var(--background);
    color: var(--foreground);
    cursor: pointer;
    transition: all var(--transition-base);
    padding: 0;
    box-shadow: 4px 4px 0 0 var(--border-primary);
  }
  
  .theme-toggle:hover {
    background-color: var(--foreground);
    color: var(--background);
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 0 var(--border-primary);
  }
  
  .theme-toggle:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 0 var(--border-primary);
  }
</style>
