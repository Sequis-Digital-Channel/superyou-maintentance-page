<script context="module">
  export async function preload(page, session) {
    const { APP_URL } = session;

    return {
      APP_URL,
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import GlobalStyle from "../components/GlobalStyle.svelte";
  import BaseHeader from "../components/BaseHeader.svelte";
  import BaseFooter from "../components/BaseFooter.svelte";
  // import CartContainer from "../container/cart/CartContainer.svelte";
  import BaseMobileBottomNav from "../components/BaseMobileBottomNav.svelte";

  import { bodyScroll } from "../stores/bodyscroll";

  export let segment;
  export let APP_URL;

  let bodyHTMLElement = false;
  let CartContainer;
  
  const loadCartContainer = async () => {
    import("../container/cart/CartContainer.svelte")
      .then((module) => {
        CartContainer = module.default;
      })
      .catch(error => {
        console.log(error);
      });
  };

  bodyScroll.subscribe((currentVal) => {
    if (currentVal && bodyHTMLElement) {
      document.querySelector("body").classList.remove("no-scroll");
    } else if (!currentVal && bodyHTMLElement) {
      document.querySelector("body").classList.add("no-scroll");
    }
  });

  onMount(() => {
    bodyHTMLElement = true;
    loadCartContainer();
  });
</script>

<BaseHeader {segment} {APP_URL} />
{#if CartContainer }
  <svelte:component
    this={CartContainer}
  />
{/if}
<main>
  <GlobalStyle />
  <slot />
</main>
<BaseFooter {APP_URL} />
<BaseMobileBottomNav />
<div id="portal" />
