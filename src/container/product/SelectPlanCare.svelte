<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { getPlanById } from "../../api/products.services";
  import { addToCart } from "../../stores/cart/actions";
  import BaseCircleSocmed from "../../components/BaseCircleSocmed.svelte";
  import BaseInputDate from "../../components/BaseInputDate.svelte";
  import BaseInputRadio from "../../components/BaseInputRadio.svelte";
  import BaseSelectMenu from "../../components/BaseSelectMenu.svelte";
  import ProductRecommendationContainer from "./ProductRecomendation/ProductRecommendationContainer.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import BgOverlay from "../../components/BgOverlay.svelte";
  import PopUpAddToCart from "../cart/PopUpAddToCart.svelte";
  import { portal } from "../../utils/_portal";

  export let plans;
  export let productSlug;
  export let api_product_url;

  let isAddToCartSuccess = false;
  let planSelected = false;
  let basePlanResultData;
  let basePlanResultCard;
  const setComponent = (module) => {
    basePlanResultCard = module.default;
  };
  const logError = (err) => {
    console.error((err && err.stack) || err);
  };

  const loadBasePlanResultCard = () => {
    // e.preventDefault();
    import("../../components/BasePlanResultCard.svelte")
      .then(setComponent)
      .then((component) => console.log(component))
      .catch(logError);
  };
  // FORM FIELD SELECT OPTION ITEMS
  let productPlans = [];

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

  const gender = [
    { name: "Laki laki", value: "male" },
    { name: "Perempuan", value: "female" },
  ];

  const claim_method = [
    {
      val: "cashless",
      label: "Cashless",
      selected: true,
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
      val: {
        name: "",
        value: "",
      },
      error: {
        status: false,
        msg: "",
      },
      label: "Plan",
    },
    insured_for: {
      val: {
        name: "",
        value: "",
      },
      error: {
        status: false,
        msg: "",
      },
      label: "Tertanggung",
    },
    insured_gender: {
      val: {
        name: "",
        value: "",
      },
      error: {
        status: false,
        msg: "",
      },
      label: "Jenis kelamin",
    },
    claim_method: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
      label: "Metode klaim",
    },
    insured_dob: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
      label: "Tanggal lahir tertanggung",
    },
  };

  async function handleSubmittedForm() {
    if (handleValidationForm()) return;
    const selectedPlanData = filterPlanCashlessOrNotByPlanNameSlug();
    const insuredDob = formatDob(calculationData.insured_dob.val);

    if (basePlanResultData && basePlanResultData.id === selectedPlanData.id) {
      planSelected = true;
      focusView();
    } else {
      basePlanResultData = await getPlanById(
        api_product_url,
        selectedPlanData.id,
        insuredDob
      );
      loadBasePlanResultCard();
      planSelected = true;
      focusView();
    }
  }

  function handleValidationForm() {
    const fieldsKey = Object.keys(calculationData);
    let isFormEmpty = false;
    fieldsKey.forEach((field) => {
      if (
        (typeof calculationData[field].val &&
          calculationData[field].val.value === "") ||
        calculationData[field].val === ""
      ) {
        calculationData[
          field
        ].error.msg = `${calculationData[field].label} harus di isi`;
        calculationData[field].error.status = true;

        if (!isFormEmpty) {
          // stop assign if already true;
          isFormEmpty = true;
        }
      }
    });

    return isFormEmpty;
  }

  function formatDob(DDMMYYYY) {
    let dob = DDMMYYYY.split("/");
    // return YYYY-MM-DD
    return `${dob[2]}-${dob[1]}-${dob[0]}`;
  }

  function filterPlanCashlessOrNotByPlanNameSlug() {
    const { name: planNameSlug } = calculationData.plan.val;
    const claimMethod = calculationData.claim_method.val;
    const isCashless = claimMethod === "cashless" ? true : false;
    return plans.filter(
      ({ name_text, is_cashless }) =>
        name_text === planNameSlug && is_cashless === isCashless
    )[0];
  }

  function backToForm() {
    planSelected = false;
    focusView();
  }

  function focusView() {
    const planContainer = document.querySelector(".premi-calculation");
    if (process.browser) {
      window.scrollTo({
        top: planContainer.offsetTop - 50,
        behavior: "smooth",
      });
    }
  }

  function handleClickAddToCart(e) {
    const { id: planId, monthly_premium: price } = basePlanResultData;
    e.preventDefault();
    addToCart(
      {
        planId,
        quantity: 1,
        price,
        riders: {},
      },
      calculationData.insured_for.val.value,
      calculationData.insured_dob.val.value,
      basePlanResultData,
      productSlug,
      "SUBMIT"
    );
    isAddToCartSuccess = true;

    setTimeout(() => {
      isAddToCartSuccess = false;
    }, 600);
  }

  onMount(() => {
    plans.forEach((plan) => {
      if (plan.is_cashless) {
        let currentPlan = {
          name: plan.name_text,
          value: plan.id,
        };
        productPlans = [...productPlans, currentPlan];
      }
    });
  });
