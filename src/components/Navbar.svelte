<script>
  import { Link, navigate } from 'svelte-routing';
  import { authStore, currentUser } from '../stores/authStore.js';
  import ThemeToggle from './ui/ThemeToggle.svelte';
  
  let user = null;
  currentUser.subscribe(value => {
    user = value;
  });
  
  function handleLogout() {
    authStore.logout();
    navigate('/login');
  }
</script>

<nav class="navbar">
  <div class="container navbar-content">
    <div class="navbar-left">
      <Link to="/" class="logo">
        <span class="logo-text">FerreLink</span>
      </Link>
      
      <div class="nav-links">
        <Link to="/productos" class="nav-link">Productos</Link>
        <Link to="/proveedores" class="nav-link">Proveedores</Link>
        <Link to="/ventas" class="nav-link">Ventas</Link>
        <Link to="/reportes" class="nav-link">Reportes</Link>
        {#if user?.rol_id === 1}
          <Link to="/users" class="nav-link">Usuarios</Link>
        {/if}
      </div>
    </div>
    
    <div class="navbar-right">
      <ThemeToggle />
      
      {#if user}
        <div class="user-info">
          <span class="user-name">{user.primer_nombre} {user.primer_apellido}</span>
          <button class="logout-btn" on:click={handleLogout}>
            Salir
          </button>
        </div>
      {/if}
    </div>
  </div>
</nav>

<style>
  .navbar {
    background-color: var(--bg-elevated);
    border-bottom: 1px solid var(--border-primary);
    padding: var(--space-md) 0;
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(8px);
  }

  .navbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-lg);
  }

  .navbar-left {
    display: flex;
    align-items: center;
    gap: var(--space-2xl);
  }

  :global(a.logo) {
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .logo-text {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--accent-primary);
  }

  .nav-links {
    display: flex;
    gap: var(--space-sm);
  }

  :global(a.nav-link) {
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    color: var(--fg-secondary);
    text-decoration: none;
    font-weight: var(--font-medium);
    transition: all var(--transition-fast);
  }

  :global(a.nav-link:hover) {
    background-color: var(--bg-tertiary);
    color: var(--fg-primary);
  }

  .navbar-right {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .user-name {
    font-size: var(--text-sm);
    color: var(--fg-secondary);
    font-weight: var(--font-medium);
  }

  .logout-btn {
    padding: var(--space-sm) var(--space-md);
    background-color: transparent;
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    color: var(--fg-secondary);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .logout-btn:hover {
    background-color: var(--error);
    border-color: var(--error);
    color: white;
  }

  @media (max-width: 768px) {
    .navbar-content {
      flex-direction: column;
    }

    .navbar-left {
      flex-direction: column;
      width: 100%;
    }

    .nav-links {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
    }

    .user-name {
      display: none;
    }
  }
</style>
