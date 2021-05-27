<script context="module">
    import dataFaqSuperLife from "../../data/json/products/super-life/faq.json";
    import tnc from "../../data/json/products/super-life/tnc.json";
    import notcovered from "../../data/json/products/super-life/not-covered.json";
    import superLifeProtection from "../../data/json/products/super-life/api.json";
    import heroMeta from "../../data/json/products/super-life/abovethefold-meta.json";
    
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
  
    import { loadFlickity } from "../../utils/_loadflickity";
    import { getProductBySlugNameClient } from "../../api/products.service";
    import Analytics from "../../components/Analytics.svelte";
  
    export let api_product_url;
    export let app_url;
    export let api_superyou_url;
  
    let plans = [];
    let slug = superLifeProtection.slug
    let benefit_groups = superLifeProtection.benefit_groups;
    let rip_link = superLifeProtection.rip_link;
  
    let selectPlanGeneral;
    let OtherProductsContainer;
    let WhatsAppChat;
    let isFlicktyLoaded = false;
    // let otherproductsOrder = [
    //   'super-strong-protection',
    //   'super-care-protection',
    //   'my-hospital-protection',
    //   'super-well-protection',
    //   'super-safe-protection',
    // ]
    
    // Temporary list of product
    let otherproductsOrder = [
      'super-safe-protection',
      'super-strong-protection',
      'my-hospital-protection',
      'super-life-protection',
      'super-well-protection'
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
      const images = Array.from(document.querySelectorAll(".lazy-image img"));
      const premiCalcContainer = document.querySelector(".premi-calculation.s-life");
  
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

        const otherProd = document.querySelector(".otherproduct-life");
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
        {rootMargin: "-300px 0px 0px 0px",}
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
    <title>Asuransi Jiwa Online Super Life Protection | Super You</title>
    <meta name="description" content="Dapatkan berbagai pilihan manfaat perlindungan Asuransi Jiwa sesuai kebutuhan kamu disini. Premi terjangkau. Cari tahu disini." />
    <meta name="keywords" content="asuransi jiwa, asuransi, asuransi digital, asuransi online, perlindungan, premi, super you, super life" />
    
    <meta property="og:title" content="Asuransi Jiwa Online Super Life Protection | Super You" />
    <meta property="og:description" content="Dapatkan berbagai pilihan manfaat perlindungan Asuransi Jiwa sesuai kebutuhan kamu disini. Premi terjangkau. Cari tahu disini." />
    <meta property="og:image" content="https://superyou.co.id/img/superyou-banner.jpg">
    <meta property="og:url" content="{app_url}/produk/super-life-protection">
    <meta property="og:type" content="website" />

    <link rel="canonical" href="{app_url}/produk/super-life-protection" />
  </svelte:head>
  
  <section class="above-the-fold-wrapper">
    <AboveTheFold meta={heroMeta}>
      <picture class="hero-life" slot="hero-img">
        <source
          media="(min-width: 801px)"
          srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-life/hero-super-life_DbyEGdnYPAhl.png?tr=q-50"
        >
        <source
          media="(min-width: 501px) and (max-width: 800px)"
          srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-life/hero-super-life_DbyEGdnYPAhl.png?tr=q-50"
        >
        <source
          media="(max-width: 500px)"
          srcset="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-life/hero-super-life_DbyEGdnYPAhl.png?tr=q-20"
        >
        <img
          src="https://ik.imagekit.io/oc2o82pyjsh/superyou/super-life/hero-super-life_DbyEGdnYPAhl.png?tr=q-50"
          alt="Super Life Hero"
          width="374"
          height="315"
          loading="lazy"
          decoding="async"
        > 
      </picture>
    </AboveTheFold>
  </section>
  
  <section class="su_container benefits super-life">
    <ProductBenefits
      benefitGroups={benefit_groups}
      benefitTitle="Manfaat Asuransi Jiwa yang Kamu Dapatkan"
      excerpt="Perlindungan atas risiko meninggal dunia sebab apa pun<br>dan risiko Cacat Total & Tetap."
    />
  
    <a
      class="block w-full mx-auto"
      style="max-width: 314px;"
      href={`${app_url}/pdf/benefits-table/tabel-manfaat-super-life-protection.pdf`}
      target="_blank">
      <BaseButton
        style="max-width: 314px;font-size:14px;margin:0 auto 20px;"
        ariaLabel="Lihat manfaat & Detail Plan"
      >CEK MANFAAT & DETAIL PLAN</BaseButton
      >
    </a>
  </section>
  
  <section class="su_container tnc super-life">
    <ProductTnc listTnc={tnc.life} productName="Super Life Protection"/>
    <p class="product_tnc__more-info"
      style="text-align:center;color: #0d294a;font-size: 14px;">
      Baca dan download informasi selengkapnya mengenai produk ini di
    </p>
    <div style="margin:20px auto 20px;padding: 0 10px; max-width:325px;">
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
  
  <section class="su_container premi-calculation s-life">
    <h2 class="text-xl lg:text-2xl text-center font-bold mt-10" style="margin-top: 41px;">
      Cari Tahu Biaya Perlindungan Super Kamu
    </h2>
    <p class="text-sm text-center text-bluegray mb-6 lg:mb-10 mt-2">Dengan mengetahui usiamu, Super You dapat memberikan harga premi yang sesuai</p>

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
      FAQtitle="Tanya Jawab Super Life"
      accordionData={dataFaqSuperLife["faq-life"]}
    />
  </section>
  
  <div class="su_container testimonies bg-darkblue relative">
    <Testimony/>
  </div>
  
  <section class="su_container notcovered">
    <ProductNotCovered data={notcovered.life} productTitle="Super Life"/>
  </section>
  
  <section class="su_container otherproduct-life" style="background-color:#e7eaef;">
    {#if OtherProductsContainer}
      <svelte:component
        this={OtherProductsContainer}
        apiProductUrl={api_product_url}
        appUrl={app_url}
        productName="Super Life"
        productsOrder={otherproductsOrder}
        slugException={''} />
        <!-- slugException={slug} -->
    {:else}
      <div class="otherproduct_progress" />
    {/if}
  </section>

  <HospitalLocator
    appUrl={app_url}
    info="Daftar rumah sakit rekanan terdekat Super You, memudahkan kamu perawatan dengan kartu kepersertaan asuransi Super You." />
  
  {#if WhatsAppChat}
    <svelte:component this={WhatsAppChat} />
  {/if}

  <Analytics
    eventValue="asuransi-jiwa-super-life-protection"
    eventGoal="chosing-product"
    pageType="produk-page"
    pageTitle="Asuransi Jiwa | Super Life Protection"
  />
  
  <style lang="postcss">
    .above-the-fold-wrapper {
      background:linear-gradient(104deg, #3bc2af 26%, #9ae5da 98%);
    }

    .product_hero .hero-life img {
      @media (min-width: 501px) {
        min-width: initial;
        max-width: 318px;
        height: auto;
      }
      @media (max-width: 500px) {
        max-width: 315px;
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
    .su_container.otherproduct-life
    {
      content-visibility: auto;
      contain-intrinsic-size: 700px;
    }
  
    @media (max-width: 639px) {
      :global(.super-life .t-wrapper.bene-tooltip-0 .tooltip-holder) {
        left: -250px;
      }

      :global(.super-life .t-wrapper.bene-tooltip-1 .tooltip-holder) {
        left: -102px;
      }

      :global(.super-life .product_tnc__wrapper .benefit_item__right) {
        max-width: 75%;
      }
  
      :global(.super-life .t-wrapper.tnc-item-0 .tooltip-holder) {
        right: -150px !important;
      }

      :global(.super-life .t-wrapper.tnc-item-4 .tooltip-holder) {
        left: -83px;
      }

      :global(.super-life .t-wrapper.tnc-item-6 .tooltip-holder) {
        left: -220px;
      }
    }
    @media (min-width: 640px) {
      :global(.super-life .t-wrapper.tnc-item-0 .tooltip-holder) {
        transform: translateX(30%);
      }
    }
    
    
  </style>
  