<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { authStore } from '../stores/authStore.js';
  import Navbar from '../components/Navbar.svelte';
  
  let isAuthenticated = false;
  
  authStore.subscribe(state => {
    isAuthenticated = state.isAuthenticated;
  });
  
  onMount(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  });
</script>

{#if isAuthenticated}
  <div class="app-layout">
    <Navbar />
    <main class="main-content">
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
{/if}

<style>
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    padding: var(--space-xl) 0;
  }
</style>
