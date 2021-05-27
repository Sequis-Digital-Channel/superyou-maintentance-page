<script context="module">
  import introduceData from "../data/json/home/superyou-introduce.json";
  import stepsToBuy from "../data/json/home/steps-to-buy.json";
  import dataFaqHomePage from "../data/json/home/home-page/faq.json";

  export async function preload(page, session) {
    const { API_PRODUCT_CATALOGUE, APP_URL } = session;

    return {
      api_product_url: API_PRODUCT_CATALOGUE,
      app_url : APP_URL,
    };
  }
</script>

<script>
  import { onMount } from "svelte";

  import AboveTheFold from "../container/home/AboveTheFold.svelte";
  import BoxMobileAccordion from "../container/home/BoxMobileAccordion.svelte";
  import Testimony from "../container/Testimony.svelte";
  import Faq from "../container/Faq.svelte";
  import Leadgen from "../container/Leadgen.svelte";
  import { loadFlickity } from "../utils/_loadflickity";
  import Analytics from "../components/Analytics.svelte";

  export let app_url;
  export let api_product_url;

  let OtherProductsContainer;
  let isFlicktyLoaded = false;
  // let otherproductsOrder = [
  //   'super-life-protection',
  //   'super-strong-protection',
  //   'super-care-protection',
  //   'super-safe-protection',
  //   'super-well-protection',
  //   'my-hospital-protection',
  // ];

  // Temporary list of product
  let otherproductsOrder = [
    'super-safe-protection',
    'super-life-protection',
    'my-hospital-protection',
    'super-well-protection',
    'super-strong-protection',
    'super-care-protection',
  ]

  const logError = (err) => {
    console.error((err && err.stack) || err);
  };

  const loadOtherProductsContainer = (e) => {
      import(
        "../container/product/OtherProducts/OtherProductsContainer.svelte"
      )
        .then((module) => {
          OtherProductsContainer = module.default;
        })
        .catch(logError);
    };

  onMount(() => {
    const images = Array.from(document.querySelectorAll(".lazy-image img"));
    if ("IntersectionObserver" in window) {
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

      const otherProd = document.querySelector(".otherproduct-index");
      const otherProdObserver = new IntersectionObserver((entries) => {
        const el = entries[0];
        if(el.isIntersecting) {
          otherProdObserver.unobserve(otherProd);
          if (!isFlicktyLoaded) {
            loadFlickity();
            isFlicktyLoaded = true;
            loadOtherProductsContainer();
          }
        }
      },
      {rootMargin: "-400px 0px 0px 0px",}
      );
      otherProdObserver.observe(otherProd);

    } else {
      images.forEach((img) => {
        img.src = img.dataset.src;
      });
    }
  })
</script>

  <svelte:head> 
    <title>Super You: Asuransi Online, Terjangkau, Mudah, Cepat, Serba Digital</title>
    <meta name="description" content="Pilih Asuransi Online yang sesuai kebutuhan kamu. Super You by Sequis Online memberikan perlindungan optimal. Klaim mudah. Cek disini!" />
    <meta name="keywords" content="asuransi online, beli asuransi online, daftar asuransi online" />
    
    <meta property="og:title" content="Super You: Asuransi Online, Terjangkau, Mudah, Cepat, Serba Digital" />
    <meta property="og:description" content="Pilih Asuransi Online yang sesuai kebutuhan kamu. Super You by Sequis Online memberikan perlindungan optimal. Klaim mudah. Cek disini!" />
    <meta property="og:image" content="https://superyou.co.id/img/superyou-banner.jpg">
    <meta property="og:url" content={app_url}>
    <meta property="og:type" content="website" />

    <link rel="canonical" href="{app_url}" />
  </svelte:head>

<section id="superyou-home" class="above-the-fold-wrapper">
  <AboveTheFold />
</section>

