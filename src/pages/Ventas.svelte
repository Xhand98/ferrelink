<script>
  import { onMount } from 'svelte';
  import { salesStore } from '../stores/salesStore.js';
  import { productsStore } from '../stores/productStore.js';
  import { currentUser } from '../stores/authStore.js';
  import { format } from 'date-fns';
  import Button from '../components/ui/Button.svelte';
  import Card from '../components/ui/Card.svelte';
  import Table from '../components/ui/Table.svelte';
  import Modal from '../components/ui/Modal.svelte';
  import Select from '../components/ui/Select.svelte';
  import Input from '../components/ui/Input.svelte';
  
  let sales = [];
  let products = [];
  let user = null;
  let showModal = false;
  
  // Sale form
  let selectedProducts = [{ product_codigo: '', cantidad: 1, precio_unitario: 0 }];
  
  onMount(async () => {
    await salesStore.load();
    await productsStore.load();
    
    salesStore.subscribe(value => {
      sales = value;
    });
    
    productsStore.subscribe(value => {
      products = value;
    });
    
    currentUser.subscribe(value => {
      user = value;
    });
  });
  
  $: productOptions = products.map(p => ({ 
    value: p.codigo, 
    label: `${p.nombre} - $${p.precio} (Stock: ${p.stock})` 
  }));
  
  $: total = selectedProducts.reduce((sum, item) => {
    if (item.product_codigo && item.cantidad) {
      const product = products.find(p => p.codigo === item.product_codigo);
      return sum + (product ? product.precio * item.cantidad : 0);
    }
    return sum;
  }, 0);
  
  function addProductLine() {
    selectedProducts = [...selectedProducts, { product_codigo: '', cantidad: 1, precio_unitario: 0 }];
  }
  
  function removeProductLine(index) {
    selectedProducts = selectedProducts.filter((_, i) => i !== index);
  }
  
  function updateProductPrice(index) {
    const item = selectedProducts[index];
    const product = products.find(p => p.codigo === item.product_codigo);
    if (product) {
      selectedProducts[index].precio_unitario = product.precio;
    }
  }
  
  async function handleCreateSale() {
    if (!user) return;
    
    // Validate stock
    for (const item of selectedProducts) {
      if (!item.product_codigo) continue;
      const product = products.find(p => p.codigo === item.product_codigo);
      if (!product || product.stock < item.cantidad) {
        alert(`Stock insuficiente para ${product?.nombre || 'producto'}`);
        return;
      }
    }
    
    const saleData = {
      usuario_id: user.id,
      total,
      items: selectedProducts
        .filter(item => item.product_codigo)
        .map(item => {
          const product = products.find(p => p.codigo === item.product_codigo);
          return {
            product_codigo: item.product_codigo,
            cantidad: item.cantidad,
            precio_unitario: product.precio,
            subtotal: product.precio * item.cantidad
          };
        })
    };
    
    await salesStore.create(saleData);
    
    // Update stock
    for (const item of saleData.items) {
      await productsStore.updateStock(item.product_codigo, item.cantidad);
    }
    
    // Reset form
    selectedProducts = [{ product_codigo: '', cantidad: 1, precio_unitario: 0 }];
    showModal = false;
    
    // Reload data
    await salesStore.load();
    await productsStore.load();
  }
</script>

<div class="ventas-page">
  <div class="page-header">
    <h1>Gestión de Ventas</h1>
    <Button variant="primary" on:click={() => showModal = true}>
      + Nueva Venta
    </Button>
  </div>
  
  <Card padding="md">
    <h3 style="margin-bottom: var(--space-lg);">Historial de Ventas</h3>
    
    <Table hoverable>
      <tr slot="header">
        <th>Fecha</th>
        <th>Total</th>
        <th>Items</th>
      </tr>
      
      {#each sales as sale}
        <tr>
          <td>{new Date(sale.fecha).toLocaleString()}</td>
          <td><strong>${sale.total?.toFixed(2)}</strong></td>
          <td>{sale.items?.length || 0} productos</td>
        </tr>
      {/each}
      
      {#if sales.length === 0}
        <tr>
          <td colspan="3" class="empty-state">
            No hay ventas registradas
          </td>
        </tr>
      {/if}
    </Table>
  </Card>
</div>

<Modal bind:open={showModal} title="Nueva Venta" size="lg">
  <form on:submit|preventDefault={handleCreateSale}>
    <div class="form-content">
      <div class="sale-items">
        {#each selectedProducts as item, index}
          <div class="sale-item-row">
            <div class="item-select">
              <Select
                label={index === 0 ? 'Producto' : ''}
                bind:value={item.product_codigo}
                options={productOptions}
                placeholder="Seleccionar producto"
                on:change={() => updateProductPrice(index)}
              />
            </div>
            
            <div class="item-quantity">
              <Input
                type="number"
                label={index === 0 ? 'Cantidad' : ''}
                bind:value={item.cantidad}
                min="1"
              />
            </div>
            
            <div class="item-actions">
              {#if index === 0}
                <label>&nbsp;</label>
              {/if}
              <Button
                type="button"
                variant="danger"
                size="sm"
                on:click={() => removeProductLine(index)}
                disabled={selectedProducts.length === 1}
              >
                ✕
              </Button>
            </div>
          </div>
        {/each}
        
        <Button type="button" variant="ghost" size="sm" on:click={addProductLine}>
          + Agregar producto
        </Button>
      </div>
      
      <div class="sale-total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  </form>
  
  <div slot="footer">
    <Button variant="ghost" on:click={() => showModal = false}>
      Cancelar
    </Button>
    <Button variant="success" on:click={handleCreateSale} disabled={selectedProducts.length === 0 || total === 0}>
      Realizar Venta
    </Button>
  </div>
</Modal>

<style>
  .ventas-page {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xl);
  }

  .empty-state {
    text-align: center;
    color: var(--fg-tertiary);
    padding: var(--space-2xl) !important;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  .sale-items {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .sale-item-row {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: var(--space-md);
    align-items: end;
  }

  .item-select {
    min-width: 0;
  }

  .item-quantity {
    width: 120px;
  }

  .item-actions {
    width: 60px;
  }

  .sale-total {
    padding: var(--space-lg);
    background-color: var(--bg-tertiary);
    border-radius: var(--radius-md);
    text-align: right;
    font-size: var(--text-xl);
    color: var(--accent-primary);
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      gap: var(--space-md);
      align-items: stretch;
    }

    .sale-item-row {
      grid-template-columns: 1fr;
      gap: var(--space-sm);
    }

    .item-quantity,
    .item-actions {
      width: 100%;
    }
  }
</style>
