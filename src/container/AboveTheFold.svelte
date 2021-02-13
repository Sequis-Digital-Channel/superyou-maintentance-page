<script>
  import { onMount } from "svelte";
  import BaseButton from "../components/BaseButton.svelte";

  let outerWidth;
  let offsetTop;
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
      outerWidth = window.outerWidth;
      if (outerWidth <= 640) {
        offsetTop = +140
      } else {
        offsetTop = - 50
      }

      // window.addEventListener('load', (event) => {
        setTimeout(() => {
          const hero = document.querySelector(".product_hero picture");
          const sources = hero.querySelectorAll('source');
          sources.forEach(source => {
            const realSrcSet = source.dataset.srcset;
            source.setAttribute("srcset", realSrcSet);
            console.log("Real Src Set , ", realSrcSet);
          })
          console.log(sources);
        }, 30)
      // });
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
            font-size: 28px;
            line-height: 1;
          }
          @media (min-width: 1024px) {
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
          }
          @media (min-width: 1024px) {
            font-size: 20px !important;
          }
        }
      }

      &_hero {
        @media (min-width: 1100px) {
          & img {
            width: 100%;
          }
        }
        @media (min-width: 1200px) {
          & img {
            width: 468px;
            height: 322px;
          }
        }
        @media (max-width: 376px) {
          & img {
            max-height: 298px;
          }
        }
        @media (max-width: 500px) {
          & img {
            max-height: 315px;
          }
        }
      }
    }
  }
</style>

<section id="above-the-fold" style="height: auto;">
  <div class="product">
    <img
      src="/icons/products/care/super-care.svg"
      alt="super care icon"
      width="80"
      height="74"
      loading="lazy"
      class="product_icon" />

    <div class="product_meta">
      <h1 class="product_meta_name">Super Care Protection</h1>
      <p class="product_meta_description" style="font-size: 14px;font-weight:600;">
        Perlindungan biaya rawat jalan dan rawat inap untuk 30+ penyakit
        menular/infeksi dan kecelakaan. Tersedia pula pilihan sistem klaim
        cashless.
      </p>

      <BaseButton on:click={focusView} style="max-width: 314px;font-size:14px;margin-bottom:20px;">
        YUK HITUNG BIAYA PREMI KAMU
      </BaseButton>
    </div>

    <div class="product_hero">
      <picture>
        <source
          media="(min-width: 801px)"
          srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          data-srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1613213946/superyou/care/ds-care-hero_hziukt.png 1x, https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1613213947/superyou/care/ds-care-hero_3x_zr3vj6.png 2x" />
        <!-- <source
          media="(max-width: 800px)"
          srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto/v1607341464/superyou/care/care_hero_r4qmt0.png" /> -->
          <source
          media="(max-width: 800px) and (min-width: 501px)"
          srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          data-srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1613205629/superyou/care/mb-dsc-00024-5_3x_sugdgq.png"
          />

          <source
          media="(max-width: 500px)"
          srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          data-srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_350/v1613205629/superyou/care/mb-dsc-00024-5_3x_sugdgq.png"
          />
          
        <img
          class="product_hero"
          src="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1613205629/superyou/care/mb-dsc-00024-5_3x_sugdgq.png"
          alt="super care hero"
          width="374"
          height="315"
        />
      </picture>
    </div>
  </div>
</section>
