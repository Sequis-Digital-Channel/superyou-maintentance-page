<script context="module">
  import { getProductBySlugName } from "../../api/products.services";
  import superCareProtection from "../../data/json/staging-super-care-protection.json";
  export async function preload(page, session) {
    const { API_PRODUCT_CATALOGUE, APP_URL } = session;
    const super_care_data = await getProductBySlugName(
      API_PRODUCT_CATALOGUE,
      "super-care-protection",
      this
    );

    return {
      plans: super_care_data ? super_care_data.plans : superCareProtection.plans,
      slug: super_care_data ? super_care_data.slug : superCareProtection.slug,
      benefit_groups: super_care_data ? super_care_data.benefit_groups : superCareProtection.benefit_groups,
      rip_link: super_care_data ? super_care_data.rip_link : superCareProtection.rip_link,
      api_product_url: API_PRODUCT_CATALOGUE,
      app_url : APP_URL
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import AboveTheFold from "../../container/AboveTheFold.svelte";
  import ProductBenefits from "../../container/product/ProductBenefits.svelte";
  import ProductTnc from "../../container/product/ProductTnc.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import IcPdf from "../../components/svg/IcPdf.svelte";

  import Faq from "../../container/Faq.svelte";
  import Testimony from "../../container/Testimony.svelte";
  import ProductNotCovered from "../../container/product/ProductNotCovered.svelte";

  import dataFaqSuperCare from "../../data/json/faq-super-care.json";
  import tnc from "../../data/json/tnc-super-care.json";
  import notcovered from "../../data/json/not-covered-super-care.json";

  import { loadFlickity } from "../../utils/_loadflickity";

  export let plans;
  export let slug;
  export let benefit_groups;
  export let rip_link;
  export let api_product_url;
  export let app_url;

  let selectPlanCare;
  let OtherProductsContainer;
  let isFlicktyLoaded = false;

  const logError = (err) => {
    console.error((err && err.stack) || err);
  };

  const loadSelectPlanCare = () => {
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
            setTimeout(loadOtherProductsContainer, 500);
          }
        } else if (elForm.boundingClientRect.top < 0 && !isFlicktyLoaded) {
          loadFlickity();
          setTimeout(loadOtherProductsContainer, 500);
          isFlicktyLoaded = true;
        }
      });
      formObserver.observe(premiCalcContainer);
    } else {
      images.forEach((img) => {
        img.src = img.dataset.src;
      });
    }
  });
</script>

<svelte:head>
  <title>Asuransi Kesehatan | Super Care Protection</title>
</svelte:head>

<section class="above-the-fold-wrapper">
  <AboveTheFold />
</section>

<section class="su_container benefits">
  <ProductBenefits benefitGroups={benefit_groups}/>

  <BaseButton
    style="max-width: 314px;font-size:14px;margin:0 auto 20px;"
    ariaLabel="Lihat manfaat & Detail Plan"
  >CEK MANFAAT & DETAIL PLAN</BaseButton
  >
</section>

<section class="su_container tnc">
  <ProductTnc listTnc={tnc.care} />
  <p
    class="product_tnc__more-info"
    style="text-align:center;color: #0d294a;font-size: 14px;"
  >Baca dan download informasi selengkapnya mengenai produk ini di</p>
  <div style="margin:20px auto 20px;padding: 0 10px; max-width:324px;">
    <a href={`${app_url}/${rip_link}`} target="_blank">
    <BaseButton
      style="font-size:14px;
      color: #0d294a;
      border: 1px solid #0d294a;"
      bgColor={"transparent"}
    >
      RINGKASAN INFORMASI PRODUK
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

  {#if selectPlanCare}
    <svelte:component
      this={selectPlanCare}
      {plans}
      {api_product_url}
      productSlug={slug}
    />
  {:else}
    <div
      class="border border-light-gray-300 shadow rounded-md p-4 w-full mx-auto"
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
    FAQtitle="Tanya Jawab Super Care"
    accordionData={dataFaqSuperCare["faq-care"]}
  />
</section>

<div class="su_container testimonies bg-darkblue relative">
  <Testimony />
</div>

<section class="su_container notcovered">
  <ProductNotCovered data={notcovered.care} />
</section>

<section class="su_container otherproduct" style="background-color: #e7eaef;">
  {#if OtherProductsContainer}
    <svelte:component this={OtherProductsContainer} />
  {:else}
    <div class="otherproduct_progress" />
  {/if}
</section>

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

    @media (min-width: 768px) {
      padding-left: 24px;
      padding-right: 24px;
    }
  }

  .premi-calculation {
    padding-top: 36px;
  }

  .otherproduct_progress {
    height: 675px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 38px 0;
  }
</style>
