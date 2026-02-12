<script>
  let { class: className = "", ...restProps } = $props();
</script>

<div class="card-content {className}" {...restProps}>
  {@render children?.()}
</div>
