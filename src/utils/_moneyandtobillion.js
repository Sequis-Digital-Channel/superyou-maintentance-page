export const toBillion = function(value) {
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

export const moneyFormat = function(value) {
  value = "" + value;
  return (
    "Rp " +
    parseFloat(value.replace(/,/g, ""))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}