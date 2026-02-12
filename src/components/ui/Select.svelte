<script>
  export let value = '';
  export let options = [];
  export let placeholder = 'Seleccionar...';
  export let label = '';
  export let error = '';
  export let disabled = false;
  export let id = '';
</script>

<div class="select-wrapper">
  {#if label}
    <label for={id} class="label">{label}</label>
  {/if}
  
  <select
    {id}
    {disabled}
    bind:value
    class:error={error}
    on:change
  >
    <option value="" disabled>{placeholder}</option>
    {#each options as option}
      <option value={option.value}>
        {option.label}
      </option>
    {/each}
  </select>
  
  {#if error}
    <span class="error-message">{error}</span>
  {/if}
</div>

<style>
  .select-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    width: 100%;
  }

  .label {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--fg-secondary);
  }

  select {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    font-size: var(--text-base);
    font-family: inherit;
    color: var(--fg-primary);
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    height: 2.5rem;
    cursor: pointer;
  }

  select:focus {
    outline: none;
    border-color: var(--accent-primary);
    background-color: var(--bg-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  select.error {
    border-color: var(--error);
  }

  .error-message {
    font-size: var(--text-sm);
    color: var(--error);
  }
</style>
