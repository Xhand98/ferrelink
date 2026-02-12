<script>
  import "./button.css";

  let {
    class: className = "",
    variant = "default",
    size = "default",
    children,
    ...restProps
  } = $props();

  const sizeClass = size !== "default" ? `btn-${size}` : "";
</script>

<button
  class="btn btn-{variant} {sizeClass} {className}"
  {...restProps}
>
  {@render children?.()}
</button>
