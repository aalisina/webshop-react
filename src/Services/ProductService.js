const url = process.env.REACT_APP_API_BASE_URL;
export async function getProducts(dataType) {
  try {
    const response = await fetch(url + dataType);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(id) {
  const response = await fetch("products/" + id);

  if (response.ok) return response.json();
  throw response;
}
