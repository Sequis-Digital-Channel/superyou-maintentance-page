<script>
  import { onMount } from "svelte";

  import AboveTheFold from "../../container/AboveTheFold.svelte";
  import heroMeta from "../../data/json/products/super-well/abovethefold-meta.json";

  onMount(() => {

    if ("IntersectionObserver" in window) {
      const images = Array.from(document.querySelectorAll(".lazy-image img"));
      // lazyload image observer
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            image.classList.add("lazyloaded");
            imageObserver.unobserve(image);
          }
        });
      });
      images.forEach((img) => imageObserver.observe(img));
    }
  })
  
</script>


<section class="above-the-fold-wrapper">
  <AboveTheFold meta={heroMeta}>
    <picture class="hero-well" slot="hero-img">
      <source
      srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_770/v1614146956/superyou/well/ds_dad-and-daughter_2x.png 1x, https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_770/v1614146956/superyou/well/ds_dad-and-daughter_3x.png 2x"
      media="(min-width: 801px)"
      >
      <source
      srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1614146956/superyou/well/ds_dad-and-daughter_2x.png"
      media="(min-width: 501px) and (max-width: 800px)"
      >
      <source
      srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto/v1614146955/superyou/well/ds_dad-and-daughter.png, https://res.cloudinary.com/supercdnstrg/image/upload/v1614146955/superyou/well/ds_dad-and-daughter.png 2x"
      media="(max-width: 500px)"
      >

      <!-- https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1614146956/superyou/well/ds_dad-and-daughter_2x.png 2x" -->
      <img
        src="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto/v1614146955/superyou/well/ds_dad-and-daughter.png"
        alt="Super Well Hero"
        width="384"
        height="315"
      >
        
    </picture>
  </AboveTheFold>
</section>


<style lang="postcss">
  .above-the-fold-wrapper {
      background-image: linear-gradient(105deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4)), linear-gradient(to bottom, #45babd, #03a3a6), linear-gradient(273deg, #9bede3 112%, #97ece2 62%, #429f9e -17%);
  }
  .product_hero .hero-well img {
    @media (min-width: 501px) {
      width: 385px;
    }
  }
</style>