<script context="module">
    import dataFaqSuperSafe from "../../data/json/products/super-safe/faq.json";
    import tnc from "../../data/json/products/super-safe/tnc.json";
    import notcovered from "../../data/json/products/super-safe/not-covered.json";
    import superSafeProtection from "../../data/json/products/super-safe/api.json";
    import heroMeta from "../../data/json/products/super-safe/abovethefold-meta.json";
    
    export async function preload(page, session) {
      const { API_PRODUCT_CATALOGUE, APP_URL, SUPER_API_URL } = session;
  
      return {
        api_product_url: API_PRODUCT_CATALOGUE,
        app_url : APP_URL,
        api_superyou_url: SUPER_API_URL
      };
    }
  </script>
  
  <script>
    import { onMount } from "svelte";
    import BaseButton from "../../components/BaseButton.svelte";
    import IcPdf from "../../components/svg/IcPdf.svelte";
  
    import AboveTheFold from "../../container/AboveTheFold.svelte";
    import ProductBenefits from "../../container/product/ProductBenefits.svelte";
    import ProductTnc from "../../container/product/ProductTnc.svelte";
    import Faq from "../../container/Faq.svelte";
    import Testimony from "../../container/Testimony.svelte";
    import ProductNotCovered from "../../container/product/ProductNotCovered.svelte";
    import Leadgen from "../../container/Leadgen.svelte";
    import HospitalLocator from "../../container/product/HospitalLocator.svelte";

    import { getProductBySlugNameClient } from "../../api/products.service";
    import Analytics from "../../components/Analytics.svelte";
  
    export let api_product_url;
    export let app_url;
    export let api_superyou_url;
  
    let plans = [];
    let slug = superSafeProtection.slug
    let benefit_groups = superSafeProtection.benefit_groups;
    let rip_link = superSafeProtection.rip_link;
  
    let currentSlideIndex = 0;
    let selectPlanGeneral;
    let OtherProductsContainer;
    let WhatsAppChat;
    let isFlicktyLoaded = false;
    // let otherproductsOrder = [
    //   'super-strong-protection',
    //   'super-care-protection',
    //   'super-well-protection',
    //   'super-life-protection',
    //   'my-hospital-protection',
    // ]

    // Temporary list of product
    let otherproductsOrder = [
      'super-strong-protection',
      'my-hospital-protection',
      'super-life-protection',
    ]
  
    const logError = (err) => {
      console.error((err && err.stack) || err);
    };
  
    const loadSelectPlanGeneral = async () => {
      const product = await getProductBySlugNameClient(
        api_product_url,
        `${slug}/?show_partner=false&is_show=true`);
      plans = product.plans;
      import("../../container/product/SelectPlanGeneral.svelte")
        .then((module) => {
          selectPlanGeneral = module.default;
        })
        .catch(logError);
    };
  
    const loadOtherProductsContainer = (e) => {
      import(
        "../../container/product/OtherProducts/OtherProductsContainer.svelte"
      )
        .then((module) => {
          OtherProductsContainer = module.default;
        })
        .catch(logError);
    };
  
    const loadWhatsAppChat = (e) => {
      import("../../components/WhatsAppChat.svelte")
      .then((module) => {
        WhatsAppChat = module.default
      })
      .catch(logError);
    }

    onMount(() => {
      const slides = new Flickity(".above-the-fold-wrapper", {
        contain: true,
        autoPlay: 5000,
        wrapAround: true,
        on: {
          change: (idx) => {
            currentSlideIndex = idx;
          }
        }
      })

      const images = Array.from(document.querySelectorAll(".lazy-image img"));
      const premiCalcContainer = document.querySelector(".premi-calculation.s-safe");
  
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
  
        // Form observer
        const formObserver = new IntersectionObserver((entries) => {
          const elForm = entries[0];
          if (elForm.isIntersecting) {
            loadSelectPlanGeneral();
            formObserver.unobserve(premiCalcContainer);
          }
        });
        formObserver.observe(premiCalcContainer);

        const otherProd = document.querySelector(".otherproduct-safe");
        const otherProdObserver = new IntersectionObserver((entries) => {
          const el = entries[0];
          if(el.isIntersecting) {
            if (!isFlicktyLoaded) {
              // loadFlickity();
              isFlicktyLoaded = true;
              loadOtherProductsContainer();
            }
            otherProdObserver.unobserve(otherProd);
          }
        }, {rootMargin: "-300px 0px 0px 0px"}
        );
        otherProdObserver.observe(otherProd);
      } else {
        images.forEach((img) => {
          img.src = img.dataset.src;
        });
      }
  
      function initWhatsAppUi () {
        loadWhatsAppChat()
        setTimeout(() => {
          document.removeEventListener("scroll", initWhatsAppUi)
        }, 0)
      }
      document.addEventListener("scroll", initWhatsAppUi);
    });
  </script>
  
  <svelte:head>
    <title>Asuransi Kecelakaan Diri Super Safe Protection dari Super You</title>
    <meta name="description" content="Berbagai pilihan asuransi perlindungan kecelakaan diri dari Super You dengan premi terjangkau. Cari tahu disini." />
    <meta name="keywords" content="asuransi, asuransi digital, asuransi online, super you, super safe, kecelakaan, kecelakaan pribadi, asuransi kecelakaan diri" />
    
    <meta property="og:title" content="Asuransi Kecelakaan Diri Super Safe Protection dari Super You" />
    <meta property="og:description" content="Berbagai pilihan asuransi perlindungan kecelakaan diri dari Super You dengan premi terjangkau. Cari tahu disini." />
    <meta property="og:image" content="https://superyou.co.id/img/superyou-banner.jpg">
    <meta property="og:url" content="{app_url}/produk/super-safe-protection">
    <meta property="og:type" content="website" />

    <link rel="canonical" href="{app_url}/produk/super-safe-protection" />

    <link rel="preconnect" href="https://ik.imagekit.io/" crossorigin>
    <link rel="stylesheet" href="https://ik.imagekit.io/oc2o82pyjsh/superyou/JS/flickity.min_wa7tUONQa.css">
    <script src="https://ik.imagekit.io/oc2o82pyjsh/superyou/JS/flickity.min_xEZhoKMx4.js"></script>
  </svelte:head>
  
  <section
    class="above-the-fold-wrapper whitespace-no-wrap w-full overflow-hidden"
    style={`background: ${heroMeta.metas[currentSlideIndex].bg_color}`}
    >
    <div class="carousel-cell s-safe w-full inline-block whitespace-normal">
      <AboveTheFold meta={heroMeta.metas[0]}>
        <picture class="hero-safe" slot="hero-img">
          <source
            media="(min-width: 801px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/hero-super-safe_-Uh4FemoUId.png?tr=q-50"
          >
          <source
            media="(min-width: 501px) and (max-width: 800px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/hero-super-safe_-Uh4FemoUId.png?tr=q-50"
          >
          <source
            media="(max-width: 500px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/mb-hero-super-safe_fzdgY9sVlP.png?tr=q-45"
          >
          <img
            src="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/hero-super-safe_-Uh4FemoUId.png?tr=q-50"
            alt="Super Safe Hero"
            width="374"
            height="315"
            loading="lazy"
            decoding="async"
          > 
        </picture>
      </AboveTheFold>
    </div>
    <div class="carousel-cell s-motor w-full inline-block whitespace-normal">
      <AboveTheFold meta={heroMeta.metas[1]} withNote={true}>
        <picture class="hero-safe" slot="hero-img">
          <source
            media="(min-width: 801px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/mb-hero-motor_2x__xdoayo75.png?tr=q-70"
          >
          <source
            media="(min-width: 501px) and (max-width: 800px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/mb-hero-motor_2x__xdoayo75.png"
          >
          <source
            media="(max-width: 500px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/mb-hero-motor_2x__xdoayo75.png?tr=q-50,h-379,w-315,fo-top"
          >
          <img
            src="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/mb-hero-motor_2x__xdoayo75.png?tr=h-379,w-315,fo-top"
            alt="Super Motor Hero"
            width="374"
            height="315"
            loading="lazy"
            decoding="async"
          > 
        </picture>
      </AboveTheFold>
    </div>
    <div class="carousel-cell s-holiday w-full inline-block whitespace-normal">
      <AboveTheFold meta={heroMeta.metas[2]} withNote={true}>
        <picture class="hero-holiday" slot="hero-img">
          <source
            media="(min-width: 801px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/hero-holiday_ckM29GL-M.png?tr=q-70"
          >
          <source
            media="(min-width: 501px) and (max-width: 800px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/hero-holiday_ckM29GL-M.png?tr=q-70"
          >
          <source
            media="(max-width: 500px)"
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/hero-holiday_ckM29GL-M.png?tr=q-70"
          >
          <img
            src="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/hero-holiday_ckM29GL-M.png"
            alt="Super Holiday Hero"
            width="374"
            height="315"
            loading="lazy"
            decoding="async"
          > 
        </picture>
      </AboveTheFold>
    </div>
  </section>
  
  <section class="su_container benefits super-safe">
    <ProductBenefits
      benefitGroups={benefit_groups}
      benefitTitle="Manfaat Asuransi Kecelakaan Diri yang Kamu Dapatkan"
      excerpt="Perlindungan atas risiko biaya medis,<br>risiko meninggal dunia, dan risiko Cacat Total & Tetap yang disebabkan kecelakaan."
    />

    <!-- SUPER SAFE RIDERS -->
    {#if 'riders' in superSafeProtection && superSafeProtection.riders.length }
      <h2 class="text-darkblue font-bold text-center text-22px md:text-28px mt-4 mb-8 lg:mb-12">Manfaat Perlindungan Tambahan</h2>
      <div class="benefits-rider md:grid md:gap-x-8 mb-8 lg:mb-12 max-w-screen-xl mx-auto">
        <div class="flex flex-col border border-teal rounded-xl mb-8">
          <div class="flex flex-col items-center py-3">
            <img src="/icons/products/motor/super-motor.svg" alt="Super Motor Icon" width="40px" height="40px">
            <h3 class="text-lg font-bold text-darkblue text-center mt-3">Super Motor Protection</h3>
            <p class="text-darkblue text-sm text-center">Asuransi Kecelakaan Bermotor</p>
          </div>
          <div class="border-t border-teal flex flex-col md:flex-row px-4 pt-4 pb-0 md:pb-4">
            <div class="flex bene-item-rider mb-4 md:mb-0">
              <img class="self-start" src="/icons/bag-rupiah.svg" alt="Rider benefit description" width="48px" height="48px">
              <p class="text-sm text-bluegray flex-1 ml-2">
                Tambahan biaya medis hingga <b>Rp50 Juta</b> untuk operasi gigi, patah tulang, dan koma akibat kecelakaan sepeda motor
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col border border-teal rounded-xl mb-8">
          <div class="flex flex-col items-center py-3">
            <img src="/icons/products/holiday/super-holiday.svg" alt="Super Holiday Icon" width="40px" height="40px" class="transform scale-150">
            <h3 class="text-lg font-bold text-darkblue text-center mt-3">Super Holiday Protection</h3>
            <p class="text-darkblue text-sm text-center">Asuransi Kecelakaan Saat Liburan</p>
          </div>
          <div class="border-t border-teal flex flex-col md:flex-row px-4 pt-4 pb-0 md:pb-4">
            <div class="flex bene-item-rider mb-4 md:mb-0 flex-1">
              <img class="self-start" src="/icons/bag-rupiah.svg" alt="Rider benefit description" width="48px" height="48px">
              <p class="text-sm text-bluegray flex-1 ml-2">
                Tambahan biaya medis akibat<br> kecelakaan pada masa liburan<br> hingga <b>Rp50 Juta</b>.
              </p>
            </div>
            <div class="flex bene-item-rider mb-4 md:mb-0 flex-1 md:pr-3">
              <img class="self-start" src="/icons/cash.svg" alt="Rider benefit description" width="48px" height="48px">
              <p class="text-sm text-bluegray flex-1 ml-2">
                Tambahan Uang Pertanggungan hingga <b>Rp1 Milyar</b> bila Tertanggung meninggal dunia/ Cacat Total & Tetap akibat kecelakaan pada masa liburan.
              </p>
            </div>
          </div>
        </div>
      </div>
    {/if}
    <!-- END SUPER SAFE RIDERS -->
  
    <a
      class="block w-full mx-auto"
      style="max-width: 314px;"
      href={`${app_url}/pdf/benefits-table/tabel-manfaat-super-safe-super-motor-super-holiday-protection.pdf`}
      target="_blank">
      <BaseButton
        style="max-width: 314px;font-size:14px;margin:0 auto 20px;"
        ariaLabel="Lihat manfaat & Detail Plan"
      >CEK MANFAAT & DETAIL PLAN</BaseButton
      >
    </a>
  
  </section>
  
  <section class="su_container tnc super-safe">
    <ProductTnc listTnc={tnc.safe} productName="Super Safe Protection"/>
    <p class="product_tnc__more-info"
      style="text-align:center;color: #0d294a;font-size: 14px;">
      Baca dan download informasi selengkapnya mengenai produk ini di
    </p>
    <div style="margin:20px auto 20px;padding: 0 10px; max-width:420px;">
      <a href={`${app_url}/${rip_link}`} target="_blank">
      <BaseButton
        style="font-size:14px;
        color: #0d294a;
        height:auto;
        border: 1px solid #0d294a;"
        bgColor={"transparent"}
      >
        <p class="pt-2 pb-2 sm:pt-3 sm:pb-3">
          RINGKASAN INFORMASI PRODUK
        </p>
        <span slot="icon">
          <IcPdf />
        </span>
      </BaseButton>
      </a>
    </div>
  </section>
  
  <section class="su_container premi-calculation s-safe">
    <h2 class="text-xl lg:text-2xl text-center font-bold mb-6 lg:mb-10">
      Cari Tahu Biaya Perlindungan Super Kamu
    </h2>
  
    {#if selectPlanGeneral && plans.length}
      <svelte:component
        this={selectPlanGeneral}
        {plans}
        {api_product_url}
        {api_superyou_url}
        {app_url}
      />
    {:else}
      <div
        class="border border-light-gray-300 shadow rounded-md p-4 w-full mx-auto overflow-hidden"
        style="max-width:400px"
      >
        <div class="animate-pulse flex flex-col space-x-4">
          <div class="flex-1 space-y-4 py-1">
            <div class="space-y-2">
              <div class="h-5 bg-gray-300 rounded" />
              <div class="h-4 bg-gray-300 rounded w-5/6" />
              <div
                class="h-4 bg-gray-300 rounded mb-4"
                style="width:340px;margin-bottom: 24px;"
              />
              <div class="h-5 bg-gray-300 rounded" />
              <div class="h-4 bg-gray-300 rounded w-5/6" />
              <div
                class="h-4 bg-gray-300 rounded mb-4"
                style="width:340px;margin-bottom: 24px;"
              />
              <div class="h-5 bg-gray-300 rounded" />
              <div class="h-4 bg-gray-300 rounded w-5/6" />
              <div
                class="h-4 bg-gray-300 rounded mb-4"
                style="width:340px;margin-bottom: 24px;"
              />
              <div class="h-5 bg-gray-300 rounded" />
              <div class="h-4 bg-gray-300 rounded w-5/6" />
              <div
                class="h-4 bg-gray-300 rounded mb-4"
                style="width:340px;margin-bottom: 24px;"
              />
              <div class="h-5 bg-gray-300 rounded" />
              <div class="h-4 bg-gray-300 rounded w-5/6" />
              <div
                class="h-4 bg-gray-300 rounded mb-4"
                style="width:340px;margin-bottom: 24px;"
              />
            </div>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <Leadgen />
  
  <section class="su_container faq">
    <Faq
      appUrl={app_url}
      FAQtitle="Tanya Jawab Super Safe"
      accordionData={dataFaqSuperSafe["faq-safe"]}
    />
  </section>
  
  <div class="su_container testimonies bg-darkblue relative">
    <Testimony/>
  </div>
  
  <section class="su_container notcovered">
    <ProductNotCovered data={notcovered.safe} productTitle="Super Safe"/>
  </section>
  
  <section class="su_container otherproduct-safe" style="background-color:#e7eaef;">
    {#if OtherProductsContainer}
      <svelte:component
        this={OtherProductsContainer}
        apiProductUrl={api_product_url}
        appUrl={app_url}
        productName="Super Safe"
        productsOrder={otherproductsOrder}
        slugException={slug} />
    {:else}
      <div class="otherproduct_progress" />
    {/if}
  </section>

  <HospitalLocator
    appUrl={app_url}
    info="Kunjungi rumah sakit rekanan Super You terdekat untuk mendapatkan manfaat asuransi sesuai yang kamu pilih." />
  
  {#if WhatsAppChat}
    <svelte:component this={WhatsAppChat} />
  {/if}

  <Analytics
    eventValue="asuransi-perlindungan-kecelakaan-pribadi-super-safe-protection"
    eventGoal="chosing-product"
    pageType="produk-page"
    pageTitle="Asuransi Perlindungan Kecelakaan Pribadi | Super Safe Protection"
  />
  
  <style lang="postcss">
    .above-the-fold-wrapper {
      background: linear-gradient(105deg, #e8a456, #ffd7a6 94%);
      transition: background 0.5s ease 0s;
      max-height: 693px;
    }
    .product_hero .hero-safe img {
      @media (min-width: 501px) {
        min-width: initial;
        max-width: 332px;
        height: auto;
      }
      @media (max-width: 500px) {
        max-width: 315px;
        max-height: initial;
      }
    }
    .product_hero .hero-holiday img {
      @media (min-width: 501px) {
        min-width: initial;
        max-width: 270px;
        height: auto;
      }
      @media (max-width: 500px) {
        max-width: 273px;
        max-height: initial;
      }
    }
    .su_container {
      padding-left: 10px;
      padding-right: 10px;
  
      &.premi-calculation {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 36px;
      }
  
      @media (min-width: 768px) {
        padding-left: 24px;
        padding-right: 24px;
      }
    }
  
    .otherproduct_progress {
      height: 675px;
      max-width: 1280px;
      margin: 0 auto;
      padding: 38px 0;
      overflow-y: hidden;
    }
  
    .su_container.faq,
    .su_container.testimonies,
    .su_container.notcovered,
    .su_container.otherproduct-safe 
    {
      content-visibility: auto;
      contain-intrinsic-size: 700px;
    }

    @media (min-width: 1024px) {
      :global(.s-motor .product_icon) {
        margin-right: 16px;
      }
    }

    :global(.s-motor .product_icon) {
      width: 50px;
    }

    :global(.above-the-fold-wrapper .flickity-button) {
      display: none;
    }
    :global(.above-the-fold-wrapper .flickity-page-dots) {
      bottom: 15px !important;
    }
    :global(.above-the-fold-wrapper .flickity-page-dots .dot) {
      margin: 0 3px !important;
      background: #fff !important;
      opacity: 1 !important;
    }
    :global(.above-the-fold-wrapper .flickity-page-dots .dot.is-selected) {
      background: #00aaae !important;
    }
  
    @media (max-width: 639px) {
      :global(.super-safe .benefit_wrapper .benefit_item__right > h4) {
        max-width: 85%;
      }
      :global(.super-safe .product_tnc__wrapper .benefit_item__right) {
        max-width: 81%;
      }
  
      :global(.super-safe .t-wrapper.bene-tooltip-2 .tooltip-holder) {
        right: -110px !important;
      }
  
      :global(.super-safe .t-wrapper.tnc-item-0 .tooltip-holder) {
        right: -106px !important;
      }

      :global(.super-safe .t-wrapper.tnc-item-3 .tooltip-holder) {
        left: -100px !important;
      }

      :global(.super-safe .t-wrapper.tnc-item-4 .tooltip-holder) {
        left: -250px !important;
      }
      :global(.super-safe .t-wrapper.tnc-item-5 .tooltip-holder) {
        left: -240px !important;
      }
    }

    @media (min-width: 400px) and (max-width: 639px) {
      :global(.super-safe .t-wrapper.tnc-item-3 .tooltip-holder) {
        left: -175px !important;
      }
    }
    @media (min-width: 640px) {
      :global(.super-safe .t-wrapper.tnc-item-0 .tooltip-holder) {
        transform: translateX(30%);
      }
    }

    @media (min-width: 768px) {
      .benefits-rider {
        grid-template-columns: minmax(300px, 460px) 1fr;
        .bene-item-rider {
          & > img {
            width: 80px;
            height: 80px;
          }
        }
      }
    }
  </style>
  