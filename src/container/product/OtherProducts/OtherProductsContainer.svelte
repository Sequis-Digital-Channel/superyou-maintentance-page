<script>
  import { onMount } from "svelte";
  import BaseProductCard from "../../../components/BaseProductCard.svelte";

  let products = [1, 2, 3, 4, 5];

  onMount(() => {
    const carouselItems = document.querySelectorAll(".card-cell");

    const otherProducts = new Flickity(".other-products__wrapper", {
      cellAlign: "center",
      contain: true,
      wrapAround: true,
    });

    if ("IntersectionObserver" in window) {
      const cardCellObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting === false) {
              entry.target.classList.add("grayscale");
            } else {
              entry.target.classList.remove("grayscale");
            }
          });
        },
        {
          root: document.querySelector(".other-products__wrapper"),
          threshold: 0.7,
        }
      );

      carouselItems.forEach((item) => cardCellObserver.observe(item));
    }
  });
</script>

<style lang="postcss">
  .other-products {
    max-width: 1280px;
    margin: 0 auto;
    padding: 56px 0;
    overflow: hidden;

    &__wrapper {
      padding-top: 20px;
      /* @media (min-width: 768px) {
        padding-top: 30px;
      } */
    }

    .carousel-cell {
      display: inline-flex;
      white-space: nowrap;
      width: 286px;
      min-height: 480px;

      @media (min-width: 640px) {
        width: 300px;
      }

      @media (min-width: 1280px) {
        width: 320px;
      }

      .card-cell {
        white-space: normal;
        opacity: 1;
        transition: transform 0.2s, opacity 0.2s ease-in-out;
        @media (min-width: 640px) {
          padding: 24px 10px;
        }

        &.grayscale {
          transform: scale(0.9);
          opacity: 0.5;
          padding-left: 0;
          padding-right: 0;

          @media (min-width: 640px) {
            transform: scale(0.8);
          }
          /* transform-origin: left; */
        }
      }
    }

    :global(.flickity-button) {
      display: none;
      background-color: #03a3a6;
      &:focus {
        outline: none;
        box-shadow: none;
      }
      @media (min-width: 640px) {
        display: block;
      }
    }

    :global(.flickity-button-icon) {
      fill: #fff;
    }

    :global(.flickity-page-dots .dot) {
      background: #fff;
      opacity: 1;

      @media (min-width: 640px) {
        display: none;
      }
    }
    :global(.flickity-page-dots .dot.is-selected) {
      background-color: #00aaae;
    }
  }
</style>

<div class="other-products">
  <h2 class="text-xl lg:text-2xl text-center font-bold mb-6 lg:mb-6">
    Lihat Produk Super You Lainnya
  </h2>
  <div>
    <div class="other-products__wrapper">
      {#each products as product, i (product)}
        <div class="carousel-cell">
          <div class={`card-cell card-cell${i}`} data-key={i}>
            <BaseProductCard />
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
