<script>
  import { onMount } from 'svelte';
  import { productsStore } from '../stores/productStore.js';
  import { salesStore } from '../stores/salesStore.js';
  import Card from '../components/ui/Card.svelte';
  import Table from '../components/ui/Table.svelte';
  
  let products = [];
  let sales = [];
  
  onMount(async () => {
    await productsStore.load();
    await salesStore.load();
    
    productsStore.subscribe(value => {
      products = value;
    });
    
    salesStore.subscribe(value => {
      sales = value;
    });
  });
  
  $: totalProductos = products.length;
  
  $: valorInventario = products.reduce(
    (total, p) => total + ((p.precio || 0) * (p.stock || 0)),
    0
  );
  
  $: stockBajo = products.filter(p => (p.stock || 0) <= 5).length;
  
  $: totalVentas = sales.reduce((sum, s) => sum + (s.total || 0), 0);
  
  $: productsLowStock = products.filter(p => (p.stock || 0) <= 5);
</script>

<div class="reportes-page">
  <div class="page-header">
    <h1>📊 Reportes e Inventario</h1>
  </div>
  
  <div class="metrics-grid">
    <Card padding="md" hover={false}>
      <div class="metric">
        <span class="metric-label">Total Productos</span>
        <span class="metric-value">{totalProductos}</span>
      </div>
    </Card>
    
    <Card padding="md" hover={false}>
      <div class="metric">
        <span class="metric-label">Valor del Inventario</span>
        <span class="metric-value">${valorInventario.toFixed(2)}</span>
      </div>
    </Card>
    
    <Card padding="md" hover={false}>
      <div class="metric warning">
        <span class="metric-label">Productos con Stock Bajo</span>
        <span class="metric-value">{stockBajo}</span>
      </div>
    </Card>
    
    <Card padding="md" hover={false}>
      <div class="metric success">
        <span class="metric-label">Total Ventas</span>
        <span class="metric-value">${totalVentas.toFixed(2)}</span>
      </div>
    </Card>
  </div>
  
  <div class="reports-section">
    <Card padding="md">
      <h3 class="section-title">Estado del Inventario</h3>
      
      <Table hoverable striped>
        <tr slot="header">
          <th>Producto</th>
          <th>Código</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Valor</th>
          <th>Estado</th>
        </tr>
        
        {#each products as product}
          <tr class:low-stock={(product.stock || 0) <= 5}>
            <td><strong>{product.nombre}</strong></td>
            <td><code>{product.codigo}</code></td>
            <td>${(product.precio || 0).toFixed(2)}</td>
            <td>{product.stock || 0}</td>
            <td>${((product.precio || 0) * (product.stock || 0)).toFixed(2)}</td>
            <td>
              {#if (product.stock || 0) <= 5}
                <span class="status-badge danger">⚠️ Stock Bajo</span>
              {:else if (product.stock || 0) <= 20}
                <span class="status-badge warning">⚡ Stock Medio</span>
              {:else}
                <span class="status-badge success">✅ Disponible</span>
              {/if}
            </td>
          </tr>
        {/each}
        
        {#if products.length === 0}
          <tr>
            <td colspan="6" class="empty-state">
              No hay productos en el inventario
            </td>
          </tr>
        {/if}
      </Table>
    </Card>
    
    {#if productsLowStock.length > 0}
      <Card padding="md">
        <h3 class="section-title alert">⚠️ Alerta: Productos con Stock Bajo</h3>
        
        <div class="low-stock-grid">
          {#each productsLowStock as product}
            <div class="low-stock-item">
              <div>
                <strong>{product.nombre}</strong>
                <div class="item-code">{product.codigo}</div>
              </div>
              <div class="stock-indicator">
                Stock: <strong>{product.stock || 0}</strong>
              </div>
            </div>
          {/each}
        </div>
      </Card>
    {/if}
  </div>
</div>

<style>
  .reportes-page {
    max-width: 1400px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: var(--space-2xl);
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-lg);
    margin-bottom: var(--space-2xl);
  }

  .metric {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .metric-label {
    font-size: var(--text-sm);
    color: var(--fg-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: var(--font-medium);
  }

  .metric-value {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--fg-primary);
  }

  .metric.warning .metric-value {
    color: var(--warning);
  }

  .metric.success .metric-value {
    color: var(--success);
  }

  .reports-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  .section-title {
    margin-bottom: var(--space-lg);
    font-size: var(--text-xl);
  }

  .section-title.alert {
    color: var(--error);
  }

  :global(tr.low-stock) {
    background-color: rgba(239, 68, 68, 0.05) !important;
  }

  .status-badge {
    display: inline-block;
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
  }

  .status-badge.success {
    background-color: rgba(16, 185, 129, 0.15);
    color: var(--success);
  }

  .status-badge.warning {
    background-color: rgba(245, 158, 11, 0.15);
    color: var(--warning);
  }

  .status-badge.danger {
    background-color: rgba(239, 68, 68, 0.15);
    color: var(--error);
  }

  .low-stock-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-md);
  }

  .low-stock-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md);
    background-color: var(--bg-tertiary);
    border-radius: var(--radius-md);
    border-left: 4px solid var(--error);
  }

  .item-code {
    font-size: var(--text-sm);
    color: var(--fg-tertiary);
    font-family: monospace;
    margin-top: var(--space-xs);
  }

  .stock-indicator {
    color: var(--error);
    font-size: var(--text-sm);
  }

  .stock-indicator strong {
    font-size: var(--text-xl);
  }

  .empty-state {
    text-align: center;
    color: var(--fg-tertiary);
    padding: var(--space-2xl) !important;
  }

  @media (max-width: 768px) {
    .metrics-grid {
      grid-template-columns: 1fr;
    }

    .low-stock-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
