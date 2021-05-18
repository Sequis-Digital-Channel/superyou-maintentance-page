<script context="module">
  export async function preload(page, session) {
    const { APP_URL, APP_ENV } = session;
    return {
      APP_URL,
      APP_ENV,
      page
    };
  }
</script>

<script>
  import { onMount } from "svelte";

  import GlobalStyle from "../components/GlobalStyle.svelte";
  import BaseHeader from "../components/BaseHeader.svelte";
  import BaseFooter from "../components/BaseFooter.svelte";
  import CartContainer from "../container/cart/CartContainer.svelte";
  import BaseMobileBottomNav from "../components/BaseMobileBottomNav.svelte";
  import { bodyScroll } from "../stores/bodyscroll";
  import { manageSessionTracker } from "../utils/_su_laravel_session";

  // export let segment;
  export let APP_URL, APP_ENV, page;

  let bodyHTMLElement = false;

  bodyScroll.subscribe((currentVal) => {
    if (currentVal && bodyHTMLElement) {
      document.querySelector("body").classList.remove("no-scroll");
    } else if (!currentVal && bodyHTMLElement) {
      document.querySelector("body").classList.add("no-scroll");
    }
  });

  onMount(() => {
    bodyHTMLElement = true;
    manageSessionTracker();
  });
</script>

<svelte:head>
  {#if APP_ENV !== 'production'}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots" content="index, follow" />
    <meta name="facebook-domain-verification" content="0hscct489d2x698fs8fn62nbs2br5i" />
  {/if}
</svelte:head>

<BaseHeader />
<CartContainer />
<main>
  <GlobalStyle />
  <slot />
</main>
<BaseFooter {APP_URL} />
<BaseMobileBottomNav path={page.path} />
<div id="portal" />
