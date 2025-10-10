const API_URL = "http://localhost:3001";

const paramString = window.location.search;
let idParams = new URLSearchParams(paramString);
let id = idParams.get("id");
const DivServices = document.querySelector("#service");
let ingredientsQtyArr = [];
const services = 2;

const loadRecipe = async (id) => {
  const container = document.querySelector(".textWrapper");
  try {
    const response = await fetch(`${API_URL}/dishes/${id}`);
    const data = await response.json();
    const recipes = data[0];
    const ingredientsArr = recipes.ingredients_json;

    console.log(ingredientsArr);

    container.innerHTML = "";
    container.innerHTML = `
        <h2>${recipes.dishes}</h2>
        <p>Préparation : ${recipes.preparation} min</p>
        <h3>Ingrédients :</h3>
        <ul class="list"></ul>
        <h3>Etapes :</h3>
        <p>${recipes.instructions}</p>
        `;
    for (const item of ingredientsArr) {
      document.querySelector(".list").innerHTML += `
            <li>${item.ingredients_name} : <span class="qty">${item.quantity}</span> ${item.ingredients_unit}</li>`;
      ingredientsQtyArr.push(item.quantity);
    }
    const qtyArrPerService = ingredientsQtyArr.map((x) => x / services);
    console.log(qtyArrPerService);
    //ci-dessous changement d'affciage en fonction de quantité choisie avec les boutons - et +
    const quantities = document.querySelectorAll(".qty");
    const qty = DivServices.textContent;
    console.log(qty);

    document.querySelector(".sub").addEventListener("click", () => {
      if (DivServices.textContent > 1) {
        DivServices.textContent--;
        for (let i = 0; i < quantities.length; i++) {
          quantities[i].textContent =
            qtyArrPerService[i] * DivServices.textContent;
        }
      }
    });
    document.querySelector(".add").addEventListener("click", () => {
      if (DivServices.textContent < 10) {
        DivServices.textContent++;
        for (let i = 0; i < quantities.length; i++) {
          quantities[i].textContent =
            qtyArrPerService[i] * DivServices.textContent;
        }
      }
    });
  } catch (error) {
    console.error("Problème de connexion au serveur", error);
  }
};
loadRecipe(id);
