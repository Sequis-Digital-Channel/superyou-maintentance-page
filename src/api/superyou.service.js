
const requestHeader = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST",
  "Access-Control-Allow-Headers":
  "Content-type,Accept,X-Access-Token,X-Key"
}

export async function getFormEncryption(url, data) {
  console.log(data, 'cookie');
  let parsedData = JSON.parse(data);
  const res = await fetch(`${url}/api/v1/crypting`, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify({ data: parsedData })
  })
  return await res.json()
}