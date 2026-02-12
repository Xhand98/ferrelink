<script>
  import "./label.css";

  let {
    class: className = "",
    for: htmlFor,
    ...restProps
  } = $props();
</script>

<label
  for={htmlFor}
  class="label {className}"
  {...restProps}
>
  {@render children?.()}
</label>
