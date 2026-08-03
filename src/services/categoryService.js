import { axiosClient } from './axiosClient';

export async function getCategories() {
  const { data } = await axiosClient.get('/data/categories.json');
  return data;
}
