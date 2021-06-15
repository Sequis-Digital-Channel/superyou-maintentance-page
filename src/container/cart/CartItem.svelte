<script>
  import { slide } from "svelte/transition";
  import {
    cartStore,
    derivedTotalSumAssured,
    paymentTermYearly,
    derivedTotalPricePerPlan,
    derivedTotalQuantity,
    cartErrorMessages,
    disabledBtnNextPurchase
  } from "../../stores/cart/store";
  import {
    addQuantityPlan,
    substractQuantityPlan,
    updateProductPrice,
    deleteCartItem,
    addRemoveUpdateRider,
  } from "../../stores/cart/actions";
  import BaseInputCheck from "../../components/BaseInputCheck.svelte";
  import { moneyFormat, toBillion } from "../../utils/_moneyandtobillion";
  import { onMount } from "svelte";

  export let item = {};

  let selectedRiders = [];
  let expandRiders = [];
  let isDetailExpanded = false;
  let btnAddQty = false;
  let btnSubstractQty = false;
  let basePrice = 0;
  let term = "Bulan";
  let cartItemRiderErrorMsg = [];
  let cartItemErrorMsg = [];
  
  paymentTermYearly.subscribe((isYearlyPayment) => {
    if (isYearlyPayment) {
      term = "Tahun";
      updateProductPrice(item.id, item.yearly_premium);
      basePrice = item.yearly_premium;
      if (selectedRiders.length) {
        selectedRiders.forEach((riderId) => {
          const currentRider = item.riders.filter(
            (rider) => rider.id === riderId
          );
          addRemoveUpdateRider(
            "UPDATE_RIDER_PRICE",
            item.id,
            riderId,
            currentRider[0].yearly_premium
          );
        });
      }
    } else {
      term = "Bulan";
      updateProductPrice(item.id, item.monthly_premium);
      basePrice = item.monthly_premium;
      if (selectedRiders.length) {
        selectedRiders.forEach((riderId) => {
          const currentRider = item.riders.filter(
            (rider) => rider.id === riderId
          );
          addRemoveUpdateRider(
            "UPDATE_RIDER_PRICE",
            item.id,
            riderId,
            currentRider[0].monthly_premium
          );
        });
      }
    }
  });
  

  function handleClickRider({ target }, planId, riderId, riderPrice, riderCode) {
    if (target.checked) {
      selectedRiders = [...selectedRiders, target.value];
      addRemoveUpdateRider("ADD_RIDER", planId, riderId, riderPrice, riderCode);
    } else {
      selectedRiders = selectedRiders.filter((id) => target.value !== id);
      addRemoveUpdateRider("REMOVE_RIDER", planId, riderId, riderPrice, riderCode);
      cartErrorMessages.update(errors => {
        return errors.filter(err => err.id !== item.id && err.type === 'cart_item_rider');
      });
    }
  }

  function handleToggleExpandRiders(riderId) {
    expandRiders.includes(riderId)
      ? (expandRiders = expandRiders.filter((id) => id !== riderId))
      : (expandRiders = [...expandRiders, riderId]);
  }

  $: basePrice = $paymentTermYearly ? item.yearly_premium : item.monthly_premium;

  $: btnSubstractQty = $cartStore.products[item.id].quantity <= 1;
  $: if (
    $derivedTotalSumAssured + item.sum_assured > 1500000000 ||
    $derivedTotalQuantity >= 5 ||
    item.validation_type === "only_one"
  ) {
    btnAddQty = true;
  } else {
    btnAddQty = false;
  }

  $: itemPrice = $derivedTotalPricePerPlan.filter(
    ({ planId }) => planId === item.id
  )[0].totalPricePerPlan;

  $: isCartItemError = item.validations?.length ? true : false;
  $: if (isCartItemError) {
    cartErrorMessages.update(errors => {
      if(errors.findIndex(err => err.id === item.id) === -1) {
        let errorFields = [];
        item.validations.forEach(errData => {
          errorFields.push({
            "type": 'cart_item',
            "msg": errData.msg,
            'id': item.id
          })
        })
        return [...errors, ...errorFields]
      }

      return errors;
    })
  } else {
    cartErrorMessages.update(errors => {
      return errors.filter(err => err.id !== item.id && (err.type === 'cart_item' || err.type === 'cart_item_rider'));
    });
  }

  $: if (selectedRiders.length && item.riders.length) {
    cartItemRiderErrorMsg = [];
    item.riders.forEach(rider => {
      if (rider.validations && rider.validations.length && selectedRiders.includes(rider.id)) {
        isCartItemError = true;
        cartItemRiderErrorMsg = [...cartItemRiderErrorMsg, ...rider.validations];
      }
    });
    
    if (cartItemRiderErrorMsg.length) {
      let errorFields = [];
      cartErrorMessages.update(errors => {
        if(errors.findIndex(err => err.id === item.id && err.type === 'cart_item_rider') === -1) {
          cartItemRiderErrorMsg.forEach(errData => {
            errorFields.push({
              'type': 'cart_item_rider',
              'msg': errData.msg,
              'id': item.id
            })
          });
          return [...errors, ...errorFields]
        }
  
        return errors;
      })
    }
  }
  
  // cartErrorMessages.subscribe(cartErrorMessages => {
  //   cartItemErrorMsg = cartErrorMessages.filter(error => error.id !== null);
  //   if (cartItemErrorMsg.length) {
  //     disabledBtnNextPurchase.update(() => true);
  //   } else {
  //     disabledBtnNextPurchase.update(() => false);
  //   }
  // })

  onMount(() => {
    selectedRiders = Object.keys($cartStore.products[item.id].riders);
  });
