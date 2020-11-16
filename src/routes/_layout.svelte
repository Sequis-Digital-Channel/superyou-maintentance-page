<script>
  import GlobalStyle from "../components/GlobalStyle.svelte";
  import BaseHeader from "../components/BaseHeader.svelte";

  // export let segment;
</script>

<svelte:head>
  <link
    rel="preload"
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'" />
  <noscript>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" />
  </noscript>
</svelte:head>

<BaseHeader />
<main>
  <GlobalStyle />
  <slot />
</main>
