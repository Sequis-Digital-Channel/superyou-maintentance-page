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

export async function getProductBySlugName(apiUrl, slugName, context) {
  const url = `${apiUrl}/products/slug/${slugName}`;

  try {
    const res = await context.fetch(url);
    const data = res.json();
    return data;
  } catch(err) {
    console.log(err);
  }
}

export async function getProductBySlugNameClient(apiUrl, slugName) {
  const url = `${apiUrl}/products/slug/${slugName}`;

  try {
    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch(err) {
    console.log(err);
  }
}