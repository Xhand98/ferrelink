<script>
  let { class: className = "", ...restProps } = $props();
</script>

<p class="card-description {className}" {...restProps}>
  {@render children?.()}
</p>
