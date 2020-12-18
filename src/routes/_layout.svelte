<script>
  import { onMount } from "svelte";
  import GlobalStyle from "../components/GlobalStyle.svelte";
  import BaseHeader from "../components/BaseHeader.svelte";
  import BaseFooter from "../components/BaseFooter.svelte";
  import CartContainer from "../container/cart/CartContainer.svelte";
  import BaseMobileBottomNav from "../components/BaseMobileBottomNav.svelte";

  import { bodyScroll } from "../stores/bodyscroll";

  export let segment;

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
  });
</script>

<BaseHeader {segment} />
<CartContainer />
<main>
  <GlobalStyle />
  <slot />
</main>
<BaseFooter />
<BaseMobileBottomNav />
