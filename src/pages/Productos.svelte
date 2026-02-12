<script>
  import { onMount } from 'svelte';
  import { productsStore } from '../stores/productStore.js';
  import { providersStore } from '../stores/providersStore.js';
  import Button from '../components/ui/Button.svelte';
  import Card from '../components/ui/Card.svelte';
  import Table from '../components/ui/Table.svelte';
  import Modal from '../components/ui/Modal.svelte';
  import Input from '../components/ui/Input.svelte';
  import { nanoid } from 'nanoid';
  
  let products = [];
  let providers = [];
  let showModal = false;
  let editingProduct = null;
  let searchTerm = '';
  
  // Form fields
  let codigo = '';
  let nombre = '';
  let precio = '';
  let descripcion = '';
  let stock = '';
  
  onMount(async () => {
    await productsStore.load();
    await providersStore.load();
    
    productsStore.subscribe(value => {
      products = value;
    });
    
    providersStore.subscribe(value => {
      providers = value;
    });
  });
  
  $: filteredProducts = products.filter(p =>
    p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.codigo?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  function openCreateModal() {
    editingProduct = null;
    codigo = 'PRD-' + nanoid(6).toUpperCase();
    nombre = '';
    precio = '';
    descripcion = '';
    stock = '';
    showModal = true;
  }
  
  function openEditModal(product) {
    editingProduct = product;
    codigo = product.codigo;
    nombre = product.nombre;
    precio = product.precio;
    descripcion = product.descripcion || '';
    stock = product.stock;
    showModal = true;
  }
  
  async function handleSave() {
    const productData = {
      codigo,
      nombre,
      precio: parseFloat(precio),
      descripcion,
      stock: parseInt(stock)
    };
    
    if (editingProduct) {
      await productsStore.update(codigo, productData);
    } else {
      await productsStore.create(productData);
    }
    
    showModal = false;
  }
  
  async function handleDelete(codigo) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      await productsStore.delete(codigo);
    }
  }
</script>

<div class="productos-page">
  <div class="page-header">
    <h1>Gestión de Productos</h1>
    <Button variant="primary" on:click={openCreateModal}>
      + Nuevo Producto
    </Button>
  </div>
  
  <Card padding="md">
    <div class="search-bar">
      <Input
        type="text"
        placeholder="Buscar por nombre o código..."
        bind:value={searchTerm}
      />
    </div>
    
    <Table hoverable>
      <tr slot="header">
        <th>Código</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Acciones</th>
      </tr>
      
      {#each filteredProducts as product}
        <tr>
          <td><code>{product.codigo}</code></td>
          <td>{product.nombre}</td>
          <td>${product.precio?.toFixed(2)}</td>
          <td>
            <span class="stock-badge" class:low={product.stock <= 5}>
              {product.stock}
            </span>
          </td>
          <td>
            <div class="actions">
              <Button size="sm" variant="secondary" on:click={() => openEditModal(product)}>
                Editar
              </Button>
              <Button size="sm" variant="danger" on:click={() => handleDelete(product.codigo)}>
                Eliminar
              </Button>
            </div>
          </td>
        </tr>
      {/each}
      
      {#if filteredProducts.length === 0}
        <tr>
          <td colspan="5" class="empty-state">
            {searchTerm ? 'No se encontraron productos' : 'No hay productos registrados'}
          </td>
        </tr>
      {/if}
    </Table>
  </Card>
</div>

<Modal bind:open={showModal} title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}>
  <form on:submit|preventDefault={handleSave}>
    <div class="form-content">
      <Input
        label="Código"
        bind:value={codigo}
        placeholder="PRD-XXXXX"
        required
        disabled={!!editingProduct}
        id="codigo"
      />
      
      <Input
        label="Nombre"
        bind:value={nombre}
        placeholder="Nombre del producto"
        required
        id="nombre"
      />
      
      <div class="form-row">
        <Input
          type="number"
          label="Precio"
          bind:value={precio}
          placeholder="0.00"
          required
          id="precio"
        />
        
        <Input
          type="number"
          label="Stock"
          bind:value={stock}
          placeholder="0"
          required
          id="stock"
        />
      </div>
      
      <div class="textarea-wrapper">
        <label for="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          bind:value={descripcion}
          placeholder="Descripción del producto..."
          rows="4"
        ></textarea>
      </div>
    </div>
  </form>
  
  <div slot="footer">
    <Button variant="ghost" on:click={() => showModal = false}>
      Cancelar
    </Button>
    <Button variant="primary" on:click={handleSave}>
      {editingProduct ? 'Actualizar' : 'Crear'}
    </Button>
  </div>
</Modal>

<style>
  .productos-page {
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

  .stock-badge {
    display: inline-block;
    padding: var(--space-xs) var(--space-md);
    background-color: var(--success);
    color: white;
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
  }

  .stock-badge.low {
    background-color: var(--error);
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

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
  }

  .textarea-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .textarea-wrapper label {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--fg-secondary);
  }

  textarea {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    font-size: var(--text-base);
    font-family: inherit;
    color: var(--fg-primary);
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    resize: vertical;
  }

  textarea:focus {
    outline: none;
    border-color: var(--accent-primary);
    background-color: var(--bg-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
