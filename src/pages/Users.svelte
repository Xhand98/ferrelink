<script>
  import { onMount } from 'svelte';
  import { usersStore } from '../stores/usersStore.js';
  import { rolesStore } from '../stores/rolesStore.js';
  import Button from '../components/ui/Button.svelte';
  import Card from '../components/ui/Card.svelte';
  import Table from '../components/ui/Table.svelte';
  
  let users = [];
  let roles = [];
  
  onMount(async () => {
    await usersStore.load();
    await rolesStore.load();
    
    usersStore.subscribe(value => {
      users = value;
    });
    
    rolesStore.subscribe(value => {
      roles = value;
    });
  });
  
  function getRoleName(rol_id) {
    const role = roles.find(r => r.id === rol_id);
    return role ? role.nombre : 'Unknown';
  }
</script>

<div class="users-page">
  <div class="page-header">
    <h1>Gestión de Usuarios</h1>
  </div>
  
  <Card>
    <Table hoverable>
      <tr slot="header">
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Correo</th>
        <th>Rol</th>
      </tr>
      
      {#each users as user}
        <tr>
          <td>{user.primer_nombre} {user.segundo_nombre || ''}</td>
          <td>{user.primer_apellido} {user.segundo_apellido || ''}</td>
          <td>{user.correo}</td>
          <td>
            <span class="badge">{getRoleName(user.rol_id)}</span>
          </td>
        </tr>
      {/each}
      
      {#if users.length === 0}
        <tr>
          <td colspan="4" class="empty-state">
            No hay usuarios registrados
          </td>
        </tr>
      {/if}
    </Table>
  </Card>
</div>

<style>
  .users-page {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: var(--space-xl);
  }

  .badge {
    display: inline-block;
    padding: var(--space-xs) var(--space-md);
    background-color: var(--accent-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
  }

  .empty-state {
    text-align: center;
    color: var(--fg-tertiary);
    padding: var(--space-2xl) !important;
  }
</style>
