import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // change si ton backend est ailleurs
});

// Fonction de login
export const login = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export default API;
