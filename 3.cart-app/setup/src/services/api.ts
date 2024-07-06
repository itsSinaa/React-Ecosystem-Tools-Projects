import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:8000/" });

export const getAllProducts = async () => {
  const res = await client.get("product");

  return res.data;
};

export const getSingleProduct = async (id: number | string) => {
  const res = await client.get(`product/${id}`);

  return res.data;
};