</script>

<div class="select-plan-care">
  <div class="wrapper" class:show-result={planSelected}>
    <form
      class="premi-calculation__wrapper"
      style="padding-bottom: 50px;"
      on:submit|preventDefault={handleSubmittedForm}
    >
      <BaseSelectMenu
        label="Pilih Plan"
        items={productPlans}
        bind:selectedItem={calculationData.plan.val}
        bind:error={calculationData.plan.error}
      />
      <br />
      <BaseSelectMenu
        label="Tertanggung"
        withtooltip={true}
        tooltiptext="Orang yang ditanggung di dalam Polis"
        items={insuredFor}
        bind:selectedItem={calculationData.insured_for.val}
        bind:error={calculationData.insured_for.error}
      />
      <br />
      <BaseSelectMenu
        label="Jenis Kelamin Tertanggung"
        items={gender}
        bind:selectedItem={calculationData.insured_gender.val}
        bind:error={calculationData.insured_gender.error}
      />
      <br />
      <BaseInputRadio
        name="claim_method"
        items={claim_method}
        bind:selectedItemValue={calculationData.claim_method.val}
      />
      <br />
      <BaseInputDate
        name="insured_dob"
        minAge={1}
        maxAge={60}
        bind:value={calculationData.insured_dob.val}
        bind:error={calculationData.insured_dob.error}
      />
      <br />
      <BaseButton style="max-width: 330px;font-size:14px;margin:30px auto 20px;"
        >HITUNG BIAYA PREMI</BaseButton
      >
    </form>

    <div class="plan-result">
      {#if planSelected}
        <div in:fly={{ y: 20, duration: 1000 }} out:fade>
          {#if basePlanResultCard && basePlanResultData}
            <svelte:component
              this={basePlanResultCard}
              plan_data={basePlanResultData}
            />
          {/if}
          <BaseButton
            on:click={(e) => handleClickAddToCart(e)}
            style="max-width: 330px;font-size:14px;margin:30px auto 20px;"
          >
            TAMBAH KE KERANJANG
            <img
              src="/icons/basket-white.svg"
              alt="Add to cart"
              slot="icon"
              width="27"
              height="27"
            />
          </BaseButton>

          <BaseButton
            style="max-width: 330px;font-size:14px; color:#0d294a; border: 1px solid #0d294a;margin: 20px auto 30px;"
            bgColor={"transparent"}
          >BAYAR SEKARANG</BaseButton
          >

          <p
            on:click={backToForm}
            style="display:flex;align-items:center;text-align:center;justify-content:center;font-weight:bold;color:#0d294a;text-align:center;margin: 20px auto;font-size:14px;cursor:pointer;"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="12"
              height="12"
              viewBox="0 0 12 12">
              <defs>
                <path
                  id="xopfgbdqwa"
                  d="M7.253.293c.423.39.423 1.024 0 1.414l-3.558 3.29h7.224c.597 0 1.081.448 1.081 1s-.484 1-1.081 1h-7.23l3.564 3.296c.423.39.423 1.024 0 1.414-.422.39-1.107.39-1.53 0l-5.406-5c-.423-.39-.423-1.024 0-1.414l5.407-5c.422-.39 1.107-.39 1.53 0z"
                />
              </defs>
              <g fill="none" fill-rule="evenodd">
                <g>
                  <g transform="translate(-20 -42) translate(20 42)">
                    <use
                      fill="#0D294A"
                      fill-rule="nonzero"
                      transform="matrix(1 0 0 -1 0 12)"
                      xlink:href="#xopfgbdqwa"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <span style="display:inline-block;margin-left: 14px;"
              >LIHAT HARGA PLAN LAIN</span
            >
          </p>

          <div style="max-width: 400px;margin: 50px auto 20px;">
            <p style="text-align:center;color:#0d294a;font-weight:bold;">
              SHARE
            </p>

            <div
              class="socmed"
              style="display:flex;justify-content:space-between;max-width:110px;margin: 14px auto;"
            >
              <BaseCircleSocmed />
              <BaseCircleSocmed>
                <img
                  slot="icon"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  data-src="/icons/socialmedia/twitter.svg"
                  width="15"
                  height="13"
                  alt="Superyou Twitter"
                />
              </BaseCircleSocmed>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<div use:portal={"#portal"}>
  {#if isAddToCartSuccess}
    <BgOverlay />
    <PopUpAddToCart />
  {/if}
</div>

<!-- <ProductRecommendationContainer /> -->
<style lang="postcss">
  .select-plan-care {
    max-width: 400px;
    margin: 0 auto;
    overflow: hidden;

    .wrapper {
      display: flex;
      flex-wrap: nowrap;
      white-space: nowrap;
      transition: transform 0.6s ease 0s;
      & > form,
      & > .plan-result {
        white-space: normal;
        flex: 1 0 100%;
      }

      .plan-result {
        margin-left: 20px;
        padding: 0 10px;
      }

      &.show-result {
        transform: translateX(-105%);
      }
    }
  }
</style>
