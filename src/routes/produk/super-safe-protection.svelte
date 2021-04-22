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

    import { getProductBySlugNameClient } from "../../api/products.service";
  
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

        const otherProd = document.querySelector(".otherproduct");
        const otherProdObserver = new IntersectionObserver((entries) => {
          const el = entries[0];
          if(el.isIntersecting) {
            otherProdObserver.unobserve(otherProd);
            if (!isFlicktyLoaded) {
              // loadFlickity();
              isFlicktyLoaded = true;
              loadOtherProductsContainer();
            }
          }
        },
        {rootMargin: "-600px 0px 0px 0px",}
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
    <title>Asuransi Kesehatan | Super Safe Protection</title>
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
            srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/mb-hero-motor_2x__xdoayo75.png?tr=q-30"
          >
          <img
            src="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-safe/mb-hero-motor_2x__xdoayo75.png"
            alt="Super Motor Hero"
            width="374"
            height="315"
            loading="lazy"
            decoding="async"
          > 
        </picture>
      </AboveTheFold>
    </div>
    <div class="carousel-cell w-full s-holiday inline-block whitespace-normal">
      <AboveTheFold meta={heroMeta.metas[2]}>
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
  
  <section class="su_container benefits">
    <ProductBenefits
      benefitGroups={benefit_groups}
      benefitTitle="Manfaat Asuransi Kecelakaan Diri yang Kamu Dapatkan"
      excerpt="Perlindungan atas risiko biaya medis,<br>risiko meninggal dunia, dan risiko Cacat Total & Tetap yang disebabkan kecelakaan."
    />
  
    <a
      href={`${app_url}/pdf/benefits-table/tabel-manfaat-super-safe-protection.pdf`}
      target="_blank">
      <BaseButton
        style="max-width: 314px;font-size:14px;margin:0 auto 20px;"
        ariaLabel="Lihat manfaat & Detail Plan"
      >CEK MANFAAT & DETAIL PLAN</BaseButton
      >
    </a>
  </section>
  
  <section class="su_container tnc">
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
  
  <section class="su_container otherproduct" style="background-color:#e7eaef;">
    {#if OtherProductsContainer}
      <svelte:component
        this={OtherProductsContainer}
        apiProductUrl={api_product_url}
        appUrl={app_url}
        productName="Super Safe"
        slugException={slug} />
    {:else}
      <div class="otherproduct_progress" />
    {/if}
  </section>
  
  {#if WhatsAppChat}
    <svelte:component this={WhatsAppChat} />
  {/if}
  
  <style lang="postcss">
    .above-the-fold-wrapper {
      background: linear-gradient(105deg, #e8a456, #ffd7a6 94%);
      transition: background 0.5s ease 0s;
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
    .su_container.otherproduct 
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
      :global(.t-wrapper.bene-tooltip-1 .tooltip-holder) {
        right: -140px !important;
      }
  
      :global(.t-wrapper.bene-tooltip-2 .tooltip-holder) {
        right: -85px !important;
      }
  
      :global(.t-wrapper.tnc-item-0 .tooltip-holder) {
        right: -150px !important;
      }
    }
    @media (min-width: 640px) {
      :global(.t-wrapper.tnc-item-0 .tooltip-holder) {
        transform: translateX(30%);
      }
    }
  </style>
  