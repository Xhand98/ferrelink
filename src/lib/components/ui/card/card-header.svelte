<script>
  let { class: className = "", ...restProps } = $props();
</script>

<div class="card-header {className}" {...restProps}>
  {@render children?.()}
</div>
