import { axiosClient } from './axiosClient';

/**
 * Service layer pattern: pages/components call these functions, never
 * axios or fetch directly. This is a placeholder — /public/data/products.json
 * doesn't exist yet (that's the "Connect Local JSON" step). Wiring it here
 * now means every page written after that step already knows the contract:
 * call getProducts(), get back an array, don't think about *how*.
 */
export async function getProducts() {
  const { data } = await axiosClient.get('/data/products.json');
  return data;
}

export async function getProductById(id) {
  const products = await getProducts();
  const product = products.find((p) => String(p.id) === String(id));
  if (!product) throw new Error('Product not found.');
  return product;
}
