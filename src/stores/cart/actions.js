import {cartStore, sumAssuredTotal, paymentTermYearly, derivedLocalStorageData} from "./store";

let totalSumAssured;
sumAssuredTotal.subscribe(amount => {
  totalSumAssured = amount;
})

let cartData;
derivedLocalStorageData.subscribe(data => cartData = data);
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
  // save to localStorage
  setTimeout(() => {
    setToLocalStorage()
  }, 100)
}

export function substractQuantityPlan(planId, sumAssuredPlan, price) {
  // add +1
  calculateSumAssuredTotal(-sumAssuredPlan);
  cartStore.update(($cartStore) => {
    let updatedCart = $cartStore;
    updatedCart.products[planId].quantity -= 1;
    updatedCart.products[planId].price = updatedCart.products[planId].quantity * price;
    return updatedCart;
  });

  // save to localStorage
  setTimeout(() => {
    setToLocalStorage()
  }, 100)
}

export function updateProductPrice(planId, price) {
  cartStore.update(($cartStore) => {
    let updatedCart = $cartStore;
    updatedCart.products[planId].price = updatedCart.products[planId].quantity * price;

    return updatedCart;
  })
}

export function calculateSumAssuredTotal(amount) {
  sumAssuredTotal.update((currentAmount) => currentAmount + amount);
}

export function deleteCartItem(planId, sumAssuredPlan) {
  // console.log(planId, sumAssuredPlan);
  cartStore.update($cartStore => {
    let updatedCart = $cartStore;
    delete updatedCart.products[planId];
    return updatedCart;
  })

  setTimeout(() => {
    calculateSumAssuredTotal(-sumAssuredPlan);
  }, 100);

  // save to localStorage
  setTimeout(() => {
    setToLocalStorage()
  }, 100)
}

export function getCartLocalStorage(name) {
  let cartStorage = localStorage.getItem(name);
  if(cartStorage) {
    const {products, payment_term_yearly} = JSON.parse(cartStorage);

    // reset fetch to false for initial load always update product data to API
    const productsPlanIdArr = Object.keys(products);
    if(productsPlanIdArr.length) {
      productsPlanIdArr.forEach(planId => {
        products[planId].fetched = false;
      })
    }
    cartStore.set({products});
    paymentTermYearly.set(payment_term_yearly);
  } 
}

export function setToLocalStorage() {
  if(process.browser) {
    window.localStorage.setItem(
      "cart",
      JSON.stringify(cartData)
    );
  }
}