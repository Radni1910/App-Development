// src/utils/validators.js
export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const isValidPassword = (password) => typeof password === "string" && password.length >= 8;
