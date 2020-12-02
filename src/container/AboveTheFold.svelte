<script>
  import BaseButton from "../components/BaseButton.svelte";
  export let height = "auto";
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
        margin-bottom: 10px;
        @media (min-width: 768px) {
          padding-top: 20px;
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
            font-size: 20px;
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
      }
    }
  }
</style>

<section id="above-the-fold" style="height: {height}">
  <div class="product">
    <img
      src="/icons/products/care/care.png"
      alt="super care icon"
      width="40"
      height="60"
      loading="lazy"
      class="product_icon" />

    <div class="product_meta">
      <h1 class="product_meta_name">Super Care Protection</h1>
      <p class="product_meta_description">
        Perlindungan biaya rawat jalan dan rawat inap untuk 30+ penyakit
        menular/infeksi dan kecelakaan. Tersedia pula pilihan sistem klaim
        cashless.
      </p>

      <BaseButton style="max-width: 314px;font-size:14px;margin-bottom:20px;">
        YUK HITUNG BIAYA PREMI KAMU
      </BaseButton>
    </div>

    <div class="product_hero">
      <picture>
        <source
          media="(min-width: 801px)"
          srcset="/icons/products/care/care_hero_desktop.webp" />
        <source
          media="(min-width: 801px)"
          srcset="/icons/products/care/care_hero_desktop.png" />
        <source
          media="(max-width: 800px)"
          srcset="/icons/products/care/care_hero.webp" />
        <source
          media="(max-width: 800px)"
          srcset="/icons/products/care/care_hero.png" />
        <img
          class="product_hero"
          src="/icons/products/care/care_hero.png"
          alt="super care hero"
          width="374"
          height="308"
          loading="lazy" />
      </picture>
    </div>
  </div>
</section>
