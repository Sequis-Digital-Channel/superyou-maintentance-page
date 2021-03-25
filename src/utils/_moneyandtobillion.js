export const moneyFormat = function(value) {
  value = "" + value;
  return (
    "Rp " +
    parseFloat(value.replace(/,/g, ""))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}

export const toBillion = function(value) {
  const regExp = /[a-zA-Z]/g;
  if (regExp.test(value)) {
    return value;
  }

  let amountString = String(value);
  if (amountString.length === 6) {
    return `${amountString[0]}${amountString[1]}${amountString[2]} Ribu`;
  } else if (amountString.length === 7) {
    return `${amountString[0]}${amountString[1] === '0' ? '' : ',' + amountString[1]} Juta`
  } else if (amountString.length === 8) {
    return `${amountString[0]}${amountString[1]} Juta`;
  } else if (amountString.length === 9) {
    return `${amountString[0]}${amountString[1]}${amountString[2]} Juta`;
  } else if (amountString.length === 10) {
    return `${amountString[0]}${amountString[1] === '0' ? '' : ',' + amountString[1]} Miliar`
  } else {
    return amountString;
  }
}

export const toBillionFn = function(value) {
  // consider to not use this func since the complexity variations of amount / strings
  let moneyWording = {
    thousand: "Ribu",
    million: "Juta",
    billion: "Miliar"
  }

  var divided = "";
  divided = Math.round(value / 1000);
  if (divided > 0 && divided < 1000) {
    // value = divided;
    value = `${divided} ${moneyWording.thousand}`;
  } else if (divided >= 1000 && divided < 1000000) {
    // value = Math.round(divided / 1000);
    let perThousand = Math.round(divided / 1000);
    value = `${perThousand} ${moneyWording.million}`;
  } else if (divided >= 1000000 && divided < 100000000) {
    // value = Math.round(divided / 1000000);
    let perMio = Math.round(divided / 1000000);
    value = `${perMio} ${moneyWording.billion}`;
  }

  value = "" + value;

  return value;
}