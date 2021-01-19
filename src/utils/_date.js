export function getYearsFromPast(yearsAgo) {
  const currentYear = new Date().getFullYear();
  const pastYear = currentYear - yearsAgo;
  
  const getYearsAgo = new Date(new Date().setFullYear(pastYear));
  return getYearsAgo;
}