<script>
  import GlobalStyle from "../components/GlobalStyle.svelte";
  import BaseHeader from "../components/BaseHeader.svelte";

  // export let segment;
</script>

<svelte:head>
  <!-- connect to domain of font files -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- optionally increase loading priority -->
  <link
    rel="preload"
    as="style"
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" />

  <!-- async CSS -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
    media="print"
    onload="this.onload=null;this.removeAttribute('media');" />

  <!-- no-JS fallback -->
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
