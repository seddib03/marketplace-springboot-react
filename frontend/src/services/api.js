// src/services/api.js

const productsMock = [
  { id: 1, name: "Produit A", description: "Description produit A", price: 20 },
  { id: 2, name: "Produit B", description: "Description produit B", price: 35 },
  { id: 3, name: "Produit C", description: "Description produit C", price: 15 },
];

export const getProducts = () => {
  // Simule un appel API async
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsMock);
    }, 500);
  });
};

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    if (username === "admin" && password === "admin") {
      resolve({ token: "fake-jwt-token", user: { id: 1, username: "admin" } });
    } else {
      reject("Nom d'utilisateur ou mot de passe incorrect");
    }
  });
};

// Autres fonctions mock pour register, cart, checkout peuvent être ajoutées ici.
