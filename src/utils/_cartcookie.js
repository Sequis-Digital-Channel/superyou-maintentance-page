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

