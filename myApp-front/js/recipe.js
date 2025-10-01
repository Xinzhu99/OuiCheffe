const API_URL = "http://localhost:3001";

const paramString = window.location.search;
let idParams = new URLSearchParams(paramString);
console.log(idParams);
let id = idParams.get("id");

const loadRecipe = async (id) => {
  const container = document.querySelector(".textWrapper");

  try {
    const response = await fetch(`${API_URL}/dishes/${id}`);
    const data = await response.json();
    const dish = data[0];
    const ingredientsArr = dish.ingredients_json;

    console.log(ingredientsArr);
    container.innerHTML = "";
    container.innerHTML = `<h2>${dish.dishes}</h2>
        <p>Préparation : ${dish.preparation} min</p>
        <h3>Ingrédients :</h3>
        <ul class="list"></ul>
        <h3>Etapes :</h3>
        <p>${dish.instructions}</p>
        `;
    for (const item of ingredientsArr) {
      document.querySelector(".list").innerHTML += `
            <li>${item.ingredients_name} : ${item.quantity} ${item.ingredients_unit}</li>`;
    }
  } catch (error) {
    console.error("Problème de connexion au serveur", error);
  }
};
loadRecipe(id);

const serviceNb = document.querySelector("#service")

document.querySelector("#add").addEventListener("click",()=>{
    serviceNb.value ++;
    console.log(serviceNb.value)

})