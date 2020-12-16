import {derived, writable} from "svelte/store";

// what fields neet to be update when product or quantity changes
export const cartStore = writable({
    totalProducts: 1,
    products: {
      "ebe649b3-20ac-4f7c-8526-d814c0560e3a": {
        productId: "3534f624-496e-42d5-8471-94da52d05c2a",
        planId: "ebe649b3-20ac-4f7c-8526-d814c0560e3a",
        fetched: false,
        quantity: 1,
        price: 0,
      },
      // "2338cbee-7b35-490a-b0c5-e9f428edc306": {
      //   productId: "3534f624-496e-42d5-8471-94da52d05c2a",
      //   planId: "2338cbee-7b35-490a-b0c5-e9f428edc306",
      //   fetched: false,
      //   quantity: 0
      // },
      "5bce1947-a883-4a6b-8257-f503f5b169d5": {
        productId: "ad0621b9-fa90-496c-bbb1-f6097b0f94f5",
        planId: "5bce1947-a883-4a6b-8257-f503f5b169d5",
        fetched: false,
        quantity: 1,
        price: 0,
      }
    },
});

// transform Object {{  }}  $cartStore.products to [{}]
export const derivedCartProducts = derived(cartStore, $cartStore => {
  return Object.keys($cartStore.products).map((id) => {
    const {productId, planId, quantity, fetched, price} = $cartStore.products[id];
      return {
        productId,
        planId,
        quantity,
        fetched,
        price
      }
    }
  )
});

export const derivedTotalPrice = derived(derivedCartProducts, $derivedCartProducts => {
  return $derivedCartProducts.reduce((accumulator, product) => {
    return accumulator + product.price;
  }, 0)
})

export const sumAssuredTotal = writable(0);
export const paymentTermYearly = writable(false);
export const cartShow = writable(false);

    // insuredFor: "SELF",
    // dobString: "1992-01-09",
    // paymentFrequent: "monthly",
    // sumAssuredTotal: 0,