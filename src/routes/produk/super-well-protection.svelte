<script context="module">
  import superWellProtection from "../../data/json/products/super-well/api.json";
  import heroMeta from "../../data/json/products/super-well/abovethefold-meta.json";
  import tnc from "../../data/json/products/super-well/tnc.json";
  import notcovered from "../../data/json/products/super-well/not-covered.json";
  import faqData from "../../data/json/products/super-well/faq.json";

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

  import AboveTheFold from "../../container/AboveTheFold.svelte";
  import ProductBenefits from "../../container/product/ProductBenefits.svelte";
  import ProductTnc from "../../container/product/ProductTnc.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import Faq from "../../container/Faq.svelte";
  import Testimony from "../../container/Testimony.svelte";
  import ProductNotCovered from "../../container/product/ProductNotCovered.svelte";
  import Leadgen from "../../container/Leadgen.svelte";

  import { getProductBySlugNameClient } from "../../api/products.service";
  import { loadFlickity } from "../../utils/_loadflickity";
  import IcPdf from "../../components/svg/IcPdf.svelte";
  
  export let api_product_url;
  export let app_url;
  export let api_superyou_url;

  let plans = [];
  let slug = superWellProtection.slug
  let benefit_groups = superWellProtection.benefit_groups;
  let rip_link = superWellProtection.rip_link;

  let selectPlanWell;
  let OtherProductsContainer;
  let isFlicktyLoaded = false;

  const logError = (err) => {
    console.error((err && err.stack) || err);
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

  const loadSelectPlanWell = async () => {
    const product = await getProductBySlugNameClient(
      api_product_url,
      "super-well-protection/?show_partner=false&is_show=true"
    );
    plans = product.plans;
    import("../../container/product/SelectPlanWell.svelte")
      .then((module) => {
        selectPlanWell = module.default;
      })
      .catch(logError);
  };

  onMount(() => {
    if ("IntersectionObserver" in window) {
      const images = Array.from(document.querySelectorAll(".lazy-image img"));
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

      const premiCalcContainer = document.querySelector(".premi-calculation");
      // Form observer
      const formObserver = new IntersectionObserver((entries) => {
        const elForm = entries[0];
        if (elForm.isIntersecting) {
          loadSelectPlanWell();
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
            loadFlickity();
            isFlicktyLoaded = true;
            loadOtherProductsContainer();
          }
        }
      },
      {rootMargin: "-200px 0px 0px 0px",}
      );
      otherProdObserver.observe(otherProd)
    }
  })
  
</script>

<section class="above-the-fold-wrapper">
  <AboveTheFold meta={heroMeta}>
    <picture class="hero-well" slot="hero-img">
      <source
      srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_80,dpr_auto,w_auto/v1614146956/superyou/well/ds_dad-and-daughter_2x.png"
      media="(max-width: 500px)"
      >
      <source
      srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1614146956/superyou/well/ds_dad-and-daughter_2x.png"
      media="(min-width: 501px) and (max-width: 800px)"
      >
      <source
      srcset="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_770/v1614146956/superyou/well/ds_dad-and-daughter_2x.png 1x, https://res.cloudinary.com/supercdnstrg/image/upload/f_auto,q_auto,dpr_auto,w_770/v1614146956/superyou/well/ds_dad-and-daughter_3x.png 2x"
      media="(min-width: 801px)"
      >
      <img
        src="https://res.cloudinary.com/supercdnstrg/image/upload/f_auto/v1614146955/superyou/well/ds_dad-and-daughter.png"
        alt="Super Well Hero"
        width="384"
        height="315"
        loading="lazy"
        decoding="async"
      >
        
    </picture>
  </AboveTheFold>
</section>

<section class="su_container benefits super-well">
  <ProductBenefits benefitGroups={benefit_groups} benefitTitle="Manfaat Asuransi Penyakit Kritis Super Well Protection"/>
  
  <div style="margin:0 auto 20px;max-width: 314px;">
    <a
      href={`${app_url}/pdf/benefits-table/tabel-manfaat-super-well-protection.pdf`}
      target="_blank">
      <BaseButton
        style="font-size:14px;"
        ariaLabel="Lihat manfaat & Detail Plan"
      >CEK MANFAAT & DETAIL PLAN</BaseButton
      >
    </a>
  </div>
</section>

<section class="su_container tnc super-well">
  <ProductTnc listTnc={tnc.well} productName="Super Well Protection" />
  <p
    class="product_tnc__more-info"
    style="text-align:center;color: #0d294a;font-size: 14px;"
  >Baca dan download informasi selengkapnya mengenai produk ini di</p>
  <div style="margin:20px auto 20px;padding: 0 10px; max-width:420px;">
    <a href={`${app_url}/${rip_link}`} target="_blank">
    <BaseButton
      style="font-size:14px;
      color: #0d294a;
      height: auto;
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
    Cari Tahu Biaya Perlindungan Super Well Protection
  </h2>
  {#if selectPlanWell && plans.length}
    <svelte:component
      this={selectPlanWell}
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
    FAQtitle="Tanya Jawab Super Well"
    accordionData={faqData["faq-well"]}
  />
</section>

<div class="su_container testimonies bg-darkblue relative">
  <Testimony/>
</div>

<section class="su_container notcovered">
  <ProductNotCovered data={notcovered.well} productTitle="Super Well" />
</section>

<section class="su_container otherproduct" style="background-color:#e7eaef;">
  {#if OtherProductsContainer}
    <svelte:component
      this={OtherProductsContainer}
      apiProductUrl={api_product_url}
      appUrl={app_url}
      productName="Super Well"
      slugException={slug} />
  {:else}
    <div class="otherproduct_progress" />
  {/if}
</section>


<style lang="postcss">
  .above-the-fold-wrapper {
      background-image: linear-gradient(105deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4)), linear-gradient(to bottom, #45babd, #03a3a6), linear-gradient(273deg, #9bede3 112%, #97ece2 62%, #429f9e -17%);
  }
  .product_hero .hero-well img {
    @media (min-width: 501px) {
      width: 385px;
    }
  }

  .su_container {
    padding-left: 10px;
    padding-right: 10px;

    @media (min-width: 768px) {
      padding-left: 24px;
      padding-right: 24px;
    }

    &.premi-calculation {
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 36px;
    }

    .otherproduct_progress {
      height: 675px;
      max-width: 1280px;
      margin: 0 auto;
      padding: 38px 0;
      overflow-y: hidden;
    }
  }

  @media (max-width: 639px) {
    :global(.super-well .t-wrapper.bene-tooltip-2 .tooltip-holder) {
      left: -80px;
    }
    :global(.super-well .t-wrapper.tnc-item-0 .tooltip-holder) {
      left: -230px;
    }
    :global(.super-well .t-wrapper.tnc-item-6 .tooltip-holder) {
      right: -12px !important;
    }
  }
</style>