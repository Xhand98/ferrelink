<script>
  export let open = false;
  export let title = '';
  export let size = 'md'; // sm, md, lg
  
  function handleClose() {
    open = false;
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && open) {
      handleClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div class="modal-backdrop" on:click={handleBackdropClick} role="presentation">
    <div class="modal modal-{size}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-header">
        <h3 id="modal-title">{title}</h3>
        <button class="close-btn" on:click={handleClose} aria-label="Close">
          ✕
        </button>
      </div>
      
      <div class="modal-body">
        <slot />
      </div>
      
      {#if $$slots.footer}
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn var(--transition-fast);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal {
    background-color: var(--bg-elevated);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: slideUp var(--transition-base);
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .modal-sm { width: 90%; max-width: 400px; }
  .modal-md { width: 90%; max-width: 600px; }
  .modal-lg { width: 90%; max-width: 900px; }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-lg);
    border-bottom: 1px solid var(--border-primary);
  }

  .modal-header h3 {
    margin: 0;
    font-size: var(--text-xl);
    color: var(--fg-primary);
  }

  .close-btn {
    background: none;
    border: none;
    font-size: var(--text-2xl);
    color: var(--fg-tertiary);
    cursor: pointer;
    padding: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
  }

  .close-btn:hover {
    background-color: var(--bg-tertiary);
    color: var(--fg-primary);
  }

  .modal-body {
    padding: var(--space-lg);
    overflow-y: auto;
    flex: 1;
  }

  .modal-footer {
    padding: var(--space-lg);
    border-top: 1px solid var(--border-primary);
    display: flex;
    gap: var(--space-md);
    justify-content: flex-end;
  }
</style>
