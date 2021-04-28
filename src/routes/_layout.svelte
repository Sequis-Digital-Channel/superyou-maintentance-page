<script context="module">
  export async function preload(page, session) {
    const { APP_URL, APP_ENV } = session;
    
    return {
      APP_URL,
      APP_ENV
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

  // export let segment;
  export let APP_URL;
  export let APP_ENV;

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
    const superyou_session = localStorage.getItem("su_s_id");
    if(!superyou_session) {
    fetch("/functions/session.json", {
      credential: 'true'
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      localStorage.setItem('su_s_id', data.session_id);
    })
    .catch(err => {
      console.log(err, 'error');
    })
    }
  });
</script>

<svelte:head>
  {#if APP_ENV !== 'production'}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots" content="index, follow" />
  {/if}
</svelte:head>

<BaseHeader />
<CartContainer />
<main>
  <GlobalStyle />
  <slot />
</main>
<BaseFooter {APP_URL} />
<BaseMobileBottomNav />
<div id="portal" />
