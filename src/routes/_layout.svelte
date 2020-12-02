<script>
  import GlobalStyle from "../components/GlobalStyle.svelte";
  import BaseHeader from "../components/BaseHeader.svelte";

  // export let segment;
</script>

<BaseHeader />
<main>
  <GlobalStyle />
  <slot />
</main>
