<script>
  import { Link, navigate } from 'svelte-routing';
  import { authStore } from '../stores/authStore.js';
  import Button from '../components/ui/Button.svelte';
  import Input from '../components/ui/Input.svelte';
  
  let correo = '';
  let password = '';
  let error = '';
  let loading = false;
  
  async function handleSubmit() {
    error = '';
    
    if (!correo || !password) {
      error = 'Por favor complete todos los campos';
      return;
    }
    
    loading = true;
    const result = await authStore.login(correo, password);
    loading = false;
    
    if (result.success) {
      navigate('/productos', { replace: true });
    } else {
      error = result.error || 'Error al iniciar sesión';
    }
  }
</script>

<div class="login-page">
  <h2 class="title">Iniciar Sesión</h2>
  <p class="subtitle">Ingrese sus credenciales para continuar</p>
  
  <form on:submit|preventDefault={handleSubmit}>
    <Input
      type="email"
      label="Correo electrónico"
      bind:value={correo}
      placeholder="correo@ejemplo.com"
      required
      id="email"
    />
    
    <Input
      type="password"
      label="Contraseña"
      bind:value={password}
      placeholder="••••••••"
      required
      id="password"
    />
    
    {#if error}
      <div class="error-box">
        {error}
      </div>
    {/if}
    
    <Button type="submit" variant="primary" fullWidth disabled={loading}>
      {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
    </Button>
  </form>
  
  <div class="register-link">
    ¿No tiene cuenta? <Link to="/register">Registrarse</Link>
  </div>
</div>

<style>
  .login-page {
    width: 100%;
  }

  .title {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-sm);
    text-align: center;
  }

  .subtitle {
    text-align: center;
    color: var(--fg-tertiary);
    margin-bottom: var(--space-2xl);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .error-box {
    padding: var(--space-md);
    background-color: rgba(239, 68, 68, 0.1);
    border: 1px solid var(--error);
    border-radius: var(--radius-md);
    color: var(--error);
    font-size: var(--text-sm);
  }

  .register-link {
    text-align: center;
    margin-top: var(--space-xl);
    color: var(--fg-secondary);
    font-size: var(--text-sm);
  }

  .register-link :global(a) {
    color: var(--accent-primary);
    font-weight: var(--font-medium);
  }
</style>
