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
  baseURL: "http://localhost:8083/api",
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
      // Gérer la déconnexion si le token est invalide
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export async function login(email, password) {
  // Supprimer tout token existant avant la connexion
  localStorage.removeItem("user");

  const response = await fetch("http://localhost:8083/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Échec de la connexion");
  }

  return response.json();
}

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

export default API;
