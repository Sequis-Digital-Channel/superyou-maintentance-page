export async function getPlanById (apiUrl, planId, stringDob) {
  const url = `${apiUrl}/product_plans/${planId}/?dob=${stringDob}`;

  try {
    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch(err) {
    console.log(err);
  }
}