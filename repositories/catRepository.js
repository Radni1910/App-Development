export const fetchCats = async (amount = 10) => {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${amount}`);
  const data = await response.json();
  return data.map(item => item.url); // array of cat image URLs
};
