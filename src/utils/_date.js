export function getYearsFromPast(yearsAgo) {
  const currentYear = new Date().getFullYear();
  const pastYear = currentYear - yearsAgo;
  
  const getYearsAgo = new Date(new Date().setFullYear(pastYear));
  return getYearsAgo;
}

export function dobStringToMillis(stringDob) {
  // 09/01/1992
  const dob = stringDob.split("/").reverse().join("-");
  return new Date(dob).getTime()
}

export function calculateAge(birthday, stringDateFormat) { 
  
  if (stringDateFormat === "DD/MM/YYYY") {
    birthday = birthday.split("/").reverse().join("-");
  }
  // birthday is string YYYY-MM-DD
  birthday = new Date(birthday);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}