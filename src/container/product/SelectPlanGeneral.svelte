<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { getPlanById } from "../../api/products.service";
  import { getFormEncryption } from "../../api/superyou.service";
  import { formatDobHash } from "../../utils/_date";
  import { getCookie } from "../../utils/_cartcookie";
  import { onlyOneValidationProductList, cartErrorMessages, derivedTotalSumAssured } from "../../stores/cart/store";
  import { fetchProductsCart } from "../../stores/cart/actions";
  import { addToCart } from "../../stores/cart/actions";
  import BaseCircleSocmed from "../../components/BaseCircleSocmed.svelte";
  import BaseInputDate from "../../components/BaseInputDate.svelte";
  import BaseSelectMenu from "../../components/BaseSelectMenu.svelte";
  import BaseInputCheck from "../../components/BaseInputCheck.svelte";
  
  import BaseButton from "../../components/BaseButton.svelte";
  import BgOverlay from "../../components/BgOverlay.svelte";
  import PopUpAddToCart from "../cart/PopUpAddToCart.svelte";
  import { portal } from "../../utils/_portal";

  export let plans;
  export let api_product_url;
  export let api_superyou_url;
  export let app_url;

  let isAddToCartSuccess = false;
  let planSelected = false;
  let basePlanResultData;
  let basePlanResultCard;
  let selectedDob = "";
  let isBtnDisabled = false;

  let addToCartBtn = {
    disabled: false,
    msg: "",
    showing: false,
  }

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
      label: 'Plan',
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
      label: 'Tertanggung',
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
      label: "Jenis Kelamin"
    },
    insured_dob: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
      label: "Tanggal Lahir"
    },
  };
  let selectedRiders = [];

  function handleClickRider({ target }, riderSlug) {
    if (target.checked) {
      selectedRiders = [...selectedRiders, riderSlug]
    } else {
      selectedRiders = selectedRiders.filter((rider_slug) => target.value !== rider_slug);
    }
  }

  async function handleSubmittedForm() {
    if (handleValidationForm()) return;
    const insuredDob = formatDob(calculationData.insured_dob.val);

    if (
        basePlanResultData
        && basePlanResultData.id === calculationData.plan.val.value
        && insuredDob === selectedDob
        && basePlanResultData.validations === null
      ) {
      planSelected = true;
      focusView();
    } else {
      basePlanResultData = await getPlanById(
        api_product_url,
        calculationData.plan.val.value,
        insuredDob
      );

      // check insrured age criteria
      if (basePlanResultData.validations && basePlanResultData.validations.length) {
        let errorMessage = "";
        basePlanResultData.validations.forEach(err => {
          errorMessage += err.msg + " ";
        })
        calculationData.insured_dob.error.status = true;
        calculationData.insured_dob.error.msg = errorMessage;
        return false;
      }
      loadBasePlanResultCard();
      planSelected = true;
      focusView();
      selectedDob = insuredDob;
      if (
          basePlanResultData.validation_type === "sum_assured"
          && basePlanResultData.sum_assured + $derivedTotalSumAssured <= 1500000000
        ) {
        addToCartBtn = {
          disabled: false,
          msg: ""
        }
        cartErrorMessages.update(errors => {
          return errors.filter(error => error.type !== "sum_assured");
        });
      }
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

  function submitPlanToStore() {
    const { 
      id: planId,
      monthly_premium: price,
      riders: plan_riders,
      validation_type,
      product_slug,
      sum_assured
    } = basePlanResultData;

    const sumAssuredAmount = validation_type === "sum_assured" ? sum_assured : 0;

    let riders = {}
    if (plan_riders.length && selectedRiders.length) {
      plan_riders.forEach(rider => {
        if(selectedRiders.includes(rider.product_slug)) {
          riders[rider.id] = {
            id: rider.id,
            price: rider.monthly_premium,
            product_code: rider.product_code
          }
        }
      })
    }
    // store action AddToCart
    addToCart(
      {
        planId,
        quantity: 1,
        price,
        riders,
        validation_type,
        sum_assured: sumAssuredAmount
      },
      calculationData.insured_for.val.value,
      formatDobHash(calculationData.insured_dob.val),
      basePlanResultData,
      product_slug,
      "SAVE_TO_COOKIE"
    );
  }

  function handleClickAddToCart(e) {
    e.preventDefault();
    if (validationPlanNotPassed()) {
      return;
    }
    submitPlanToStore();
    
    // Trigger pop up succes add to cart
    isAddToCartSuccess = true;
    setTimeout(() => {
      isAddToCartSuccess = false;
    }, 600);
  }

  function payNow(e) {
    e.preventDefault();
    if (validationPlanNotPassed()) {
      return;
    }
    submitPlanToStore();
    setTimeout(async () => {
      const encryptedKey = await getFormEncryption(api_superyou_url, getCookie("_cart"));
      window.location.href = `${app_url}/form-data?q=${encryptedKey}`;
    }, 110)
  }

  function validationPlanNotPassed() {
    const {
      validation_type,
      product_slug,
      sum_assured
    } = basePlanResultData;

    switch(validation_type) {
      case "only_one":
        if($onlyOneValidationProductList.includes(product_slug)) {
          addToCartBtn.disabled = true;
          addToCartBtn.msg = `Kamu hanya dapat memiliki 1 Polis ${basePlanResultData.product_name} untuk 1 Tertanggung.`
          cartErrorMessages.update(errors => {
            if(errors.findIndex(err => err.type === product_slug) === -1) {
              return [...errors, {
                "type": product_slug,
                "msg": `Kamu hanya dapat memiliki 1 Polis ${basePlanResultData.product_name} untuk 1 Tertanggung.`
              }]
            }
            return errors;
          });
        }
        return $onlyOneValidationProductList.includes(product_slug);
      case "sum_assured":
        let assuredTotal = $derivedTotalSumAssured + sum_assured;
        if (assuredTotal > 1500000000) {
          addToCartBtn.disabled = true;
          addToCartBtn.msg = `Kamu tidak dapat menambah produk lagi, uang pertanggungan yang didapat sudah mencapai batas limit 1.5 Milyar`;
          cartErrorMessages.update(errors => {
            if(errors.findIndex(err => err.type === product_slug) === -1) {
              return [...errors, {
                "type": 'sum_assured',
                "msg": `Kamu tidak dapat menambah produk lagi, uang pertanggungan yang didapat sudah mencapai batas limit 1.5 Milyar`
              }]
            }
            return errors;
          });
          return true;
        }
        return false;
      default:
        addToCartBtn.disabled = false;
        addToCartBtn.msg = ``;
        return false;
    }
  }

  onlyOneValidationProductList.subscribe(list => {
    // update the state of addToCartBtn
    // when product has been deleted from cart error will be disappear
    if(
        basePlanResultData
        &&
        basePlanResultData.product_slug
        && basePlanResultData.validation_type === "only_one"
      ) {
      if (!list.includes(basePlanResultData.product_slug)) {
        addToCartBtn = {
          disabled: false,
          msg: ""
        }

        cartErrorMessages.update(errors => {
          return errors.filter(error => error.type !== basePlanResultData.product_slug);
        });
      } 
    }
  });

  derivedTotalSumAssured.subscribe(amount => {
    const isErrorSumAssured =  $cartErrorMessages.findIndex(err => err.type === "sum_assured");
    if (
        isErrorSumAssured !== -1
        && basePlanResultData
        && basePlanResultData.validation_type === "sum_assured"
      ) {
      if (basePlanResultData.sum_assured + amount <= 1500000000) {
        addToCartBtn = {
          disabled: false,
          msg: ""
        }
        cartErrorMessages.update(errors => {
          return errors.filter(error => error.type !== "sum_assured");
        });
      }
    }
  })

  $: if (calculationData.insured_dob.error.status) {
    isBtnDisabled = true;
  } else {
    isBtnDisabled = false;
  }

  onMount(() => {
    plans.forEach((plan) => {
      let currentPlan = {
        name: plan.name_text,
        value: plan.id,
      };
      productPlans = [...productPlans, currentPlan];
    });
    fetchProductsCart(api_product_url, true);
  });
</script>

<div class="select-plan-care">
  <div class="wrapper" class:show-result={planSelected}>
    <form
      class="premi-calculation__wrapper"
      style="padding-bottom: 50px;"
      on:submit|preventDefault={handleSubmittedForm}
    >
      <div class="select-plan">
        <BaseSelectMenu
          label="Pilih Plan"
          items={productPlans}
          bind:selectedItem={calculationData.plan.val}
          bind:error={calculationData.plan.error}
        />
      </div>
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
      <BaseInputDate
        label="Tanggal Lahir Tertanggung"
        name="insured_dob"
        minAge={1}
        maxAge={80}
        bind:value={calculationData.insured_dob.val}
        bind:error={calculationData.insured_dob.error}
      />
      <br />
      <BaseSelectMenu
        label="Jenis Kelamin Tertanggung"
        items={gender}
        bind:selectedItem={calculationData.insured_gender.val}
        bind:error={calculationData.insured_gender.error}
      />
      <br />
      {#if plans[0].riders.length}
        <div>
          <p class="text-sm text-bluegray mb-3">Perlindungan Tambahan</p>
          {#each plans[0].riders as rider, i (rider.id) }
            <BaseInputCheck
              id={`select-rider${i}`}
              value={rider.product_slug}
              on:input={(e) => handleClickRider(e, rider.product_slug)}
            >
              <div
                class="rider-label flex items-center pt-1 cursor-pointer">
                <img
                  class="select-none"
                  src={rider.icon_svg}
                  width="50px"
                  height="50px"
                  alt="Pilih Rider"
                />
                <span
                  class="text-darkblue text-sm inline-block ml-2"
                  >{rider.product_name}</span>
              </div>
            </BaseInputCheck>
            
          {/each}
        </div>
      {/if}
      <br />
      <BaseButton
        style="max-width: 330px;font-size:14px;margin:30px auto 20px;"
        disabled={isBtnDisabled}
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
              selected_riders_slug={selectedRiders}
            />
          {/if}

          {#if addToCartBtn.disabled}
            <p class="text-red-600 px-1 my-3 text-sm">
            {addToCartBtn.msg}
            </p>
          {/if}

          <BaseButton
            on:click={(e) => handleClickAddToCart(e)}
            style="max-width: 383px;font-size:14px;margin:30px auto 20px;"
            bgColor={addToCartBtn.disabled ? '#708697' : '#00aaae'}
            disabled={addToCartBtn.disabled}
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
            on:click={(e) => payNow(e)}
            style="max-width: 383px;font-size:14px; color:#0d294a; border: 1px solid #0d294a;margin: 20px auto 30px;"
            bgColor='transparent'
            disabled={addToCartBtn.disabled}
          >
            BAYAR SEKARANG
          </BaseButton>

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

          <div style="max-width: 423px;margin: 50px auto 20px;">
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
                  src="/icons/socialmedia/twitter.svg"
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

{#if isAddToCartSuccess}
  <div use:portal={"#portal"} id="portal">
    <BgOverlay />
    <PopUpAddToCart />
  </div>
{/if}

<!-- <ProductRecommendationContainer /> -->
<style lang="postcss">
  .select-plan-care {
    max-width: 445px;
    margin: 0 auto;
    overflow: hidden;
    
    @media (min-width: 640px) {
      padding-left: 21px;
      padding-right: 21px;
    }

    @media (max-width: 639px) {
      padding-left: 10px;
      padding-right: 10px;
    }


    .wrapper {
      display: flex;
      flex-wrap: nowrap;
      white-space: nowrap;
      transition: transform 0.6s ease 0s;
      & > form,
      & > .plan-result {
        white-space: normal;
        @media (min-width: 640px) {
          flex: 1 0 97%;
        }
    
        @media (max-width: 639px) {
          flex: 1 0 100%;
        }
      }

      .plan-result {
        margin-left: 15px;
        padding: 0 10px;
        @media (max-width: 600px) {
          padding: 0 2px;
        }
        @media (max-width: 600px) {
          padding: 0 0;
        }
      }

      &.show-result {
        transform: translateX(-105%);
      }

      :global(.tooltip-holder.tertanggung) {
        transform: translateX(57%);
        @media (min-width: 640px) {
          transform: translateX(59%);
        }
      }

      :global(.select-plan .select-menu-options) {
        @media (max-width: 640px) {
          font-size: 13px;
        }
      }
    }
  }
</style>
