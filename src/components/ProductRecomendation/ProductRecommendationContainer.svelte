<script>
  import { onMount } from "svelte";
  import ProductRecommendationCard from "./ProductRecommendationCard.svelte";
  export let products = [1, 2, 3];

  function scrollXToElement(index) {
    const el = document.querySelector(`div[cell-index='${index}']`);
    el.scrollIntoView();
  }

  onMount(() => {
    const carouselItems = document.querySelectorAll(".carousel-cell");

    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        const indexBullet = entry.target.getAttribute("cell-index");
        const bullet = document.querySelector(`.bullet-${indexBullet}`);
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          bullet.classList.add("active");
        } else {
          entry.target.classList.remove("active");
          bullet.classList.remove("active");
        }
      });
    };

    let observer = new IntersectionObserver(callback, {
      threshold: 0.7,
    });

    carouselItems.forEach((el) => observer.observe(el));
  });
</script>

<style lang="postcss">
  .recommendation-container {
    position: relative;
    overflow: hidden;
    padding-bottom: 20px;

    .recommendation-wrapper {
      padding: 30px 0;
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      position: relative;

      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      .carousel-cell {
        scroll-snap-align: center;
        width: 100%;
        flex: 1 0 100%;
        &:first-child {
          margin-left: 20px;
        }
        &:not(:last-child) {
          margin-right: 50px;
        }
        &:last-child {
          margin-right: 30px;
        }
      }
    }

    .bullet-nav {
      position: absolute;
      z-index: 4;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .bullet {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #eaeef1;
        &.active {
          background-color: #00aaae;
        }
        &:not(:first-child) {
          margin-left: 10px;
        }
      }
    }
  }
</style>

<div class="recommendation-container">
  <div class="recommendation-wrapper">
    {#each products as product, i (i)}
      <div class={`carousel-cell cell-${i}`} cell-index={i}>
        <ProductRecommendationCard />
      </div>
    {/each}
  </div>

  <div class="bullet-nav">
    {#each products as product, i (i)}
      <div class={`bullet bullet-${i}`} on:click={() => scrollXToElement(i)} />
    {/each}
  </div>
</div>
