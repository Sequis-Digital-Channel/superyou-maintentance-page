import {derived, writable} from "svelte/store";

// what fields neet to be update when product or quantity changes
export const cartStore = writable({
    insured: "",
    // products: {}
    products: {
      "2338cbee-7b35-490a-b0c5-e9f428edc306": {
        productId: "3534f624-496e-42d5-8471-94da52d05c2a",
        planId: "2338cbee-7b35-490a-b0c5-e9f428edc306",
        fetched: false,
        quantity: 1,
        price: 0,
      },
      "5bce1947-a883-4a6b-8257-f503f5b169d5": {
        productId: "ad0621b9-fa90-496c-bbb1-f6097b0f94f5",
        planId: "5bce1947-a883-4a6b-8257-f503f5b169d5",
        fetched: false,
        quantity: 1,
        price: 0,
      }
    },
});

export const sumAssuredTotal = writable(0);
export const paymentTermYearly = writable(false);
export const cartShow = writable(false);

export const derivedTotalPrice = derived(cartStore, $cartStore => {
  const {products} = $cartStore;
  if($cartStore.products) {
    return Object.keys(products).reduce((accumulator, planId) => {
      return accumulator + products[planId].price
    }, 0)
  } else {
    return 0;
  }
});

export const derivedTotalQuantity = derived(cartStore, $cartStore => {
  const {products} = $cartStore;
  if($cartStore.products) {
    return Object.keys(products).reduce((accumulator, planId) => {
      return accumulator + products[planId].quantity;
    }, 0)
  } else {
    return 0;
  }
});

export const derivedLocalStorageData = derived([cartStore, paymentTermYearly], ([$cartStore, $paymentTermYearly]) => {
  let expiry = new Date();
  return ({
    ...$cartStore,
    sum_assured: 0,
    payment_term_yearly: $paymentTermYearly,
    expiry: expiry.setDate(expiry.getDate() + 14)
  })
})

    // insuredFor: "SELF",
    // dobString: "1992-01-09",
    // paymentFrequent: "monthly",
    // sumAssuredTotal: 0,


    // "ebe649b3-20ac-4f7c-8526-d814c0560e3a": {
      //   productId: "3534f624-496e-42d5-8471-94da52d05c2a",
      //   planId: "ebe649b3-20ac-4f7c-8526-d814c0560e3a",
      //   fetched: false,
      //   quantity: 1,
      //   price: 0,
      // },