<script>
  import { onMount } from "svelte";
  import GlobalStyle from "../components/GlobalStyle.svelte";
  import BaseHeader from "../components/BaseHeader.svelte";

  import { bodyScroll } from "../stores/bodyscroll";

  export let segment;
  let bodyElement = false;

  $: if ($bodyScroll && bodyElement) {
    document.querySelector("body").classList.remove("no-scroll");
  } else if (!$bodyScroll && bodyElement) {
    document.querySelector("body").classList.add("no-scroll");
  }
  onMount(() => {
    bodyElement = true;
  });
</script>

<BaseHeader {segment} />
<main>
  <GlobalStyle />
  <slot />
</main>
