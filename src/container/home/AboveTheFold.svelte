<div id="home_atf" class="flex">
  <div class="mx-auto max-w-screen-xl mt-auto w-full">
    <div class="atf-meta lg:pr-4 xl:pr-6">
      <h1 class="text-white font-bold text-2xl lg:text-3xl xl:text-4xl leading-snug text-center lg:text-right">ASURANSI ONLINE<br>UNTUK PERLINDUNGAN OPTIMAL</h1>
      <p class="text-darkblue text-sm md:text-base xl:text-xl text-center lg:text-right mt-3 mb-4">
        Bebas pilih asuransi sesuai kebutuhan kamu hanya dalam beberapa klik.
      </p>
    </div>
    <div class="atf_wrapper grid">
      <div class="atf_img">
        <picture class="hero-home">
          <source
            media="(min-width: 801px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/homepage/ds-hero-home_bDZYSYZFJW.png?tr=q-70 1x, https://ik.imagekit.io/oc2o82pyjsh/superyou/homepage/ds-hero-home_bDZYSYZFJW.png?tr=q-95 2x"
          >
          <source
            media="(min-width: 501px) and (max-width: 800px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/homepage/ds-hero-home_bDZYSYZFJW.png?tr=q-75"
          >
          <source
            media="(max-width: 500px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/homepage/ds-hero-home_bDZYSYZFJW.png?tr=q-75"
          >
          <img
            src="https://ik.imagekit.io/oc2o82pyjsh/superyou/homepage/ds-hero-home_bDZYSYZFJW.png?tr=q-70"
            alt="Super Life Hero"
            width="622"
            height="507"
            loading="lazy"
            decoding="async"
          > 
        </picture>
      </div>
      <div class="atf_products flex items-center justify-end">
        <div class="w-20 h-12 bg-white rounded-xl shadow-xl"></div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  #home_atf {
    /* min-height: 658px; */
    padding: 74px 20px 0 20px;
    @media (min-width: 1024px) {
      padding: 108px 20px 0 20px;
    }
    background: linear-gradient(116deg, #009496 -33%, rgba(0, 220, 223, 0.5) 64%), linear-gradient(114deg, rgba(255, 255, 255, 0) 37%, rgba(255, 255, 255, 0.69)), linear-gradient(to bottom, #00b7ba, #00b7ba);

    .atf-meta {
      @media (min-width: 1024px) {
        margin-bottom: -104px;
      }
      h1 {
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
    }

    .atf_wrapper {
      justify-content: center;
      @media (min-width: 1024px) {
        justify-content: flex-start;
        grid-template-columns: 45% 1fr;
      }
      .atf_img {
        max-width: 70.3%;
        margin: 0 auto;
        @media (min-width: 1024px) {
          max-width: 622px;
        }
      }

      .atf_products {
        @media (min-width: 1024px) {
          padding-right: 26px;
        }
      }
    }
  }
</style>