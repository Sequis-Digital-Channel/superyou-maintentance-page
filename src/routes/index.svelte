<script>
  import { onMount } from "svelte";
  import AboveTheFold from "../container/AboveTheFold.svelte";
  import ProductBenefits from "../container/product/ProductBenefits.svelte";
  import ProductTnc from "../container/product/ProductTnc.svelte";
  import BaseButton from "../components/BaseButton.svelte";
  import IcPdf from "../components/svg/IcPdf.svelte";

  import Faq from "../container/Faq.svelte";
  import ProductNotCovered from "../container/product/ProductNotCovered.svelte";
  import { dataFaqSuperCare } from "../data/faq";
  import { tncSuperCare as tnc } from "../data/tnc";
  import { superCareNotCovered } from "../data/productNotCovered";

  import { loadFlickity } from "../utils/_loadflickity";

  let selectPlanCare;
  let OtherProductsContainer;
  const logError = (err) => {
    console.error((err && err.stack) || err);
  };

  const loadSelectPlanCare = (e) => {
    // e.preventDefault();
    import("../container/product/SelectPlanCare.svelte")
      .then((module) => {
        selectPlanCare = module.default;
      })
      .catch(logError);
  };

  const loadOtherProductsContainer = (e) => {
    import("../container/product/OtherProducts/OtherProductsContainer.svelte")
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

      // Form image observer
      const formObserver = new IntersectionObserver((entries, observer) => {
        const elForm = entries[0];
        if (elForm.isIntersecting) {
          loadSelectPlanCare();
          formObserver.unobserve(premiCalcContainer);
          loadFlickity();
          setTimeout(loadOtherProductsContainer, 500);
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
</style>

<svelte:head>
  <title>Sapper project template</title>
  <script src="/js/popper.js" defer>
  </script>
</svelte:head>

<section class="above-the-fold-wrapper">
  <AboveTheFold />
</section>

<section class="su_container benefits">
  <ProductBenefits />

  <BaseButton style="max-width: 314px;font-size:14px;margin:0 auto 20px;">
    CEK MANFAAT & DETAIL PLAN
  </BaseButton>
</section>

<section class="su_container tnc">
  <ProductTnc listTnc={tnc} />
  <p
    class="product_tnc__more-info"
    style="text-align:center;color: #0d294a;font-size: 14px;">
    Baca dan download informasi selengkapnya mengenai produk ini di
  </p>
  <div style="margin:20px auto 20px;padding: 0 10px; max-width:324px;">
    <BaseButton
      style="font-size:14px;
      color: #0d294a;
      border: 1px solid #0d294a;"
      bgColor={'transparent'}>
      RINGKASAN INFORMASI PRODUK
      <span slot="icon">
        <IcPdf />
      </span>
    </BaseButton>
  </div>
</section>

<section class="su_container premi-calculation">
  <h2 class="text-xl lg:text-2xl text-center font-bold mb-6 lg:mb-10">
    Cari Tahu Biaya Perlindungan Super Care Protection
  </h2>

  {#if selectPlanCare}
    <svelte:component this={selectPlanCare} />
  {:else}
    <div
      class="border border-light-gray-300 shadow rounded-md p-4 w-full mx-auto"
      style="max-width:400px">
      <div class="animate-pulse flex flex-col space-x-4">
        <div class="flex-1 space-y-4 py-1">
          <div class="space-y-2">
            <div class="h-5 bg-gray-300 rounded" />
            <div class="h-4 bg-gray-300 rounded w-5/6" />
            <div
              class="h-4 bg-gray-300 rounded mb-4"
              style="width:340px;margin-bottom: 24px;" />
            <div class="h-5 bg-gray-300 rounded" />
            <div class="h-4 bg-gray-300 rounded w-5/6" />
            <div
              class="h-4 bg-gray-300 rounded mb-4"
              style="width:340px;margin-bottom: 24px;" />
            <div class="h-5 bg-gray-300 rounded" />
            <div class="h-4 bg-gray-300 rounded w-5/6" />
            <div
              class="h-4 bg-gray-300 rounded mb-4"
              style="width:340px;margin-bottom: 24px;" />
            <div class="h-5 bg-gray-300 rounded" />
            <div class="h-4 bg-gray-300 rounded w-5/6" />
            <div
              class="h-4 bg-gray-300 rounded mb-4"
              style="width:340px;margin-bottom: 24px;" />
          </div>
        </div>
      </div>
    </div>
  {/if}
</section>

<section class="su_container faq">
  <Faq FAQtitle="Tanya Jawab Super Care" accordionData={dataFaqSuperCare} />
</section>

<section class="su_container notcovered">
  <ProductNotCovered data={superCareNotCovered} />
</section>

<section class="su_container otherproduct" style="background-color: #e7eaef;">
  {#if OtherProductsContainer}
    <svelte:component this={OtherProductsContainer} />
  {/if}
</section>
