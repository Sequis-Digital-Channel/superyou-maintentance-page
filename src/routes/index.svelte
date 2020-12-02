<script>
  import { onMount } from "svelte";
  import AboveTheFold from "../container/AboveTheFold.svelte";
  import ProductBenefits from "../container/product/ProductBenefits.svelte";
  import ProductTnc from "../container/product/ProductTnc.svelte";
  import BaseButton from "../components/BaseButton.svelte";
  import IcPdf from "../components/svg/IcPdf.svelte";
  import BaseSelectMenu from "../components/BaseSelectMenu.svelte";
  import BaseInputRadio from "../components/BaseInputRadio.svelte";
  import BaseInputDate from "../components/BaseInputDate.svelte";
  import CircleSocmed from "../components/BaseCircleSocmed.svelte";

  import ProductRecommendationContainer from "../container/product/ProductRecomendation/ProductRecommendationContainer.svelte";

  import Faq from "../container/Faq.svelte";
  import ProductNotCovered from "../container/product/ProductNotCovered.svelte";
  import { dataFaqSuperCare } from "../data/faq";
  import { tncSuperCare as tnc } from "../data/tnc";
  import { superCareNotCovered } from "../data/productNotCovered";

  onMount(() => {
    const images = Array.from(document.querySelectorAll(".lazy-image img"));
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(entry.target);
            const image = entry.target;
            image.src = image.dataset.src;
            image.classList.add("lazyloaded");
            imageObserver.unobserve(image);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      console.log("asdasdasasd");
      images.forEach((img) => {
        img.src = img.dataset.src;
      });
    }
  });

  let cmp;
  const setComponent = (module) => {
    cmp = module.default;
  };
  const logError = (err) => {
    console.error((err && err.stack) || err);
  };

  const loadFoo = (e) => {
    e.preventDefault();
    import("../components/BasePlanResultCard.svelte")
      .then(setComponent)
      .catch(logError);
  };

  const backgroudColor = `
  linear-gradient(151deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4) 100%), linear-gradient(143deg, #f7b500 22%, #e8d556 87%), linear-gradient(321deg, #fff546 95%, #e8d556 57%);
  `;

  // FORM FIELD SELECT OPTION ITEMS
  const productPlan = [
    { name: "Bronze Plan", value: "bronze", selected: true },
    { name: "Silver Plan", value: "silver" },
    { name: "Gold Plan", value: "gold" },
  ];
  const insuredFor = [
    {
      name: "Saya Sendiri",
      value: "SELF",
    },
    {
      name: "Suami",
      value: "HUSBAND",
    },
    {
      name: "Istri",
      value: "WIFE",
    },
    {
      name: "Ayah Kandung",
      value: "FATHER",
    },
    {
      name: "Ibu Kandung",
      value: "MOTHER",
    },
    {
      name: "Saudara Laki laki",
      value: "BROTHER",
    },
    {
      name: "Saudara Perempuan",
      value: "SISTER",
    },
    {
      name: "Anak Laki laki",
      value: "SON",
    },
    {
      name: "Anak Perempuan",
      value: "DAUGHTER",
    },
  ];
  const protection = [
    { name: "Ya, dengan santunan tunai rawat inap 1 juta/hari", value: "YES" },
    {
      name: "Tidak, dengan santunan tunai rawat inap 1 juta/hari",
      value: "NO",
    },
  ];
  const gender = [
    { name: "Laki laki", value: "male" },
    { name: "Perempuan", value: "female" },
  ];
  const claim_method = [
    {
      val: "cashless",
      label: "Cashless",
      selected: false,
    },
    {
      val: "reimbursement",
      label: "Reimbursement",
      selected: false,
    },
  ];

  // FORM DATA CONTROLLER
  let calculationData = {
    plan: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
    protection: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
    insured_for: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
    insured_gender: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
    claim_method: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
    insured_dob: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
  };
</script>

