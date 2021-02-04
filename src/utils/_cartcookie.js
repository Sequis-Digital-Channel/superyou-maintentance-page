import { dobStringToMillis, calculateAge } from "../utils/_date";

export function getCookie(cookieName) {
  var name = cookieName + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function saveToCookies(data, h = 4) {
  var hours = h * 60 * 60 * 1000;

  var date = new Date();
  date.setTime(date.getTime() + hours);
  document.cookie =
    "_cart" +
    "=" +
    JSON.stringify(data) +
    "; expires=" +
    date.toGMTString() +
    "; path=/;";
}

export function cookieAddToCart(plan, productSlug, insuredFor, insuredDob) {
  console.log(insuredDob);
  let cartCookie = getCookie("_cart");
  if (cartCookie) {
    cartCookie = JSON.parse(cartCookie);
    if (plan.validation_type === "sum_assured") {
      cartCookie.sumAssuredTotal += plan.sum_assured;
    }
    cartCookie.totalProducts += 1;
    cartCookie.insuredFor = insuredFor;
    const indexOfTargetProduct = cartCookie.products.findIndex(product => product.planId === plan.id)

    if (indexOfTargetProduct !== -1) {
      cartCookie.products[indexOfTargetProduct].qty += 1;
      cartCookie.products[indexOfTargetProduct].price += plan.monthly_premium;
      saveToCookies(cartCookie);
    } else {
      cartCookie.products.push({
        productSlug: productSlug,
        planId: plan.id,
        riders: [],
        monthlyPremi: plan.monthly_premium,
        yearlyPremi: plan.yearly_premium,
        sumAssured: plan.validation_type === "sum_assured" ? plan.sum_assured : 0,
        chosenRider: [],
        qty: 1,
        pdfUrl: "pdf",
        validationType: plan.validation_type,
        product_code: plan.product_code,
        product_slug: productSlug,
        product_plan_code: plan.product_plan_code,
        rider_codes: ""
      });
      cartCookie.newProduct = {
        "productName": plan.product_name,
        "planName": plan.name_text
      }
      saveToCookies(cartCookie);
    }
  } else {
    var selectedPlanData = {
      insuredFor: insuredFor,
      dobTimestamp: dobStringToMillis(insuredDob), // timestamp
      age: calculateAge(insuredDob, "DD/MM/YYYY"), // age
      type: "form",
      path: "general",
      products: [
        {
          productSlug: productSlug,
          planId: plan.id,
          riders: [],
          monthlyPremi: plan.monthly_premium,
          yearlyPremi: plan.yearly_premium,
          sumAssured: plan.validation_type === "sum_assured" ? plan.sum_assured : 0,
          chosenRider: [],
          qty: 1,
          pdfUrl: "pdf",
          validationType: plan.validation_type,
          product_code: plan.product_code,
          product_slug: productSlug,
          product_plan_code: plan.product_plan_code,
          rider_codes: ""
        }
      ],
      "sumAssuredTotal": plan.validation_type === "sum_assured" ? plan.sum_assured : 0,
      "totalProducts": 1,
      "paymentFrequent":"monthly",
      "newProduct":{
        "productName": plan.product_name,
        "planName": plan.name_text
      }
    };
    saveToCookies(selectedPlanData);
  }
}

export function cookieAddAndSubstractQuantity(planId, quantity, price, sumAssuredTotal, totalQuantity) {
  let cartCookie = getCookie("_cart");
  if (cartCookie) {
    cartCookie = JSON.parse(cartCookie);
    const indexOfTargetProduct = cartCookie.products.findIndex(product => product.planId === planId)
    if (indexOfTargetProduct !== -1) {
      cartCookie.products[indexOfTargetProduct].qty = quantity;
      cartCookie.products[indexOfTargetProduct].price = price;
      cartCookie.sumAssuredTotal = sumAssuredTotal;
      cartCookie.totalProducts = totalQuantity;
      saveToCookies(cartCookie);
    }
  }
}

export function cookieAddAndRemoveChoosenRider(planId, chosenRider) {
  let cartCookie = getCookie("_cart");
  if (cartCookie) {
    cartCookie = JSON.parse(cartCookie);
    const indexOfTargetProduct = cartCookie.products.findIndex(product => product.planId === planId)
    if (indexOfTargetProduct !== -1) {
      cartCookie.products[indexOfTargetProduct].chosenRider = chosenRider;
      saveToCookies(cartCookie);
    }
  }
}

export function cookieDeleteCartPlan(planId, sumAssuredTotal, totalQuantity) {
  let cartCookie = getCookie("_cart");
  if (cartCookie) {
    cartCookie = JSON.parse(cartCookie);
    const filteredProductPlans = cartCookie.products.filter(product => product.planId !== planId);

    cartCookie.products = filteredProductPlans;
    cartCookie.sumAssuredTotal = sumAssuredTotal;
    cartCookie.totalProducts = totalQuantity;
    saveToCookies(cartCookie);
  }
}

