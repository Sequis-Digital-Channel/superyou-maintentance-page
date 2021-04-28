<script>
  import { onMount } from "svelte";
  import BaseProductCard from "../../../components/BaseProductCard.svelte";

  export let apiProductUrl;
  export let appUrl;
  export let productName = "";
  export let slugException = "";
  export let productsOrder = [];

  let isFetched = false;
  let sortedProducts = []
  onMount(async () => {
    let stringUrl = slugException ? 
      `${apiProductUrl}/products/?product_type=basic&is_show=true&show_partner=false&skip=0&product_exceptions=${slugException}`
      : `${apiProductUrl}/products/?product_type=basic&is_show=true&show_partner=false&skip=0`;
    
    const res = await fetch(stringUrl);
    let products = await res.json();

    if(productsOrder.length) {
      let psrt = [];
      productsOrder.forEach(slug => {
        const idx = products.findIndex(p => p.slug === slug);
        psrt.push(products[idx]);
      });
      sortedProducts = psrt;
    } else {
      sortedProducts = products;
    }
    isFetched = true;

    setTimeout(() => {
      const cells = document.querySelectorAll(".other-products__wrapper .carousel-cell");
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
  
  {#if productName}
  <h2 class="text-base md:text-xl text-darkblue text-center mx-auto font-bold mb-4 lg:mb-0 lg:max-w-screen-md">
    Tambahkan Manfaat Perlindungan Untukmu dan Keluarga.<br class="hidden md:block"/> Mereka yang membeli
    {productName} juga membeli
  </h2>
  {:else}
    <h2 class="text-lg md:text-2xl text-darkblue text-center mx-auto font-bold mb-4 lg:mb-0 lg:max-w-screen-md">Produk Perlindungan Kami</h2>
  {/if}
  

  <div>
    {#if isFetched}
    <div class="other-products__wrapper">
      {#each sortedProducts as product, i (product)}
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
