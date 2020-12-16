import {cartStore, sumAssuredTotal} from "./store";

let totalSumAssured;
sumAssuredTotal.subscribe(amount => {
  totalSumAssured = amount;
})
export function addQuantityPlan(planId, sumAssuredPlan, price) {
  // add +1
  if((totalSumAssured + sumAssuredPlan) <= 1500000000 ) {
    calculateSumAssuredTotal(sumAssuredPlan);
    cartStore.update(($cartStore) => {
      let updatedCart = $cartStore;
      updatedCart.products[planId].quantity += 1;
      updatedCart.products[planId].price = updatedCart.products[planId].quantity * price;
      return updatedCart;
    })
  }
}

export function substractQuantityPlan(planId, sumAssuredPlan, price) {
  // add +1
  calculateSumAssuredTotal(-sumAssuredPlan);
  cartStore.update(($cartStore) => {
    let updatedCart = $cartStore;
    updatedCart.products[planId].quantity -= 1;
    updatedCart.products[planId].price = updatedCart.products[planId].quantity * price;
    return updatedCart;
  })
}

export function updateProductPrice(planId, price) {
  console.log('holaaa');
  cartStore.update(($cartStore) => {
    let updatedCart = $cartStore;
    updatedCart.products[planId].price = updatedCart.products[planId].quantity * price;

    return updatedCart;
  })
}

export function calculateSumAssuredTotal(amount) {
  sumAssuredTotal.update((currentAmount) => currentAmount + amount);
}