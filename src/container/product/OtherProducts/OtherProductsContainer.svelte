<script>
  import { onMount } from "svelte";
  import BaseProductCard from "../../../components/BaseProductCard.svelte";

  export let apiProductUrl;
  export let appUrl;

  let isFetched = false;
  let products = [];
  onMount(async () => {
    const res = await fetch(`${apiProductUrl}/products/?product_type=basic&is_show=true&show_partner=false&skip=0&product_exceptions=super-care-protection`);
    products = await res.json();
    isFetched = true;
    // https://staging-product.superyou.co.id/api/v1/products/?product_type=basic&is_show=true&show_partner=false&skip=0&product_exceptions=super-strong-protection

    setTimeout(() => {
      const cells = document.querySelectorAll(".carousel-cell");
      const otherProducts = new Flickity(".other-products__wrapper", {
        cellAlign: "center",
        contain: true,
        wrapAround: true,
        on: {
          ready: function () {
            cells[0].classList.add("item-active");
            cells[1].classList.add("item-active");
            cells[products.length - 1].classList.add("item-active");
          },
          change: function (index) {
            cells.forEach((cell) => {
              cell.classList.remove("item-active");
            });
            if (index === products.length - 1) {
              cells[index].classList.add("item-active");
              cells[index].previousElementSibling.classList.add("item-active");
              cells[0].classList.add("item-active");
            } else if (index === 0) {
              cells[0].classList.add("item-active");
              cells[1].classList.add("item-active");
              cells[products.length - 1].classList.add("item-active");
            } else {
              cells[index].classList.add("item-active");
              cells[index].nextElementSibling.classList.add("item-active");
              cells[index].previousElementSibling.classList.add("item-active");
            }
          },
        },
      });
    }, 500);
  });
</script>

<style lang="postcss">
  .other-products {
    max-width: 1280px;
    margin: 0 auto;
    padding: 38px 0;
    overflow: hidden;
    min-height:639px;max-height:655px; overflow-y:hidden;

    &__wrapper {
      padding-top: 20px;
      white-space: no-wrap;
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
        transition: transform 0.3s, opacity 0.3s ease-in-out;
        transform: scale(0.9);
        opacity: 0.4;
        @media (min-width: 640px) {
          padding: 24px 10px;
        }
        
      }
    }

    :global(.carousel-cell.item-active .card-cell) {
      @media (min-width: 768px) {
        transform: scale(1);
        opacity: 1;
      }
    }
    :global(.carousel-cell.is-selected .card-cell) {
      @media (max-width: 768px) {
        transform: scale(1);
        opacity: 1;
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
  <h2
    class="md:text-xl text-darkblue text-center mx-auto font-bold mb-4 lg:mb-4 lg:max-w-screen-md">
    Tambahkan Manfaat Perlindungan Untukmu dan Keluarga. Mereka yang membeli
    Super Care juga membeli
  </h2>

  <div>
    {#if isFetched}
    <div class="other-products__wrapper">
      {#each products as product, i (product)}
        <div class="carousel-cell">
          <div class={`card-cell card-cell${i}`} data-key={i}>
            <BaseProductCard detail={product} {appUrl} />
          </div>
        </div>
      {/each}
    </div>
    {/if}
  </div>
  

</div>
