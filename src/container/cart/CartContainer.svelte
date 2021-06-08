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
    derivedTotalSumAssured,
    derivedTotalPricePerPlan,
    cartErrorMessages,
    derivedCartErrorMsgGeneral,
    disabledBtnNextPurchase
  } from "../../stores/cart/store";
  import { addToCart } from "../../stores/cart/actions";
  import { getCookie } from "../../utils/_cartcookie";
  import CartItems from "./CartItems.svelte";
  import BaseSwitch from "../../components/BaseSwitch.svelte";
  import { moneyFormat } from "../../utils/_moneyandtobillion";
  import { stores } from "@sapper/app";

  let superApiUrl;
  let appUrl;
  let validation = {
    sum_assured_passed: false,
    quantity_passed: false
  }
  let isLoading;

  const { session } = stores();
  session.subscribe((value) => {
    superApiUrl = value.SUPER_API_URL;
    appUrl = value.APP_URL;
  });

  let isDOMloaded = false;
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

  derivedTotalSumAssured.subscribe(($totalSumAssured) => {
    if ($totalSumAssured > 1500000000) {
      validationBtn.sum_assured_passed = false;
      cartErrorMessages.update(errors => {
        if(errors.findIndex(err => err.type === 'max_sum_assured') === -1) {
          return [...errors, {
            'type': 'max_sum_assured',
            'msg' : 'Kamu tidak dapat lanjut ke step selanjutnya, uang pertanggungan yang didapat sudah mencapai batas limit 1.5 Milyar. Silakan untuk menghapus / mengurangi jumlah product dari salah satu plan di keranjang',
            'id': null
          }];
        } 
        return errors;
      })
      cartShow.update(() => true);
    } else {
      cartErrorMessages.update(errors => {
        return errors.filter(err => err.type !== 'max_sum_assured');
      })
      validation.sum_assured_passed = true;
    }
  });

  derivedTotalQuantity.subscribe($totalQty => {
    if ($totalQty > 5) {
      validation.quantity_passed = false;
      cartErrorMessages.update(errors => {
        if(errors.findIndex(error => error.type === 'max_quantity') === -1) {
          return [...errors, {
            'type': 'max_quantity',
            'msg' : 'Jumlah maksimal dalam 1x transaksi pembelian adalah 5 buah produk',
            'id': null
          }];
        } 
      })
    } else {
      cartErrorMessages.update(errors => {
        return errors.filter(err => err.type !== 'max_quantity');
      });
      validation.quantity_passed = true;
    }
  });

  $: if (validation.sum_assured_passed && validation.quantity_passed && $cartErrorMessages.length === 0 && !isLoading) {
    disabledBtnNextPurchase.update(() => false);
  } else {
    disabledBtnNextPurchase.update(() => true);
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
              validation_type,
              sum_assured: 0 // initial load
            },
            cartCookie.insuredFor,
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

          {#if $derivedCartErrorMsgGeneral}
            <ul class="text-xs">
              {#each $derivedCartErrorMsgGeneral as cartError, i (`cart-general-err-msg-${i}`) }
                <li class="text-red-600 mb-2">{ cartError.msg }</li>
              {/each}
            </ul>
          {/if}

          <div class="cart-body mt-2">
            <span class="block text-white font-bold"> Informasi Produk </span>
            <hr class="my-3" />
            <CartItems bind:isLoading={isLoading}/>
          </div>
        </div>

        <div class="payment-term pb-32 md:pb-16 my-4 px-3 md:px-4 flex justify-between items-center">
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
            disabled={$disabledBtnNextPurchase}
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
          <img
            src="/icons/cart/empty-cart.svg"
            alt="Empty Cart"
            width="294"
            height="270"
            loading="lazy"
            decoding="async"
          >
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
