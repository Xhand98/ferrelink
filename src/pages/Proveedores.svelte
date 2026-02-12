<script>
  import { onMount } from 'svelte';
  import { providersStore } from '../stores/providersStore.js';
  import Button from '../components/ui/Button.svelte';
  import Card from '../components/ui/Card.svelte';
  import Table from '../components/ui/Table.svelte';
  import Modal from '../components/ui/Modal.svelte';
  import Input from '../components/ui/Input.svelte';
  
  let providers = [];
  let showModal = false;
  let editingProvider = null;
  let searchTerm = '';
  
  // Form fields
  let nombre_compania = '';
  let numero_contacto = '';
  let correo_contacto = '';
  
  onMount(async () => {
    await providersStore.load();
    providersStore.subscribe(value => {
      providers = value;
    });
  });
  
  $: filteredProviders = providers.filter(p =>
    p.nombre_compania?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.correo_contacto?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  function openCreateModal() {
    editingProvider = null;
    nombre_compania = '';
    numero_contacto = '';
    correo_contacto = '';
    showModal = true;
  }
  
  function openEditModal(provider) {
    editingProvider = provider;
    nombre_compania = provider.nombre_compania;
    numero_contacto = provider.numero_contacto;
    correo_contacto = provider.correo_contacto;
    showModal = true;
  }
  
  async function handleSave() {
    const providerData = {
      nombre_compania,
      numero_contacto,
      correo_contacto
    };
    
    if (editingProvider) {
      await providersStore.update(editingProvider.id, providerData);
    } else {
      await providersStore.create(providerData);
    }
    
    showModal = false;
  }
  
  async function handleDelete(id) {
    if (confirm('¿Está seguro de eliminar este proveedor?')) {
      await providersStore.delete(id);
    }
  }
</script>

<div class="proveedores-page">
  <div class="page-header">
    <h1>Gestión de Proveedores</h1>
    <Button variant="primary" on:click={openCreateModal}>
      + Nuevo Proveedor
    </Button>
  </div>
  
  <Card padding="md">
    <div class="search-bar">
      <Input
        type="text"
        placeholder="Buscar por nombre o correo..."
        bind:value={searchTerm}
      />
    </div>
    
    <Table hoverable>
      <tr slot="header">
        <th>Compañía</th>
        <th>Teléfono</th>
        <th>Correo</th>
        <th>Acciones</th>
      </tr>
      
      {#each filteredProviders as provider}
        <tr>
          <td><strong>{provider.nombre_compania}</strong></td>
          <td>{provider.numero_contacto}</td>
          <td>{provider.correo_contacto}</td>
          <td>
            <div class="actions">
              <Button size="sm" variant="secondary" on:click={() => openEditModal(provider)}>
                Editar
              </Button>
              <Button size="sm" variant="danger" on:click={() => handleDelete(provider.id)}>
                Eliminar
              </Button>
            </div>
          </td>
        </tr>
      {/each}
      
      {#if filteredProviders.length === 0}
        <tr>
          <td colspan="4" class="empty-state">
            {searchTerm ? 'No se encontraron proveedores' : 'No hay proveedores registrados'}
          </td>
        </tr>
      {/if}
    </Table>
  </Card>
</div>

<Modal bind:open={showModal} title={editingProvider ? 'Editar Proveedor' : 'Nuevo Proveedor'}>
  <form on:submit|preventDefault={handleSave}>
    <div class="form-content">
      <Input
        label="Nombre de la Compañía"
        bind:value={nombre_compania}
        placeholder="Ferretería XYZ"
        required
        id="nombre-compania"
      />
      
      <Input
        type="tel"
        label="Número de Contacto"
        bind:value={numero_contacto}
        placeholder="+503 1234-5678"
        required
        id="numero-contacto"
      />
      
      <Input
        type="email"
        label="Correo de Contacto"
        bind:value={correo_contacto}
        placeholder="contacto@empresa.com"
        required
        id="correo-contacto"
      />
    </div>
  </form>
  
  <div slot="footer">
    <Button variant="ghost" on:click={() => showModal = false}>
      Cancelar
    </Button>
    <Button variant="primary" on:click={handleSave}>
      {editingProvider ? 'Actualizar' : 'Crear'}
    </Button>
  </div>
</Modal>

<style>
  .proveedores-page {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xl);
  }

  .search-bar {
    margin-bottom: var(--space-lg);
  }

  .actions {
    display: flex;
    gap: var(--space-sm);
  }

  .empty-state {
    text-align: center;
    color: var(--fg-tertiary);
    padding: var(--space-2xl) !important;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      gap: var(--space-md);
      align-items: stretch;
    }

    .actions {
      flex-direction: column;
    }
  }
</style>
