<script context="module">
    import dataFaqSuperStrong from "../../data/json/products/super-strong/faq.json";
    import tnc from "../../data/json/products/super-strong/tnc.json";
    import notcovered from "../../data/json/products/super-strong/not-covered.json";
    import superStrongProtection from "../../data/json/products/super-strong/api.json";
    import heroMeta from "../../data/json/products/super-strong/abovethefold-meta.json";
    
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
  
    import { loadFlickity } from "../../utils/_loadflickity";
    import { getProductBySlugNameClient } from "../../api/products.service";
  
    export let api_product_url;
    export let app_url;
    export let api_superyou_url;
  
    let plans = [];
    let slug = superStrongProtection.slug
    let benefit_groups = superStrongProtection.benefit_groups;
    let rip_link = superStrongProtection.rip_link;
  
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
      const images = Array.from(document.querySelectorAll(".lazy-image img"));
      const premiCalcContainer = document.querySelector(".premi-calculation");
  
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
            if (!isFlicktyLoaded) {
              loadFlickity();
              isFlicktyLoaded = true;
              loadOtherProductsContainer()
            }
          } else if (elForm.boundingClientRect.top < 0 && !isFlicktyLoaded) {
            loadFlickity();
            isFlicktyLoaded = true;
            loadOtherProductsContainer();
          }
        });
        formObserver.observe(premiCalcContainer);
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
    <title>Asuransi Kesehatan | Super Strong Protection</title>
    <link rel="preconnect" href="https://unpkg.com" crossorigin>
  </svelte:head>
  
  <section class="above-the-fold-wrapper">
    <AboveTheFold meta={heroMeta}>
      <picture class="hero-strong" slot="hero-img">
        <source
          media="(min-width: 801px)"
          srcset="https://ik.imagekit.io/oc2o82pyjsh/hero-super-strong_Ev6yYC6m4A8.png"
        >
        <source
          media="(max-width: 500px)"
          srcset="https://ik.imagekit.io/oc2o82pyjsh/hero-super-strong_Ev6yYC6m4A8.png?tr=q-75 1x, https://ik.imagekit.io/oc2o82pyjsh/hero-super-strong_Ev6yYC6m4A8.png 2x"
        >
        <img
          src="https://ik.imagekit.io/oc2o82pyjsh/hero-super-strong_Ev6yYC6m4A8.png?tr=q-75"
          alt="Super Strong Hero"
          width="468"
          height="316"
          loading="lazy"
          decoding="async"
        >
          
      </picture>
    </AboveTheFold>
  </section>
  
  <section class="su_container benefits">
    <ProductBenefits benefitGroups={benefit_groups}/>
  
    <a
      href={`${app_url}/pdf/benefits-table/tabel-manfaat-super-strong-protection.pdf`}
      target="_blank">
      <BaseButton
        style="max-width: 314px;font-size:14px;margin:0 auto 20px;"
        ariaLabel="Lihat manfaat & Detail Plan"
      >CEK MANFAAT & DETAIL PLAN</BaseButton
      >
    </a>
  </section>
  
  <section class="su_container tnc">
    <ProductTnc listTnc={tnc.strong} productName="Super Strong Protection"/>
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
  
  <section class="su_container premi-calculation">
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
        productSlug={slug}
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
  
  <section class="su_container faq">
    <Faq
      appUrl={app_url}
      FAQtitle="Tanya Jawab Super Strong"
      accordionData={dataFaqSuperStrong["faq-strong"]}
    />
  </section>
  
  <div class="su_container testimonies bg-darkblue relative">
    <Testimony productName="Super Strong"/>
  </div>
  
  <section class="su_container notcovered">
    <ProductNotCovered data={notcovered.strong} productTitle="Super Strong"/>
  </section>
  
  <section class="su_container otherproduct" style="background-color:#e7eaef;">
    {#if OtherProductsContainer}
      <svelte:component
        this={OtherProductsContainer}
        apiProductUrl={api_product_url}
        appUrl={app_url}
        productName="Super Strong"
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
      background-image: linear-gradient(
          151deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0.4) 100%
        ),
        
        linear-gradient(111deg, #36a1b5, #bbe2e7 77%)
    }
    .product_hero .hero-strong img {
      @media (min-width: 501px) {
        width: 415px;
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
  