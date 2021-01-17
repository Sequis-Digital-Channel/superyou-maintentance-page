import {derived, writable} from "svelte/store";

// what fields neet to be update when product or quantity changes
export const cartStore = writable({
    insuredFor: "",
    products: {}
});

export const sumAssuredTotal = writable(0);
export const paymentTermYearly = writable(false);
export const cartShow = writable(false);

export const derivedTotalPricePerPlan = derived(cartStore, $cartStore => {
  
  const {products} = $cartStore;
  if(Object.keys(products).length) {
    
    return Object.keys(products).map(planId => {
      let totalPricePerPlan = 0;
      Object.keys(products[planId].riders).forEach(riderId => {
        totalPricePerPlan += products[planId].riders[riderId].price * products[planId].quantity
      })
      totalPricePerPlan += products[planId].price;

      return {
        planId: planId,
        totalPricePerPlan
      }
    })
  }
})

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

export const derivedLocalStorageData = derived([cartStore, paymentTermYearly, sumAssuredTotal], ([$cartStore, $paymentTermYearly, $sumAssuredTotal]) => {
  let expiry = new Date();
  return ({
    ...$cartStore,
    sum_assured: $sumAssuredTotal,
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