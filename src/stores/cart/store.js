import {derived, writable} from "svelte/store";

// what fields neet to be update when product or quantity changes
export const cartStore = writable({
    insuredFor: "",
    insuredDob: "",
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

export const onlyOneValidationProductList = derived(cartStore, $cartStore => {
  let listOnlyOnePlan = [];
  const {products} = $cartStore;
  if($cartStore.products) {
    Object.keys(products).forEach(planId => {
      if (products[planId].validation_type === "only_one") {
        listOnlyOnePlan.push(products[planId].product_slug)
      }
    })
  }
  return listOnlyOnePlan;
});