<section class="superyou-introduce py-10 px-3 xl:px-12">
  <div class="mx-auto max-w-screen-xl">
    <h2 class="text-center text-darkblue font-bold text-2xl lg:text-3xl leading-snug">
      Gaya Baru Kamu dalam Berasuransi Online
    </h2>
    <p class="excerpt text-center text-sm text-bluegray mt-4 mx-auto mb-6">
      Super You by Sequis Online adalah produk asuransi jiwa dan kesehatan online yang berkomitmen dalam memberikan pengalaman terbaik dalam berasuransi digital demi memenuhi semua kebutuhan finansial kamu.
    </p>

    <div class="mx-auto mt-8 md:mt-12 md:max-w-3/4 md:grid lg:max-w-full lg:grid-cols-4 lg:gap-x-4 md:grid-cols-2 md:justify-items-center md:gap-5">
      {#each introduceData.boxes as {icon, title, content}, i (`${i}-${icon}`) }
        <BoxMobileAccordion {icon} {title} {content} />
      {/each}
    </div>

  </div>
</section>

<section class="su_container otherproduct-index" style="background-color:#e7eaef;">
  {#if OtherProductsContainer}
    <svelte:component
      this={OtherProductsContainer}
      apiProductUrl={api_product_url}
      appUrl={app_url}
      productsOrder={otherproductsOrder}
      slugException="sequis-genius-life-care-insurance" />
  {:else}
    <div class="otherproduct_progress" />
  {/if}
</section>

<section class="steps-to-buy py-8 px-3 xl:px-12">
  <div class="mx-auto max-w-screen-xl">
    <h2 class="text-center text-darkblue font-bold text-lg md:text-2xl">4 Langkah Mudah Pembelian <br class="sm:hidden">Asuransi di Super You</h2>

    <p class="text-center text-sm text-bluegray mt-4 mx-auto mb-6">
      Kamu bisa membeli asuransi online Super You dengan mengikuti langkah-langkah berikut:
    </p>

    <div class="stb-wrapper mt-12 md:grid md:grid-cols-4 md:gap-x-12">
      {#each stepsToBuy.data as { icon, title, content }, i (icon)}
        <div class="each-step flex flex-no-wrap md:flex-col mb-2">
          <div class="flex flex-no-wrap flex-none">
            <div class="w-5 h-5 md:w-8 md:h-8 bg-darkblue rounded-full flex justify-center items-center flex-none">
              <span class="text-xxs text-white md:text-base md:font-bold">{i + 1}</span>
            </div>

            <div class="img-wrapper ml-1 md:ml-0 lazy-image flex flex-col items-center md:flex-row md:justify-center">
              <img
                class={`stb-img-${i} md:ml-auto`}
                srcsrc="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                data-src="{icon}"
                alt="Step One"
                width="75px"
                height="75px"
              >
              {#if (i + 1) < stepsToBuy.data.length}
              <span class="text-black mt-2 text-xl font-bold md:hidden">&darr;</span>
              <span class="text-black mt-2 text-3xl hidden md:inline-block font-bold ml-auto">&rarr;</span>
              {/if}
            </div>
          </div>

          <div class="stb-content pl-4 md:pl-0" class:content-last={(i + 1) === stepsToBuy.data.length}>
            <h4 class="text-darkblue font-bold text-base md:text-center md:mt-6">{title}</h4>
            <p class="text-bluegray text-sm md:mt-3 md:text-center">{@html content}</p>
          </div>
        </div>
      {/each}
    </div>

    <a class="get-now relative w-64 block mt-8 mx-auto bg-teal px-4 py-3 rounded-xl text-sm text-white font-bold" rel="external" href="/isi-data">DAPATKAN SEKARANG <span class="arr">&rarr;</span></a>
  </div>
</section>

<Leadgen />
  
<section class="su_container faq">
  <Faq
    appUrl={app_url}
    FAQtitle="Tanya Jawab tentang Super You"
    accordionData={dataFaqHomePage["faq-home"]}
  />
</section>

<div class="su_container testimonies bg-darkblue relative">
  <Testimony/>
</div>

<Analytics
  eventValue="asuransi-online-super-you-murah-mudah-cepat"
  eventGoal="chosing-product"
  pageType="home-page"
  pageTitle="Asuransi Online Super You - Murah, Mudah, Cepat"
/>

<style lang="postcss">
  .superyou-introduce {
    .excerpt {
      @media (max-width: 375px) {
        max-width: 320px;
      }
    }
  }

  .su_container {
    padding-left: 10px;
    padding-right: 10px;
    @media (min-width: 768px) {
      padding-left: 24px;
      padding-right: 24px;
    }

    .otherproduct_progress {
      height: 675px;
      max-width: 1280px;
      margin: 0 auto;
      padding: 38px 0;
      overflow-y: hidden;
    }
  }

  .su_container.faq,
  .su_container.testimonies,
  .su_container.otherproduct-index
  {
    content-visibility: auto;
    contain-intrinsic-size: 700px;
  }

  .steps-to-buy{
    .img-wrapper {
      width: 75px;
      @media (min-width: 768px) {
        width: 100%;
        img {
          width: 80px;
          height: 80px;

          &.stb-img-3 {
            margin-right: auto;
          }
        }
      }
    }
    .content-last {
      @media (min-width: 768px) {
        padding-left: 30px;
      }
    }
    .get-now {
        .arr {
          transition: 0.4s;
          position: absolute;
          right: 16px;
        }

        &:hover {
          .arr {
            right: 12px;
          }
        }
      }
  }  
  
</style>