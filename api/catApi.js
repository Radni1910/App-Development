// src/api/catApi.js
export const fetchCats = async (amount = 10) => {
  try {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${amount}`);
    const data = await response.json();
    return data.map(item => item.url); // return array of image URLs
  } catch (error) {
    throw new Error("Failed to fetch cats");
  }
};
