import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8083/api", // adapte selon ton backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token JWT automatiquement
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs globalement
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Fonctions API

export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    const userData = response.data;
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Échec de la connexion");
  }
};

export const register = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
};

export const addProduct = async (product) => {
  try {
    const response = await API.post("/products", product);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add product");
  }
};

export const placeOrder = async (orderData) => {
  try {
    const response = await API.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    throw new Error("Échec de la commande");
  }
};

export const getOrdersByUser = async (userId) => {
  try {
    const response = await API.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    throw new Error("Échec de la récupération des commandes");
  }
};
export const getProductStatistics = async () => {
  try {
    const response = await API.get("/products/statistics");
    return response.data;
  } catch (error) {
    throw new Error("Impossible de récupérer les statistiques des produits");
  }
};


export const getUsers = async () => {
  try {
    const response = await API.get("/users");
    console.log("Réponse brute /users:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur dans getUsers:", error);
    throw new Error("Échec de récupération des utilisateurs");
  }
};

export const createUser = (userData) => API.post("/users", userData);

export const updateUserRoles = (userId, roles) => API.put(`/users/${userId}/roles`, roles);

export const deleteUser = (userId) => API.delete(`/users/${userId}`);

export default API;
