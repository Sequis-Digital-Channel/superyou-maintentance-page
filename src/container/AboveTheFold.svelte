<script>
  import { onMount } from "svelte";
  import BaseButton from "../components/BaseButton.svelte";

  export let meta = {
    title: "Super Well Protection",
    description: "Asuransi kesehatan untuk 10 penyakit kritis dengan klaim cashless.",
    icon: "/icons/products/well/super-well.svg",
    "btn_color": "#0d294a"
  }

  let outerWidth;
  let offsetTop;
  // let safari = false;
  let loaded = false;

  function focusView() {
    const planContainer = document.querySelector(".premi-calculation");
    if (process.browser) {
      window.scrollTo({
        top: planContainer.offsetTop + offsetTop,
        behavior: "smooth",
      });
    }
  }

  onMount(() => {
    if (process.browser) {
      // Set focus view offset top
      outerWidth = window.outerWidth;
      if (outerWidth <= 640) {
        offsetTop = +140
      } else {
        offsetTop = - 50
      }

      loaded = true;

      // const ua = navigator.userAgent.toLowerCase();
      // if (ua.indexOf('safari') != -1) { 
      //   if (ua.indexOf('chrome') > -1) {
      //     safari = false;

      //     setTimeout(() => {
      //       const hero = document.querySelector(".product_hero picture");
      //       const sources = hero.querySelectorAll('source');
      //       sources.forEach(source => {
      //         const realSrcSet = source.dataset.srcset;
      //         source.setAttribute("srcset", realSrcSet);
      //       })
      //     }, 30);
      //   } else {
      //     safari = true; // Safari
      //     setTimeout(() => {
      //       const hero = document.querySelector(".product_hero picture");
      //       const sources = hero.querySelectorAll('source');
      //       sources.forEach(source => {
      //         const realSrcSet = source.dataset.srcset;
      //         source.setAttribute("srcset", realSrcSet);
      //       })
      //     }, 30);
      //   }
      // }
      
    }
  })
</script>

<style lang="postcss">
  #above-the-fold {
    padding: 68px 10px 0 10px;

    @media (min-width: 768px) {
      padding-left: 24px;
      padding-right: 24px;
    }

    .product {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 1150px;
      margin: 0 auto;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
      }

      @media (min-width: 768px) and (max-width: 800px) {
        max-height: 244px;
        overflow: hidden;
      }

      &_icon {
        display: block;
        height: 74px;
        @media (min-width: 768px) {
          padding-top: 20px;
          height: 100px;
        }
      }

      &_meta {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (min-width: 768px) {
          align-items: flex-start;
          max-width: 360px;
          margin-left: 15px;
          padding-top: 20px;
        }

        @media (min-width: 1024px) {
          max-width: 540px;
        }

        &_name {
          font-size: 24px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          color: #fff;
          font-weight: bold;
          margin-bottom: 10px;

          @media (min-width: 768px) {
            font-size: 26px;
            line-height: 1;
          }
          @media (min-width: 1024px) {
            font-size: 28px;
          }

          @media (min-width: 1280px) {
            font-size: 36px;
          }
        }

        &_description {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          text-align: center;
          margin-bottom: 36px;

          @media (min-width: 768px) {
            text-align: left;
            margin-bottom: 24px;
          }
          @media (min-width: 1024px) {
            text-align: left;
            font-size: 16px;
            margin-bottom: 24px;
          }
          @media (min-width: 1280px) {
            font-size: 20px !important;
            margin-bottom: 36px;
          }
        }
      }
    }
  }

  .product_hero {
    max-height: 322px;
    overflow: hidden;

    @media (min-width: 1024px) {
      width: 468px;
      display: flex;
      justify-content: center;
    }
  }
  :global(.product_hero img) {
    @media (min-width: 1100px) {
      width: 100%;
    }
    @media (min-width: 1200px) {
      /* width: 468px; */
      min-width: 385px;
      max-width: 468px;
      height: 322px;
    }
    @media (max-width: 500px) {
      max-height: 315px;
    }
    @media (max-width: 375px) {
      max-height: 298px;
    }
  }
</style>

<section id="above-the-fold" style="height: auto;">
  <div class="product">
    <img
      src={meta.icon}
      alt="super care icon"
      width="80"
      height="74"
      loading="lazy"
      class="product_icon" />

    <div class="product_meta">
      <h1 class="product_meta_name">{meta.title}</h1>
      <p class="product_meta_description" style="font-weight:600;">
        {@html meta.description}
      </p>

      <BaseButton
        on:click={focusView}
        bgColor={meta.btn_color}
        style="max-width:314px;font-size:14px;font-weight:600;margin-bottom:20px;">
        YUK HITUNG BIAYA PREMI KAMU
      </BaseButton>
    </div>

    <div class="product_hero">
      {#if loaded}
      <slot name="hero-img">
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Superyou Hero">  
      </slot>
      {:else}
      <img
        src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Superyou Hero" width="374"
        height="315">
      {/if}
    </div>
  </div>
</section>
