const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getShippingAddress(userId) {
  const url = `${baseUrl}shippingAddress/${userId}`;
  const response = await fetch(url);
  return response.json();
}

export async function saveShippingAddress(address) {
  const url = `${baseUrl}shippingAddress`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
  return response.json();
}
