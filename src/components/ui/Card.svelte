<script>
  export let padding = 'md'; // sm, md, lg
  export let hover = true;
</script>

<div class="card card-{padding}" class:hover>
  <slot />
</div>

<style>
  .card {
    background-color: var(--bg-elevated);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-base);
  }

  .card-sm {
    padding: var(--space-md);
  }

  .card-md {
    padding: var(--space-lg);
  }

  .card-lg {
    padding: var(--space-xl);
  }

  .card.hover:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--border-secondary);
  }
</style>
