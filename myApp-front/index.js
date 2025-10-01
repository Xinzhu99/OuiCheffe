const API_URL = "http://localhost:3001";

const recipeWrapper = document.querySelector("#recipeWrapper");

const loadDishes = async () => {
  const response = await fetch(`${API_URL}/dishes`);
  const data = await response.json();
  console.log(data);

  recipeWrapper.innerHTML = "";
  for (const item of data) {
    recipeWrapper.innerHTML += `
        <h3>${item.description}</h3> 
        <p> ${item.name}</p>
        <p> ${item.prep_time} min</p>
        <a href="/pages/recipe.html?id=${item.id}" class="recepie">Voir la recette</a>
        <a href="#" class="cooked">Cuisiné</a>`;
  }
};
loadDishes();

const searchRecipes = async (params) => {
  const searchInput = document.querySelector("#searchRecipes");
  const response = await fetch(
    `${API_URL}/dishes/search/${searchInput.value.toLowerCase()}`
  );
  const selectedRecipes = await response.json();
  //console.log(selectedRecipes.length)

  if (selectedRecipes.length === 0) {
    recipeWrapper.innerHTML =
      "Aucun résultat trouvé 😭. Essayez d'autres mots clé.";
    console.log("aucun résult");
  } else {
    recipeWrapper.innerHTML = "";
    for (const item of selectedRecipes) {
      console.log(item);
      recipeWrapper.innerHTML += `
        <h3>${item.description}</h3> 
        <p> ${item.name}</p>
        <p> ${item.prep_time} min</p>
        <a href="/pages/recipe.html?id=${item.id}" class="recepie">Voir la recette</a>
        <a href="#" class="cooked">Cuisiné</a>
        `;
    }
  }
};
//appeler la fonction searchRecipes
document.querySelector("#searchBtn").addEventListener("click", searchRecipes);
