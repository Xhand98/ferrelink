<script>
  export let striped = false;
  export let hoverable = true;
</script>

<div class="table-container">
  <table class:striped class:hoverable>
    {#if $$slots.header}
      <thead>
        <slot name="header" />
      </thead>
    {/if}
    
    <tbody>
      <slot />
    </tbody>
    
    {#if $$slots.footer}
      <tfoot>
        <slot name="footer" />
      </tfoot>
    {/if}
  </table>
</div>

<style>
  .table-container {
    width: 100%;
    overflow-x: auto;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-primary);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--bg-elevated);
  }

  table :global(th),
  table :global(td) {
    padding: var(--space-md);
    text-align: left;
    border-bottom: 1px solid var(--border-primary);
  }

  table :global(th) {
    background-color: var(--bg-tertiary);
    font-weight: var(--font-semibold);
    font-size: var(--text-sm);
    color: var(--fg-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  table :global(td) {
    color: var(--fg-primary);
  }

  table :global(tr:last-child td) {
    border-bottom: none;
  }

  table.striped :global(tbody tr:nth-child(even)) {
    background-color: var(--bg-secondary);
  }

  table.hoverable :global(tbody tr) {
    transition: background-color var(--transition-fast);
  }

  table.hoverable :global(tbody tr:hover) {
    background-color: var(--bg-tertiary);
  }
</style>
