<script>
  import { Link, navigate } from 'svelte-routing';
  import { authStore } from '../stores/authStore.js';
  import { rolesStore } from '../stores/rolesStore.js';
  import { onMount } from 'svelte';
  import Button from '../components/ui/Button.svelte';
  import Input from '../components/ui/Input.svelte';
  import Select from '../components/ui/Select.svelte';
  
  let primer_nombre = '';
  let segundo_nombre = '';
  let primer_apellido = '';
  let segundo_apellido = '';
  let correo = '';
  let password = '';
  let confirmPassword = '';
  let rol_id = 2; // Default: Vendedor
  let error = '';
  let loading = false;
  let roles = [];
  
  onMount(async () => {
    await rolesStore.load();
    rolesStore.subscribe(value => {
      roles = value;
    });
  });
  
  $: roleOptions = roles.map(r => ({ value: r.id, label: r.nombre }));
  
  async function handleSubmit() {
    error = '';
    
    if (!primer_nombre || !primer_apellido || !correo || !password) {
      error = 'Por favor complete los campos obligatorios';
      return;
    }
    
    if (password !== confirmPassword) {
      error = 'Las contraseñas no coinciden';
      return;
    }
    
    if (password.length < 6) {
      error = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }
    
    loading = true;
    const result = await authStore.register({
      rol_id,
      primer_nombre,
      segundo_nombre: segundo_nombre || null,
      primer_apellido,
      segundo_apellido: segundo_apellido || null,
      correo,
      password
    });
    loading = false;
    
    if (result.success) {
      navigate('/login');
    } else {
      error = result.error || 'Error al registrar usuario';
    }
  }
</script>

<div class="register-page">
  <h2 class="title">Crear Cuenta</h2>
  <p class="subtitle">Complete el formulario para registrarse</p>
  
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-row">
      <Input
        label="Primer Nombre"
        bind:value={primer_nombre}
        placeholder="Juan"
        required
        id="primer-nombre"
      />
      
      <Input
        label="Segundo Nombre"
        bind:value={segundo_nombre}
        placeholder="Carlos"
        id="segundo-nombre"
      />
    </div>
    
    <div class="form-row">
      <Input
        label="Primer Apellido"
        bind:value={primer_apellido}
        placeholder="Pérez"
        required
        id="primer-apellido"
      />
      
      <Input
        label="Segundo Apellido"
        bind:value={segundo_apellido}
        placeholder="González"
        id="segundo-apellido"
      />
    </div>
    
    <Input
      type="email"
      label="Correo electrónico"
      bind:value={correo}
      placeholder="correo@ejemplo.com"
      required
      id="email"
    />
    
    <Select
      label="Rol"
      bind:value={rol_id}
      options={roleOptions}
      placeholder="Seleccionar rol"
      id="rol"
    />
    
    <Input
      type="password"
      label="Contraseña"
      bind:value={password}
      placeholder="••••••••"
      required
      id="password"
    />
    
    <Input
      type="password"
      label="Confirmar Contraseña"
      bind:value={confirmPassword}
      placeholder="••••••••"
      required
      id="confirm-password"
    />
    
    {#if error}
      <div class="error-box">
        {error}
      </div>
    {/if}
    
    <Button type="submit" variant="primary" fullWidth disabled={loading}>
      {loading ? 'Registrando...' : 'Registrarse'}
    </Button>
  </form>
  
  <div class="login-link">
    ¿Ya tiene cuenta? <Link to="/login">Iniciar Sesión</Link>
  </div>
</div>

<style>
  .register-page {
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

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
  }

  .error-box {
    padding: var(--space-md);
    background-color: rgba(239, 68, 68, 0.1);
    border: 1px solid var(--error);
    border-radius: var(--radius-md);
    color: var(--error);
    font-size: var(--text-sm);
  }

  .login-link {
    text-align: center;
    margin-top: var(--space-xl);
    color: var(--fg-secondary);
    font-size: var(--text-sm);
  }

  .login-link :global(a) {
    color: var(--accent-primary);
    font-weight: var(--font-medium);
  }

  @media (max-width: 640px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
