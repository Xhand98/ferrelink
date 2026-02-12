<script>
  let { class: className = "", ...restProps } = $props();
</script>

<h3 class="card-title {className}" {...restProps}>
  {@render children?.()}
</h3>
