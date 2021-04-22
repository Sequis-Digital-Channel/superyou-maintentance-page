<script>
  import { onMount } from "svelte";
  import BgOverlay from "../../components/BgOverlay.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import { bodyScroll } from "../../stores/bodyscroll";
  import {
    cartStore,
    cartShow,
    paymentTermYearly,
    derivedTotalQuantity,
    sumAssuredTotal,
    derivedTotalPricePerPlan,
  } from "../../stores/cart/store";
  import {
    addToCart,
    calculateSumAssuredTotal,
  } from "../../stores/cart/actions";
  import { getCookie } from "../../utils/_cartcookie";
  import CartItems from "./CartItems.svelte";
  import BaseSwitch from "../../components/BaseSwitch.svelte";
  import { moneyFormat } from "../../utils/_moneyandtobillion";
  import { stores } from "@sapper/app";

  let superApiUrl;
  let appUrl;

  const { session } = stores();
  session.subscribe((value) => {
    superApiUrl = value.SUPER_API_URL;
    appUrl = value.APP_URL;
  });

  let isDOMloaded = false;
  let isNextStepToBuyValid;
  const handleCartToggleShow = () => {
    cartShow.update((cartShow) => !cartShow);
  };
  const handleCartClose = () => {
    cartShow.update(() => false);
  };

  async function handleSubmitCart(e) {
    e.preventDefault();
    const cartData = getCookie("_cart");
    if (cartData) {
      let parsedCart = JSON.parse(cartData);
      const response = await fetch(`${superApiUrl}/api/v1/crypting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST",
          "Access-Control-Allow-Headers":
            "Content-type,Accept,X-Access-Token,X-Key",
        },
        body: JSON.stringify({ data: parsedCart }),
      });
      const encrypted = await response.json();
      setTimeout(() => {
        window.location.href = `${appUrl}/form-data?q=${encrypted}`;
      }, 50)
    }
  }

  $: if ($cartShow) {
    bodyScroll.update(() => false);
  } else {
    bodyScroll.update(() => true);
  }

  $: if ($sumAssuredTotal > 1500000000) {
    isNextStepToBuyValid = true;
  }

  let grandTotal = 0;
  $: if ($derivedTotalPricePerPlan) {
    grandTotal = $derivedTotalPricePerPlan.reduce(
      (acc, plan) => acc + plan.totalPricePerPlan,
      0
    );
  }

  onMount(() => {
    if (process.browser) {
      let cartCookie = getCookie("_cart");

      if (cartCookie) {
        cartCookie = JSON.parse(cartCookie);
        cartCookie.products.forEach((product) => {
          const { planId, qty, price, chosenRider, sumAssured, product_slug, validationType: validation_type } = product;
          let selectedRiders = {};
          let riders = {};
          chosenRider.forEach((riderId) => {
            riders[riderId] = {
              id: "",
              price: 0,
            };
          });

          addToCart(
            {
              planId,
              quantity: qty,
              price,
              riders,
              validation_type
            },
            product.insuredFor,
            cartCookie.dobString,
            null,
            product_slug
          );
        });
      }

      setTimeout(() => {
        isDOMloaded = true;
      }, 500);
    }
  });
</script>

{#if isDOMloaded}
  {#if $cartShow}
    <BgOverlay on:click={handleCartToggleShow} />
  {/if}

  <div id="cart" class:show={$cartShow}>
    {#if Object.keys($cartStore.products).length}
      <div class="cart-bg h-full relative overflow-y-auto">
        <div class="px-3 md:px-4">
          <div class="cart-header w-full py-4 relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center"
              on:click={handleCartClose}
            >
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style="display: block; fill: none; height: 16px; width: 16px; stroke: #fff; stroke-width: 4; overflow: visible;"
                ><g fill="none">
                  <path
                    d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"
                  />
                </g>
              </svg>
            </div>
            <span class="block text-white text-center font-semibold"
              >Keranjang</span
            >
          </div>

          <div class="cart-body mt-2">
            <span class="block text-white font-bold"> Informasi Produk </span>
            <hr class="my-3" />
            <CartItems />
          </div>
        </div>
        <div
          class="payment-term pb-32 md:pb-16 my-4 px-3 md:px-4 flex justify-between items-center"
        >
          <p class="text-white text-sm">Bayar tahunan agar lebih hemat</p>
          <div>
            <BaseSwitch bind:checked={$paymentTermYearly} />
          </div>
        </div>
        <div
          class="cart-bottom fixed h-16 bg-darkblue px-3 py-2 md:px-4 inset-x-0 flex justify-between items-center"
        >
          <div class="flex flex-col">
            <span class="text-white text-xxs"
              >Total Pembayaran /
              {$paymentTermYearly ? "Tahunan" : "Bulanan"}</span
            >
            <p class="text-lg text-white font-bold">
              {moneyFormat(grandTotal)}
            </p>
          </div>
          <button
            id="next-step-buy"
            class="bg-teal rounded-lg py-2 px-4 font-bold text-white text-sm flex justify-between items-center"
            style="width:9rem;"
            aria-label="buy action"
            disabled={isNextStepToBuyValid}
            on:click={(e) => {
              handleSubmitCart(e);
            }}>
            LANJUT BELI
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              ><defs>
                <path
                  id="a"
                  d="M3.69 6.997l3.563 3.296a.948.948 0 0 1 0 1.414c-.422.39-1.107.39-1.53 0l-5.406-5a.948.948 0 0 1 0-1.414l5.407-5a1.145 1.145 0 0 1 1.53 0 .948.948 0 0 1 0 1.414l-3.559 3.29h7.224c.597 0 1.081.448 1.081 1s-.484 1-1.081 1h-7.23z"
                />
              </defs>
              <use
                fill="#fff"
                fill-rule="nonzero"
                transform="rotate(-180 6 6)"
                xlink:href="#a"
              /></svg
            >
          </button>
        </div>
      </div>
    {:else}
      <div class="bg-white h-full relative">
        <div
          class="cart-empty flex flex-col items-center justify-center h-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="294" height="270" viewBox="0 0 294 270">
            <defs>
                <path id="l4lwenxj9a" d="M0 0.23L293.873 0.23 293.873 261.423 0 261.423z"/>
                <path id="4vaxdlsd2c" d="M0 0L42.913 0 42.913 48.399 0 48.399z"/>
            </defs>
            <g fill="none" fill-rule="evenodd">
                <g opacity=".673" transform="translate(0 -.95) translate(0 1)">
                    <mask id="3ys9e9teqb" fill="#fff">
                        <use xlink:href="#l4lwenxj9a"/>
                    </mask>
                    <path fill="#F9F9F9" d="M.29 155.366C5.793 67.042 12.702 40.48 41.775 30.762c29.073-9.718 99.745-55.702 155.2-11.979 55.457 43.724 115.298 82.94 91.552 152.753-23.747 69.813-27.635 93.102-89.593 89.538-61.958-3.563-93.552 2.243-123.147-4.079-6.224-1.33-81.003-13.305-75.499-101.63z" mask="url(#3ys9e9teqb)"/>
                </g>
                <path fill="#EAEEF1" d="M70.376 229.281c-1.343.501-2.562 1.117-2.506 2.17.12 2.238 6.966 3.012 9.766 3.324 4.96.552 9.944.668 14.937.948 18.138 1.017 36.305 1.71 54.472 2.119 9.328.21 18.657.344 27.982.41 8.191.057 17.296.668 25.11-.825 4.69-.896 9.204-2.056 13.615-3.318 3.652-1.045 8.375-1.998 10.592-4.112 3.886-3.707-9.238-4.923-12.84-5.472-14.169-2.155-28.83-2.963-43.292-3.714-14.715-.765-29.489-1.126-44.183-.774-18.421.442-38.2 3.226-53.441 9.167l-.212.077" opacity=".411" transform="translate(0 -.95)"/>
                <path fill="#D4DADF" d="M223.217 140.95H68l11.796 77.256c.711 4.667 3.88 8.584 8.622 8.584h114.38c4.743 0 7.912-3.917 8.624-8.584l11.795-77.257z" opacity=".37" transform="translate(0 -.95)"/>
                <path fill="#00AAAE" d="M119.796 116.063H59.61c-2.655 0-4.826 2.196-4.826 4.88v7.591c0 2.683 2.171 4.88 4.826 4.88h77.348l-17.16-17.351z" opacity=".107" transform="translate(0 -.95)"/>
                <path fill="#D4DADF" d="M100.186 66.321c-1.863-1.863-4.915-1.863-6.777 0l-5.272 5.273c-1.864 1.863-1.864 4.915 0 6.779l55.459 55.468c1.863 1.865 4.914 1.865 6.777 0l5.272-5.273c1.865-1.864 1.865-4.915 0-6.778l-55.46-55.469z" opacity=".37" transform="translate(0 -.95)"/>
                <path fill="#FFF" d="M149.449 121.832c-1.605-1.605-4.207-1.605-5.81 0-1.606 1.605-1.606 4.208 0 5.811 1.603 1.605 4.205 1.605 5.81 0 1.604-1.603 1.604-4.206 0-5.81z" transform="translate(0 -.95)"/>
                <g opacity=".239" transform="translate(0 -.95) translate(155.217 53.915)">
                    <mask id="rmnmiha76d" fill="#fff">
                        <use xlink:href="#4vaxdlsd2c"/>
                    </mask>
                    <path fill="#D4DADF" stroke="#D4DADF" d="M22.978 47.855c-2.315.28-4.807.586-7.012-.382-1.83-.804-3.353-2.493-3.235-4.605.123-2.195 1.712-3.912 3.638-4.77 2.121-.946 4.574-1.05 6.826-.582 1.077.223 2.375.543 3.273 1.216.751.564 1.049 1.568.321 2.274-.534.517-1.324.75-2.021.943-.728.202-1.467.389-2.211.52-3.795.663-8.1.032-11.076-2.59-1.48-1.303-2.504-3.22-2.51-5.224-.007-2.046 1.143-3.91 2.686-5.173 3.09-2.527 7.386-3.246 11.257-3.264 1.912-.01 3.825.16 5.713.461 1.009.161 2.057.315 2.987.76.94.45 1.892 1.39 1.643 2.536-.237 1.083-1.478 1.426-2.4 1.696-1.19.348-2.424.51-3.659.565-2.325.102-4.69-.073-6.997-.361-2.179-.272-4.363-.677-6.464-1.328-1.524-.473-3.04-1.096-4.325-2.063-1.253-.943-2.211-2.216-2.634-3.744-.473-1.71-.342-3.61.297-5.258 1.267-3.272 4.458-5.29 7.609-6.433 4.282-1.552 8.99-2.094 13.52-1.811 2.325.145 4.628.535 6.879 1.133 1.148.306 2.283.668 3.385 1.114.92.372 1.855.794 2.325 1.732.903 1.805-.886 3.516-2.315 4.327-1.567.89-3.4 1.415-5.13 1.878-2.312.617-4.703.853-7.084.98-2.273.12-4.553.202-6.829.165-4.382-.07-8.877-.629-12.842-2.623-3.444-1.732-6.836-5.261-5.974-9.48.407-1.991 1.885-3.716 3.406-4.972C5.603 4.19 7.447 3.265 9.36 2.572 13.307 1.141 17.555.644 21.72.398c4.65-.275 9.296-.053 13.889.752 2.313.405 4.6.95 6.852 1.62.143.042.597-.176.406-.233C37.882 1.053 32.724.188 27.526.03c-4.642-.14-9.416.182-13.968 1.131-4.135.862-8.46 2.4-11.362 5.63C.77 8.379-.196 10.317.034 12.496c.222 2.1 1.326 4.01 2.846 5.434 3.387 3.172 8.356 4.332 12.832 4.727 2.404.213 4.82.216 7.23.14 2.567-.082 5.15-.17 7.692-.568 2.13-.333 4.23-.929 6.25-1.686 1.628-.61 3.354-1.485 4.251-3.057.457-.8.561-1.702.098-2.526-.498-.885-1.372-1.304-2.27-1.67-2.283-.935-4.719-1.554-7.151-1.943-4.945-.79-10.058-.52-14.897.77-3.54.943-7.29 2.538-9.426 5.693-1.999 2.952-2.116 7.255.408 9.938 1.188 1.262 2.775 2.085 4.38 2.677 2 .737 4.115 1.185 6.214 1.513 2.546.399 5.157.617 7.735.586 1.196-.014 2.395-.108 3.57-.348 1.02-.208 2.151-.484 3.045-1.049.705-.445 1.114-1.213.908-2.057-.241-.99-1.147-1.64-2.04-1.999-.974-.391-2.043-.54-3.075-.697-1.016-.154-2.04-.268-3.065-.34-4.094-.285-8.422.087-12.13 1.985-1.803.924-3.452 2.234-4.354 4.097-.936 1.933-.746 4.141.314 5.982 2.106 3.654 6.748 5.005 10.708 4.873 1.411-.047 9.282-.852 7.364-3.868-.58-.91-1.854-1.27-2.824-1.557-1.084-.321-2.202-.51-3.331-.554-2.165-.083-4.477.358-6.317 1.553-1.688 1.096-2.952 2.977-2.762 5.067.188 2.074 1.906 3.599 3.76 4.27 2.209.799 4.629.506 6.905.231.235-.028.428-.3.076-.257" mask="url(#rmnmiha76d)"/>
                </g>
                <g>
                    <text fill="#FFF" font-family="OpenSans-Bold, Open Sans" font-size="24" font-weight="bold" transform="translate(0 -.95) translate(111 160.95)">
                        <tspan x="7.65" y="26">&gt;</tspan>
                    </text>
                    <text fill="#FFF" font-family="OpenSans-Bold, Open Sans" font-size="24" font-weight="bold" transform="translate(0 -.95) translate(111 160.95) matrix(-1 0 0 1 111 0)">
                        <tspan x="48.65" y="26">&gt;</tspan>
                    </text>
                    <path stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M48 33L23 33" transform="translate(0 -.95) translate(111 160.95)"/>
                </g>
                <path fill="#00AAAE" d="M233.51 116.063h-76.467l1.937 1.97c3.698 3.766 3.698 9.902 0 13.667l-1.685 1.713h76.214c2.638 0 4.795-2.195 4.795-4.879v-7.591c0-2.684-2.157-4.88-4.795-4.88z" opacity=".087" transform="translate(0 -.95)"/>
            </g>
          </svg>
          <p
            class="text-darkblue font-bold text-xl md:text-2xl text-center mt-2 mb-4"
          >
            Oops..
            <br />Keranjang kamu kosong
          </p>
          <span class="text-darkblue text-center font-bold mb-8">
            Untuk saat ini kamu belum memiliki
            <br />
            proteksi apapun
          </span>
          <div class="mx-auto max-w-3/4 w-full">
            <BaseButton
              style={"font-size: 14px;height: 44px;"}
              ariaLabel="Cari Proteksi"
              on:click={() => window.location.href = `${appUrl}/isi-data`}
            >CARI PROTEKSI</BaseButton>
          </div>
        </div>
      </div>
    {/if}

    <div
      class="basket-container absolute h-auto top-0 bg-transparent flex items-center"
    >
      <div
        class="basket relative bg-white p-1 rounded-r-md cursor-pointer"
        on:click={handleCartToggleShow}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
          <defs>
              <linearGradient id="prefix__a" x1="8.69%" x2="121.044%" y1="33.854%" y2="83.25%">
                  <stop offset="0%" stop-color="#02B2B2"/>
                  <stop offset="100%" stop-color="#027B7B"/>
              </linearGradient>
              <linearGradient id="prefix__b" x1="52.121%" x2="122.417%" y1="6.622%" y2="153.293%">
                  <stop offset="0%" stop-opacity="0"/>
                  <stop offset="100%" stop-opacity=".5"/>
              </linearGradient>
              <linearGradient id="prefix__c" x1="52.121%" x2="122.417%" y1="11.875%" y2="140.785%">
                  <stop offset="0%" stop-opacity="0"/>
                  <stop offset="100%" stop-opacity=".5"/>
              </linearGradient>
          </defs>
          <g fill="none">
              <g>
                  <path fill="url(#prefix__a)" d="M0.018 0.251L29.668 0.251 24.828 17.101 3.831 17.101z" transform="translate(13 14)"/>
                  <path d="M0.018 0.251L29.668 0.251 24.828 17.101 3.831 17.101z" transform="translate(13 14)"/>
              </g>
              <path fill="#273B7A" stroke="#273B7A" stroke-width=".5" d="M43.692 14.339c-.277-.356-.707-.565-1.165-.566H13.169l-1.234-4.684C11.77 8.45 11.184 8.003 10.51 8H4.473c-.818.005-1.477.655-1.473 1.454 0 .804.66 1.456 1.473 1.456H9.37l1.222 4.64c.007.03.014.059.023.088l4.547 17.273c.168.641.754 1.089 1.426 1.089h21.38c.67 0 1.257-.448 1.426-1.089l4.558-17.317c.115-.436.02-.9-.26-1.258v.003zM36.828 31.09H17.726l-3.792-14.406h26.688L36.828 31.09z"/>
              <g transform="translate(13 35)">
                  <ellipse cx="5" cy="5.626" fill="#000" rx="5" ry="4.889"/>
                  <ellipse cx="5" cy="5.626" fill="#273B7A" rx="5" ry="4.889"/>
                  <ellipse cx="5" cy="5.626" fill="url(#prefix__b)" rx="5" ry="4.889"/>
              </g>
              <g transform="translate(30 35)">
                  <ellipse cx="6.285" cy="5.626" fill="#000" rx="5.333" ry="4.889"/>
                  <ellipse cx="6.285" cy="5.626" fill="#273B7A" rx="5.333" ry="4.889"/>
                  <ellipse cx="6.285" cy="5.626" fill="url(#prefix__c)" rx="5.333" ry="4.889"/>
              </g>
          </g>
        </svg>
        <span
          class="cart-item-qty absolute rounded-full w-5 h-5 bg-red-600 flex items-center justify-center text-white font-bold text-sm text-center shadow-md"
          >{$derivedTotalQuantity}</span
        >
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  #cart {
    position: fixed;
    z-index: 10;
    height: 100%;
    width: 100%;

    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    /* transform: translateX(-100%); */
    transform: translate3d(-100%, 0, 0);
    &.show {
      /* transform: translateX(0%); */
      transform: translate3d(0%, 0, 0);
    }

    @media (min-width: 640px) {
      width: 390px;
    }

    .cart-bg {
      background-image: linear-gradient(to bottom, #06d0d2, #03a3a6);
      scrollbar-width: thin;
      ::-webkit-scrollbar {
        width: 2px;
      }
      .cart-bottom {
        bottom: 0;
        @media (max-width: 639px) {
          bottom: 56px;
        }
        #next-step-buy {
          &:disabled {
            background: #b8bcbf;
            cursor: not-allowed;
          }
        }
      }
    }

    .basket-container {
      display:none;
      @media (min-width: 640px) {
        display: flex;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 16%), 0 2px 4px -1px rgb(0 0 0 / 6%);
      }

      width: 60px;
      right: -60px;
      top: calc(50% - 60px);

      .cart-item-qty {
        top: 4px;
        right: 3px;
        display: inline-block;
        line-height: 1.36;
      }
    }
  }
</style>
