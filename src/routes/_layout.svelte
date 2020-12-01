<script>
  import { onMount } from "svelte";
  import GlobalStyle from "../components/GlobalStyle.svelte";
  import BaseHeader from "../components/BaseHeader.svelte";

  onMount(() => {
    const images = Array.from(document.querySelectorAll(".lazy-image img"));
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(entry.target);
            const image = entry.target;
            image.src = image.dataset.src;
            image.classList.add("lazyloaded");
            imageObserver.unobserve(image);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      console.log("asdasdasasd");
      images.forEach((img) => {
        img.src = img.dataset.src;
      });
    }
  });
  // export let segment;
</script>

<BaseHeader />
<main>
  <GlobalStyle />
  <slot />
</main>
