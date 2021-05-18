export function getYearsFromPast(yearsAgo) {
  const currentYear = new Date().getFullYear();
  const pastYear = currentYear - yearsAgo;
  
  const getYearsAgo = new Date(new Date().setFullYear(pastYear));
  return getYearsAgo;
}

export function dobStringToMillis(stringDob) {
  // stringDob ex: 1998-06-19
  return new Date(stringDob).getTime();
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

export function formatDobHash(DDMMYYYY) {
  let dob = DDMMYYYY.split("/");
  // return YYYY-MM-DD
  return `${dob[2]}-${dob[1]}-${dob[0]}`;
}