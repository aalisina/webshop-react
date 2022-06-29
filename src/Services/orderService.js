const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getShippingDetails(userId) {
  const url = `${baseUrl}shippingDetails/${userId}`;
  const response = await fetch(url);
  return response.json();
}

export async function saveShippingDetails(details) {
  const url = `${baseUrl}shippingDetails`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });
  return response.json();
}
