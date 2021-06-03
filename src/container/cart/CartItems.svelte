<script>
  import { stores } from "@sapper/app";
  import {
    cartStore,
    cartShow,
  } from "../../stores/cart/store";
  import { fetchProductsCart } from "../../stores/cart/actions";
  import { onDestroy } from "svelte";

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

  $: if ($cartShow) {
     fetchProductsCart(productApiUrl)
     .then(plans => {
       if(Object.keys(plans).length) {
         Object.keys(plans).forEach(planId => {
           itemsDetail[planId] = plans[planId];
         });
       }
     })

    if(!cartItem) {
      loadCartItem();
    }
  }

  cartStore.subscribe(cart => {
    let listId = Object.keys(itemsDetail);
    listId.forEach(id => {
      if(!cart.products[id]) {
        let updateItemsDetail = itemsDetail;
        delete updateItemsDetail[id];
        itemsDetail = updateItemsDetail;
      }
    })
  })

  onDestroy(unsubscribe);
</script>

{#each Object.keys($cartStore.products) as planid (planid)}
  {#if cartItem && itemsDetail[planid]}
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
