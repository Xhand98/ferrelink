<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { authStore } from '../stores/authStore.js';
  
  let isAuthenticated = false;
  
  authStore.subscribe(state => {
    isAuthenticated = state.isAuthenticated;
  });
  
  onMount(() => {
    if (isAuthenticated) {
      navigate('/productos', { replace: true });
    }
  });
</script>

<div class="auth-layout">
  <div class="auth-container">
    <div class="auth-header">
      <h1 class="logo">FerreLink</h1>
      <p class="subtitle">FerreteríaMaster</p>
    </div>
    
    <div class="auth-content">
      <slot />
    </div>
  </div>
</div>

<style>
  .auth-layout {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-lg);
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  }

  .auth-container {
    width: 100%;
    max-width: 450px;
  }

  .auth-header {
    text-align: center;
    margin-bottom: var(--space-2xl);
  }

  .logo {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--accent-primary);
    margin-bottom: var(--space-sm);
  }

  .subtitle {
    font-size: var(--text-lg);
    color: var(--fg-tertiary);
    margin: 0;
  }

  .auth-content {
    background-color: var(--bg-elevated);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    box-shadow: var(--shadow-xl);
  }
</style>