</script>

<div class="cart-item bg-white rounded-xl w-full relative" class:cart-error={isCartItemError}>
  <div class="p-3 cart-item-grid">
    <div class="item-icon pt-1">
      <img src={item.icon_svg} alt={item.productName} width="48" height="48" />
    </div>
    <div class="item-meta flex justify-center">
      <div class="item-meta-wrapper flex flex-col">
        <span class="374:text-xxs text-xs text-darkblue"
          >{item.product_name.replace("Protection", "")}</span
        >
        <p class="text-sm text-darkblue font-bold my-2px">{item.name}</p>
        <span
          on:click={() => {
            isDetailExpanded = !isDetailExpanded;
          }}
          class="374:text-xxs text-xs inline-flex items-center text-darkblue">
          Detail
          <svg
            class="ml-4px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Lihat semua"
            role="img"
            focusable="false"
            style="display: block; fill: none; height: 10px; width: 10px; stroke: #0d294a; stroke-width: 4; overflow: visible;"
            ><g fill="none">
              <path
                d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932"
              />
            </g></svg
          >
        </span>
      </div>
    </div>
    <div class="item-buttons flex items-center justify-center">
      <button
        class="minus text-white text-sm2 bg-teal font-bold flex items-center justify-center mr-2"
        on:click={() =>
          substractQuantityPlan(
            item.id,
            item.sum_assured,
            basePrice,
            item.validation_type
          )}
        disabled={btnSubstractQty}>-</button
      >
      <span class="text-sm text-darkblue font-bold"
        >{$cartStore.products[item.id].quantity}</span
      >
      <button
        class="plus text-white text-sm bg-teal font-bold flex items-center justify-center ml-2"
        on:click={() =>
          addQuantityPlan(
            item.id,
            item.sum_assured,
            basePrice,
            item.validation_type
          )}
        disabled={btnAddQty}>+</button
      >
    </div>
    <div class="item-price flex flex-col items-end">
      <span class="374:text-xxs text-xs text-darkblue">Biaya Premi/{term}</span>
      <p class="text-sm text-darkblue font-bold my-2px">
        {moneyFormat(itemPrice)}
      </p>
    </div>
    <button
      on:click={() => {
        const sumAssured = 
          item.validation_type === "sum_assured"
          ? item.sum_assured * $cartStore.products[item.id].quantity
          : 0;

        deleteCartItem(
          item.id,
          sumAssured
        )
      }}
      class="bg-white w-5 h-5 rounded-full border border-teal flex items-center justify-center absolute"
      style="right:-6px; top: -6px;"
      aria-label="Hapus Keranjang Item">
      <svg
        data-v-7107550c=""
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 24 24"
        ><g
          data-v-7107550c=""
          fill="none"
          fill-rule="evenodd"
          stroke="#0d294a"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4">
          <path
            data-v-7107550c=""
            d="M22.508 1.73L1.611 22.627M1.632 1.87L22.39 22.627"
          />
        </g></svg
      >
    </button>
  </div>

  {#if isDetailExpanded}
    <div class="pb-2" transition:slide|local>
      <div class="cart-item-spec bg-white">
        <div class="item-benefits p-3 border-t border-gray-400">
          <p class="text-darkblue text-sm2 font-bold mb-3">Manfaat per Polis</p>

          {#each item.benefit_group_categories as { benefits, name, id } (id)}
            <div class="benefit-group mb-3">
              <p class="text-darkblue text-sm font-bold mb-3">{name}</p>
              {#each benefits as { benefit, value, id } (id)}
                <div class="item-up flex justify-between items-center mb-2">
                  <p class="text-bluegray text-sm max-w-13/20">{@html benefit}</p>
                  <p class="text-darkblue text-sm font-bold">
                    {toBillion(value)}
                  </p>
                </div>
              {/each}
            </div>
          {/each}
        </div>
        <div class="item-pdf px-3">
          <a
            href={item.rip_link}
            class="text-teal text-xs font-bold"
            target="_blank">
            RINGKASAN PRODUK
            <img
              class="inline-block ml-1"
              src="/icons/cart/pdf-teal.svg"
              alt="Ringkasan Produk PDF"
            />
          </a>
        </div>
      </div>

      {#if item.riders.length}
        <div class="cart-riders mt-4">
          {#each item.riders as rider, i (`rider-${i}`)}
            <div class="rider flex flex-col overflow-hidden">
              <div
                class="rider-check flex justify-between items-center px-3"
                class:selected={selectedRiders.includes(rider.id)}
              >
                <BaseInputCheck
                  id={`rider${i}`}
                  value={rider.id}
                  checked={selectedRiders.includes(rider.id)}
                  on:input={(e) =>
                    handleClickRider(
                      e,
                      item.id,
                      rider.id,
                      $paymentTermYearly
                        ? rider.yearly_premium
                        : rider.monthly_premium,
                      rider.product_code
                    )}
                >
                  <div
                    class="rider-label flex items-center pl-2 py-1 cursor-pointer"
                  >
                    <img
                      class="select-none"
                      src={rider.icon_svg}
                      width="30px"
                      height="30px"
                      alt="Pilih Rider"
                    />
                    <span
                      class="text-darkblue text-sm inline-block ml-2 max-w-3/4"
                      >{rider.product_name.replace("Protection", "")}</span
                    >
                  </div>
                </BaseInputCheck>

                <div
                  on:click={() => handleToggleExpandRiders(item.riders[i].id)}
                  class="rider-price flex items-center justify-end cursor-pointer"
                >
                  <p class="text-darkblue font-bold text-sm">
                    {$paymentTermYearly
                      ? moneyFormat(rider.yearly_premium)
                      : moneyFormat(rider.monthly_premium)}
                  </p>
                  <svg
                    class="ml-2"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Lihat semua"
                    role="img"
                    focusable="false"
                    style="display: block; fill: none; height: 12px; width: 12px; stroke: #0d294a; stroke-width: 4; overflow: visible;"
                    ><g fill="none">
                      <path
                        d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932"
                      />
                    </g></svg
                  >
                </div>
              </div>

              {#if expandRiders.includes(item.riders[i].id)}
                <div
                  class="riders-benefit overflow-hidden bg-white px-3"
                  transition:slide|local={{ duration: 200 }}
                >
                  {#each rider.benefits as benefit, i (`benfit${i}`)}
                    <div class="rider-benefit">
                      <div
                        class="item-up flex justify-between items-center pt-2"
                      >
                        <p class="text-bluegray text-sm max-w-3/4">
                          {@html benefit.benefit}
                        </p>
                        <p class="text-darkblue text-sm font-bold self-start">
                          {toBillion(benefit.value)}
                        </p>
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

{#if $cartErrorMessages.length}
  {#each $cartErrorMessages as error, i (`cart-item-error-${i}`) }
    {#if error.id && error.id === item.id}
      <p class="text-xs text-red-600 mt-1">
        {error.msg}
      </p>
    {/if}
  {/each}
{/if}

<style lang="postcss">
  .cart-item {
    &:not(:first-child) {
      margin-top: 12px;
    }
    &.cart-error {
      @apply border-2 border-red-600
    }
    .cart-item-grid {
      display: grid;
      grid-template-columns:
        minmax(30px, 40px) minmax(95px, 1fr) minmax(60px, 66px)
        minmax(110px, 1fr);
      grid-gap: 0 8px;

      @media (max-width: 374px) {
        grid-template-columns:
          minmax(30px, 40px) minmax(88px, 1fr) minmax(60px, 66px)
          minmax(88px, 1fr);
        grid-gap: 0 6px;
      }

      .item-buttons {
        button {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          &:focus {
            outline: none;
          }
          &:disabled {
            background-color: #d3d3d3;
            cursor: not-allowed;
          }
        }
      }
    }

    .cart-riders {
      .rider {
        .rider-check {
          &.selected {
            background-color: #0d294a;
            .rider-label {
              span {
                color: #fff;
              }
            }

            .rider-price {
              p {
                color: #fff;
              }
              & > svg {
                stroke: #fff !important;
              }
            }
          }
        }

        &:last-child {
          margin-top: 10px;
          .riders-benefit {
            padding-bottom: 8px;
          }
        }
      }
    }

    & > div:last-child {
      overflow: hidden;
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
    }
  }
</style>
