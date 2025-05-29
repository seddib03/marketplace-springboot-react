// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8083/api", // change si ton backend est ailleurs
// });

// // Fonction de login
// export const login = async (email, password) => {
//   const response = await API.post("/auth/login", {
//     email,
//     password,
//   });
//   return response.data;
// };
// export const getProducts = async () => {
//   const response = await API.get("/products");
//   return response.data;
// };
// export const addProduct = async (product) => {
//   const response = await API.post("/products", product);
//   return response.data;
// };



// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // adapter si besoin
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

// Fonction login avec axios
export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    // Supposons que la réponse contient { token: "...", user: {...} }
    const userData = response.data;
    // Stocker les infos utilisateur + token dans le localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  } catch (error) {
    // Tu peux améliorer la gestion d’erreur ici
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
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
};
export const getOrdersByUser = async (userId) => {
  const res = await fetch(`/api/orders/user/${userId}`);
  return res.json();
};

export const getUsers = () => API.get("/users");
export const createUser = (userData) => API.post("/users", userData);
export const updateUserRoles = (userId, roles) => API.put(`/users/${userId}/roles`, roles);
export const deleteUser = (userId) => API.delete(`/users/${userId}`);


export default API;
