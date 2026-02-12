<script>
  import { Router, Route } from 'svelte-routing';
  import { onMount } from 'svelte';
  
  import { authStore } from './stores/authStore.js';
  import { theme } from './stores/themeStore.js';
  
  import AppLayout from './layouts/AppLayout.svelte';
  import AuthLayout from './layouts/AuthLayout.svelte';
  
  import Landing from './pages/Landing.svelte';
  import Login from './pages/Login.svelte';
  import Register from './pages/Register.svelte';
  import Productos from './pages/Productos.svelte';
  import Proveedores from './pages/Proveedores.svelte';
  import Ventas from './pages/Ventas.svelte';
  import Reportes from './pages/Reportes.svelte';
  import Users from './pages/Users.svelte';
  import ComponentsDemo from './pages/ComponentsDemo.svelte';
  
  // Initialize theme immediately
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  
  onMount(() => {
    theme.init();
    authStore.init();
  });
</script>

<Router>
  <Route path="/">
    <Landing />
  </Route>
  
  <Route path="/login">
    <AuthLayout>
      <Login />
    </AuthLayout>
  </Route>
  
  <Route path="/register">
    <AuthLayout>
      <Register />
    </AuthLayout>
  </Route>
  
  <Route path="/productos">
    <AppLayout>
      <Productos />
    </AppLayout>
  </Route>
  
  <Route path="/proveedores">
    <AppLayout>
      <Proveedores />
    </AppLayout>
  </Route>
  
  <Route path="/ventas">
    <AppLayout>
      <Ventas />
    </AppLayout>
  </Route>
  
  <Route path="/reportes">
    <AppLayout>
      <Reportes />
    </AppLayout>
  </Route>
  
  <Route path="/users">
    <AppLayout>
      <Users />
    </AppLayout>
  </Route>
  
  <Route path="/demo">
    <ComponentsDemo />
  </Route>
</Router>
