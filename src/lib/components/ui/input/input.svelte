<script>
  import "./input.css";

  let {
    class: className = "",
    type = "text",
    ...restProps
  } = $props();
</script>

<input
  {type}
  class="input {className}"
  {...restProps}
/>
