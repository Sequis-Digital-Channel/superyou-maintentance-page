import {cartStore, sumAssuredTotal, paymentTermYearly, derivedLocalStorageData} from "./store";

let totalSumAssured;
sumAssuredTotal.subscribe(amount => {
  totalSumAssured = amount;
})

let cartData;
derivedLocalStorageData.subscribe(data => cartData = data);

export function addToCart({planId, quantity, price, riders }, insuredFor) {
  // argument planDetail is object
  // { planId: string, fetched: boolean, quantity: number, price: number, riders: object}
  cartStore.update(($cartStore) => {
    let updatedCart = $cartStore;
    updatedCart.insuredFor = insuredFor;
    if (planId in updatedCart.products) {
      updatedCart.products[planId] = {
        planId: planId,
        quantity: updatedCart.products[planId].quantity + quantity,
        price: updatedCart.products[planId].price + price,
        riders,
        fetched: false,
      }
    } else {
      updatedCart.products[planId] = { planId, quantity, price, riders, fetched: false }
    }

    return updatedCart;
  })
}

export function addQuantityPlan(planId, sumAssuredPlan, price, validationType) {
  // add +1
  
    cartStore.update(($cartStore) => {
      let updatedCart = $cartStore;
      switch (validationType) {
        case "only_one":
          return updatedCart;
        case "sum_assured":
          if((totalSumAssured + sumAssuredPlan) <= 1500000000 ) {
            calculateSumAssuredTotal(sumAssuredPlan);
          }
          updatedCart.products[planId].quantity += 1;
          updatedCart.products[planId].price = updatedCart.products[planId].quantity * price;
          return updatedCart;
        case "":
          updatedCart.products[planId].quantity += 1;
          updatedCart.products[planId].price = updatedCart.products[planId].quantity * price;
          return updatedCart;
        default:
          return updatedCart
      }
    })
  
  // save to localStorage
  setTimeout(() => {
    setToLocalStorage()
  }, 100)
}

export function substractQuantityPlan(planId, sumAssuredPlan, price, validationType) {
  // substract -1
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
  // function for calculate and update total price if user change the toggle of payment term yearly or monthly
  cartStore.update(($cartStore) => {
    let updatedCart = $cartStore;
    updatedCart.products[planId].price = updatedCart.products[planId].quantity * price;

    return updatedCart;
  })
}

export function calculateSumAssuredTotal(amount) {
  sumAssuredTotal.update((currentAmount) => currentAmount + amount);
}

export function addRemoveUpdateRider(actionType, planId, riderId, riderPrice) {
  cartStore.update(($cartStore) => {
    let updatedCart = $cartStore;
    switch(actionType) {
      case "ADD_RIDER":
        updatedCart.products[planId].riders[riderId] = {
          id: riderId,
          price: riderPrice
        }
        return updatedCart;
      case "REMOVE_RIDER":
        delete updatedCart.products[planId].riders[riderId];
        return updatedCart;
      case "UPDATE_RIDER_PRICE":
        updatedCart.products[planId].riders[riderId].price = riderPrice;
        return updatedCart;
      default:
        return updatedCart;
    }
  })
  // save to localStorage
  setTimeout(() => {
    setToLocalStorage()
  }, 100)
}

export function deleteCartItem(planId, sumAssuredPlan) {
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