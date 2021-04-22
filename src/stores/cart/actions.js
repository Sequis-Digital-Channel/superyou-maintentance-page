import {cartStore, sumAssuredTotal, paymentTermYearly, derivedTotalQuantity} from "./store";
import { cookieAddAndSubstractQuantity, cookieDeleteCartPlan, cookieAddToCart, cookieAddAndRemoveChoosenRider } from "../../utils/_cartcookie";

let totalSumAssured;
sumAssuredTotal.subscribe(amount => {
  totalSumAssured = amount;
})

let totalQuantity;
derivedTotalQuantity.subscribe(count => {
  totalQuantity = count;
})

let cartData;

export function addToCart({planId, quantity, price, riders, validation_type }, insuredFor, insuredDob, planDetail, productSlug, actionType = "READ") {
  // argument planDetail is object
  // { planId: string, fetched: boolean, quantity: number, price: number, riders: object}
  let updatedCart;
  cartStore.update(($cartStore) => {
    const p_ids = Object.keys($cartStore.products);
    if($cartStore.insuredDob !== insuredDob && p_ids.length) {
      p_ids.forEach(id => {
        $cartStore.products[id].fetched = false;
      })
    }
    updatedCart = $cartStore;
    updatedCart.insuredFor = insuredFor;
    updatedCart.insuredDob = insuredDob;
    if (planId in updatedCart.products) {
      updatedCart.products[planId] = {
        planId: planId,
        quantity: updatedCart.products[planId].quantity + quantity,
        price: updatedCart.products[planId].price + price,
        riders,
        fetched: false,
        validation_type,
        product_slug: productSlug
      }
    } else {
      updatedCart.products[planId] = {
        planId,
        quantity,
        price,
        riders,
        fetched: false,
        validation_type,
        product_slug: productSlug
      }
    }

    return updatedCart;
  });

  if (actionType === "SAVE_TO_COOKIE") {
    setTimeout(() => {
      cookieAddToCart(planDetail, productSlug, insuredFor, insuredDob, riders);
    }, 100);
  }

}

export function addQuantityPlan(planId, sumAssuredPlan, price, validationType) {
  // add +1
    let updatedCart;
    cartStore.update(($cartStore) => {
      updatedCart = $cartStore;
      switch (validationType) {
        case "only_once":
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
    const { quantity, price } = updatedCart.products[planId];
    cookieAddAndSubstractQuantity(planId, quantity, price, totalSumAssured, totalQuantity);
  }, 100)
}

export function substractQuantityPlan(planId, sumAssuredPlan, price, validationType) {
  // substract -1
  if (validationType === "sum_assured") {
    calculateSumAssuredTotal(-sumAssuredPlan);
  }
  let updatedCart
  cartStore.update(($cartStore) => {
    updatedCart = $cartStore;
    updatedCart.products[planId].quantity -= 1;
    updatedCart.products[planId].price = updatedCart.products[planId].quantity * price;
    return updatedCart;
  });

  setTimeout(() => {
    // save to cookie
    const { quantity, price } = updatedCart.products[planId];
    cookieAddAndSubstractQuantity(planId, quantity, price, totalSumAssured, totalQuantity);
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

export function addRemoveUpdateRider(actionType, planId, riderId, riderPrice, riderCode) {
  let updatedCart
  cartStore.update(($cartStore) => {
    updatedCart = $cartStore;
    switch(actionType) {
      case "ADD_RIDER":
        updatedCart.products[planId].riders[riderId] = {
          id: riderId,
          price: riderPrice,
          product_code: riderCode
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
    const riderCodesArr = [];
    if (Object.keys(updatedCart.products[planId].riders).length) {
      Object.keys(updatedCart.products[planId].riders).forEach(id => {
        riderCodesArr.push(updatedCart.products[planId].riders[id].product_code);
      })
    }

    cookieAddAndRemoveChoosenRider(
      planId,
      Object.keys(updatedCart.products[planId].riders),
      riderCodesArr.join("+"));
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

  // save to cookie
  setTimeout(() => {
    cookieDeleteCartPlan(planId, totalSumAssured, totalQuantity)
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