<script context="module">
  export async function preload(page, session) {
    const { APP_ENV } = session;
    return {
      APP_ENV,
      page
    };
  }
</script>

<script>
  import GlobalStyle from "../components/GlobalStyle.svelte";
  import BaseHeader from "../components/BaseHeader.svelte";
  import { bodyScroll } from "../stores/bodyscroll";

  // export let segment
  export let APP_ENV;

  let bodyHTMLElement = false;

  bodyScroll.subscribe((currentVal) => {
    if (currentVal && bodyHTMLElement) {
      document.querySelector("body").classList.remove("no-scroll");
    } else if (!currentVal && bodyHTMLElement) {
      document.querySelector("body").classList.add("no-scroll");
    }
  });
</script>

<svelte:head>
  {#if APP_ENV !== 'production'}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots"  content="index, follow" />
    <meta name="facebook-domain-verification" content="0hscct489d2x698fs8fn62nbs2br5i" />
  {/if}
</svelte:head>

<BaseHeader />
<main>
  <GlobalStyle />
  <slot />
</main>
<div id="portal" />