<style lang="postcss">
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

    &__wrapper {
      max-width: 400px;
      margin: 0 auto;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<AboveTheFold bgGradient={backgroudColor} />

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

  <form
    class="premi-calculation__wrapper"
    style="padding-bottom: 50px;"
    on:submit|preventDefault={(e) => {
      console.log('FORM SUBMITTED');
      loadFoo(e);
    }}>
    <BaseSelectMenu
      label="Pilih Plan"
      items={productPlan}
      bind:selectedItem={calculationData.plan.val}
      error={calculationData.plan.error} />
    <br />
    <BaseSelectMenu
      label="Perlindungan COVID-19"
      items={protection}
      bind:selectedItem={calculationData.protection.val}
      error={calculationData.protection.error} />
    <br />
    <BaseSelectMenu
      label="Tertanggung"
      withtooltip={true}
      tooltiptext="Orang yang ditanggung di dalam Polis"
      items={insuredFor}
      bind:selectedItem={calculationData.insured_for.val}
      error={calculationData.insured_for.error} />
    <br />
    <BaseSelectMenu
      label="Jenis Kelamin Tertanggung"
      items={gender}
      bind:selectedItem={calculationData.insured_gender.val}
      error={calculationData.insured_gender.error} />
    <br />
    <BaseInputRadio
      name="claim_method"
      items={claim_method}
      bind:selectedItemValue={calculationData.claim_method.val} />
    <br />
    <BaseInputDate name="insured_dob" minAge={1} maxAge={60} />
    <br />
    <BaseButton style="max-width: 330px;font-size:14px;margin:30px auto 20px;">
      HITUNG BIAYA PREMI
    </BaseButton>
  </form>

  {#if cmp}
    <svelte:component this={cmp} />
  {/if}
  <BaseButton style="max-width: 330px;font-size:14px;margin:30px auto 20px;">
    TAMBAH KE KERANJANG
    <img
      src="/icons/basket-white.svg"
      alt="Add to cart"
      slot="icon"
      width="27"
      height="27" />
  </BaseButton>
  <BaseButton
    style="max-width: 330px;font-size:14px; color:#0d294a; border: 1px solid #0d294a;margin: 20px auto 30px;"
    bgColor={'transparent'}>
    BAYAR SEKARANG
  </BaseButton>

  <p
    style="display:flex;align-items:center;text-align:center;justify-content:center;font-weight:bold;color:#0d294a;text-align:center;margin: 20px auto;font-size:14px;cursor:pointer;">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="12"
      height="12"
      viewBox="0 0 12 12">
      <defs>
        <path
          id="xopfgbdqwa"
          d="M7.253.293c.423.39.423 1.024 0 1.414l-3.558 3.29h7.224c.597 0 1.081.448 1.081 1s-.484 1-1.081 1h-7.23l3.564 3.296c.423.39.423 1.024 0 1.414-.422.39-1.107.39-1.53 0l-5.406-5c-.423-.39-.423-1.024 0-1.414l5.407-5c.422-.39 1.107-.39 1.53 0z" />
      </defs>
      <g fill="none" fill-rule="evenodd">
        <g>
          <g transform="translate(-20 -42) translate(20 42)">
            <use
              fill="#0D294A"
              fill-rule="nonzero"
              transform="matrix(1 0 0 -1 0 12)"
              xlink:href="#xopfgbdqwa" />
          </g>
        </g>
      </g>
    </svg>
    <span style="display:inline-block;margin-left: 14px;">LIHAT HARGA PLAN LAIN</span>
  </p>

  <div style="max-width: 400px;margin: 50px auto 20px;">
    <p style="text-align:center;color:#0d294a;font-weight:bold;">SHARE</p>

    <div
      class="socmed"
      style="display:flex;justify-content:space-between;max-width:110px;margin: 14px auto;">
      <CircleSocmed />
      <CircleSocmed>
        <img
          slot="icon"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          data-src="/icons/socialmedia/twitter.svg"
          width="15"
          height="13"
          alt="Superyou Twitter" />
      </CircleSocmed>
    </div>
  </div>

  <ProductRecommendationContainer />
</section>

<section class="su_container faq">
  <Faq FAQtitle="Tanya Jawab Super Care" accordionData={dataFaqSuperCare} />
</section>

<section class="su_container notcovered">
  <ProductNotCovered data={superCareNotCovered} />
</section>

<!-- <section class="su_container otherproduct" style="background-color: #e7eaef;">
  <OtherProductsContainer />
</section> -->
