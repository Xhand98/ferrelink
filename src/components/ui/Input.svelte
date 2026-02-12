<script>
  export let type = 'text';
  export let value = '';
  export let placeholder = '';
  export let label = '';
  export let error = '';
  export let disabled = false;
  export let required = false;
  export let id = '';
</script>

<div class="input-wrapper">
  {#if label}
    <label for={id} class="label">
      {label}
      {#if required}<span class="required">*</span>{/if}
    </label>
  {/if}
  
  <input
    {id}
    {type}
    {placeholder}
    {disabled}
    {required}
    bind:value
    class:error={error}
    on:input
    on:change
    on:blur
    on:focus
  />
  
  {#if error}
    <span class="error-message">{error}</span>
  {/if}
</div>

<style>
  .input-wrapper {
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

  .required {
    color: var(--error);
  }

  input {
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
  }

  input:focus {
    outline: none;
    border-color: var(--accent-primary);
    background-color: var(--bg-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  input.error {
    border-color: var(--error);
  }

  input.error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .error-message {
    font-size: var(--text-sm);
    color: var(--error);
  }

  input::placeholder {
    color: var(--fg-muted);
  }
</style>
