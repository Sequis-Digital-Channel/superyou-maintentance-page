<script>
  import { stores } from "@sapper/app";
  import {
    cartStore,
    cartShow,
    paymentTermYearly,
  } from "../../stores/cart/store";
  import { calculateSumAssuredTotal } from "../../stores/cart/actions";
  import { formatDobHash } from "../../utils/_date";
  import { onDestroy } from "svelte";
  import { getPlanById } from "../../api/products.service";

  let cartItem;
  let productApiUrl = "";
  const { session } = stores();
  const unsubscribe = session.subscribe((value) => {
    productApiUrl = value.API_PRODUCT_CATALOGUE;
  });

  const logError = (err) => {
    console.error((err && err.stack) || err);
  };

  const loadCartItem = () => {
    import("./CartItem.svelte")
      .then((module) => {
        cartItem = module.default;
      })
      .catch(logError);
  };

  let itemsDetail = {};

  async function fetchProductsCart() {
    let sumAssuredTotal = 0;
    const productsNotYetFetched = Object.keys($cartStore.products).filter(
      (planId) => $cartStore.products[planId].fetched === false
    );

    // stop if all products already fetech
    if (!productsNotYetFetched) return;

    const productsDetails = await Promise.all(
      productsNotYetFetched.map((planId) =>
        getPlanById(productApiUrl, planId, `${$cartStore.insuredDob}`)
      )
    );
    productsDetails.forEach(function (response, index) {
      // itemsDetail = [...itemsDetail, { ...response }];
      itemsDetail[response.id] = response;
      cartStore.update((cart) => {
        cart.products[response.id].fetched = true;
        cart.products[response.id].price =
          cart.products[response.id].quantity * response.monthly_premium;

        if (response.validation_type === "sum_assured") {
          sumAssuredTotal +=
            response.sum_assured * cart.products[response.id].quantity;
        }

        // Update riders price if any plan with choosen riders
        Object.keys(cart.products[response.id].riders).forEach((riderId) => {
          const rider = response.riders.find((rider) => rider.id === riderId);
          cart.products[response.id].riders[rider.id] = {
            id: rider.id,
            price: rider.monthly_premium,
            product_code: rider.product_code
          };
        });
        return cart;
      });
    });

    calculateSumAssuredTotal(sumAssuredTotal);
    loadCartItem();
  }
  $: if ($cartShow) {
    fetchProductsCart();
  }

  onDestroy(unsubscribe);
</script>

{#each Object.keys($cartStore.products) as planid (planid)}
  {#if $cartStore.products[planid].fetched && cartItem}
    <svelte:component this={cartItem} item={itemsDetail[planid]} />
  {:else}
    <div class="cart-item-load bg-white mt-4 p-3" style="height: 85px;">
      <div class="animate-pulse flex">
        <div
          class="h-full bg-gray-300 rounded mr-3"
          style="height:60px; width: 18%;"
        />
        <div class="flex flex-col w-full justify-between">
          <div class="flex justify-between">
            <div class="h-4 w-3/4 bg-gray-300 rounded mr-2" />
            <div class="h-4 bg-gray-300 rounded" style="width: 103px" />
          </div>
          <div class="h-4 w-full bg-gray-300 rounded" />
          <div class="h-4 w-1/4 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  {/if}
{/each}

<style lang="postcss">
  .cart-item-load {
    border-radius: 12px;
  }
</style>
