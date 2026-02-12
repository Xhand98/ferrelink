<script>
  import "./card.css";
  
  let { class: className = "", ...restProps } = $props();
</script>

<div class="card {className}" {...restProps}>
  {@render children?.()}
</div>
