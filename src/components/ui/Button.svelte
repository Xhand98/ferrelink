<script>
  export let variant = 'primary'; // primary, secondary, success, danger, ghost
  export let size = 'md'; // sm, md, lg
  export let type = 'button';
  export let disabled = false;
  export let fullWidth = false;
</script>

<button
  {type}
  {disabled}
  class="btn btn-{variant} btn-{size}"
  class:full-width={fullWidth}
  on:click
>
  <slot />
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    font-weight: var(--font-medium);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: inherit;
    white-space: nowrap;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Sizes */
  .btn-sm {
    padding: var(--space-xs) var(--space-md);
    font-size: var(--text-sm);
    height: 2rem;
  }

  .btn-md {
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--text-base);
    height: 2.5rem;
  }

  .btn-lg {
    padding: var(--space-md) var(--space-xl);
    font-size: var(--text-lg);
    height: 3rem;
  }

  /* Variants */
  .btn-primary {
    background-color: var(--accent-primary);
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--accent-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-primary:active:not(:disabled) {
    transform: translateY(0);
  }

  .btn-secondary {
    background-color: var(--bg-tertiary);
    color: var(--fg-primary);
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: var(--border-secondary);
    transform: translateY(-1px);
  }

  .btn-success {
    background-color: var(--success);
    color: white;
  }

  .btn-success:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .btn-danger {
    background-color: var(--error);
    color: white;
  }

  .btn-danger:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .btn-ghost {
    background-color: transparent;
    color: var(--fg-secondary);
    border: 1px solid var(--border-primary);
  }

  .btn-ghost:hover:not(:disabled) {
    background-color: var(--bg-secondary);
    border-color: var(--border-secondary);
  }

  .full-width {
    width: 100%;
  }
</style>
