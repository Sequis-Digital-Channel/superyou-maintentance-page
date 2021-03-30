<script context="module">
  import dataFaqSuperCare from "../../data/json/products/super-care/faq.json";
  import tnc from "../../data/json/products/super-care/tnc.json";
  import notcovered from "../../data/json/products/super-care/not-covered.json";
  import superCareProtection from "../../data/json/products/super-care/api.json";
  import heroMeta from "../../data/json/products/super-care/abovethefold-meta.json";
  
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

  import { loadFlickity } from "../../utils/_loadflickity";
  import { getProductBySlugNameClient } from "../../api/products.service";

  export let api_product_url;
  export let app_url;
  export let api_superyou_url;

  let plans = [];
  let slug = superCareProtection.slug
  let benefit_groups = superCareProtection.benefit_groups;
  let rip_link = superCareProtection.rip_link;

  let selectPlanCare;
  let OtherProductsContainer;
  let WhatsAppChat;
  let isFlicktyLoaded = false;

  const logError = (err) => {
    console.error((err && err.stack) || err);
  };

  const loadSelectPlanCare = async () => {
    const product = await getProductBySlugNameClient(
      api_product_url,
      "super-care-protection/?show_partner=false&is_show=true"
    );
    plans = product.plans;
    import("../../container/product/SelectPlanCare.svelte")
      .then((module) => {
        selectPlanCare = module.default;
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
          loadSelectPlanCare();
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
  <title>Asuransi Kesehatan | Super Care Protection</title>
  <link rel="preconnect" href="https://unpkg.com" crossorigin>
</svelte:head>

<section class="above-the-fold-wrapper">
  <AboveTheFold meta={heroMeta}>
    <picture slot="hero-img">
      <source
        media="(min-width: 801px)"
        srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1613213947/superyou/care/ds-care-hero_3x_zr3vj6.png 1x, https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1613213947/superyou/care/ds-care-hero_3x_zr3vj6.png 2x"
      >
      <source
        media="(min-width: 501px) and (max-width: 800px)"
        srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1613205629/superyou/care/mb-dsc-00024-5_3x_sugdgq.png"
      >
      <source
        media="(max-width: 500px)"
        srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1613205628/superyou/care/mb-dsc-00024-5_crnlqd.png 1x, https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto/v1613205629/superyou/care/mb-dsc-00024-5_2x_oa7ezs.png 2x"
      >
      <img
        src="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1613205629/superyou/care/mb-dsc-00024-5_3x_sugdgq.png"
        alt="Super Care Hero"
        width="374"
        height="315"
        loading="lazy"
        decoding="async"
      > 
    </picture>
  </AboveTheFold>
</section>

<section class="su_container benefits">
  <ProductBenefits benefitGroups={benefit_groups}/>

  <a
    href={`${app_url}/pdf/benefits-table/tabel-manfaat-super-care-protection.pdf`}
    target="_blank">
    <BaseButton
      style="max-width: 314px;font-size:14px;margin:0 auto 20px;"
      ariaLabel="Lihat manfaat & Detail Plan"
    >CEK MANFAAT & DETAIL PLAN</BaseButton
    >
  </a>
</section>

<section class="su_container tnc">
  <ProductTnc listTnc={tnc.care} productName="Super Care Protection"/>
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
        RINGKASAN INFORMASI PRODUK & LAYANAN
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
    Cari Tahu Biaya Perlindungan Super Care Protection
  </h2>

  {#if selectPlanCare && plans.length}
    <svelte:component
      this={selectPlanCare}
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

<Leadgen />

<section class="su_container faq">
  <Faq
    appUrl={app_url}
    FAQtitle="Tanya Jawab Super Care"
    accordionData={dataFaqSuperCare["faq-care"]}
  />
</section>

<div class="su_container testimonies bg-darkblue relative">
  <Testimony/>
</div>

<section class="su_container notcovered">
  <ProductNotCovered data={notcovered.care} />
</section>

<section class="su_container otherproduct" style="background-color:#e7eaef;">
  {#if OtherProductsContainer}
    <svelte:component
      this={OtherProductsContainer}
      apiProductUrl={api_product_url}
      appUrl={app_url}
      productName="Super Care"
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
      linear-gradient(143deg, #f7b500 22%, #e8d556 87%),
      linear-gradient(321deg, #fff546 95%, #e8d556 57%);
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

  .su_container.tnc,
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
