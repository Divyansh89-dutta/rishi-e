import axios from "./axios";

// Get all products (with optional filters/query)
export const getAllProducts = async (query = "") => {
  const res = await axios.get(`/products${query}`);
  return res.data;
};

// Get a single product by ID or slug
export const getProductById = async (id) => {
  const res = await axios.get(`/products/${id}`);
  return res.data;
};

// Admin: Create product
export const createProduct = async (productData) => {
  const res = await axios.post("/products", productData);
  return res.data;
};

// Admin: Update product
export const updateProduct = async (id, productData) => {
  const res = await axios.put(`/products/${id}`, productData);
  return res.data;
};

// Admin: Delete product
export const deleteProduct = async (id) => {
  const res = await axios.delete(`/products/${id}`);
  return res.data;
};
