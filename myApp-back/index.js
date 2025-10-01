import express from "express"; // Framework pour créer un serveur web facilement
import cors from "cors"; // Middleware pour autoriser les appels depuis un autre domaine (le front)
import dotenv from "dotenv"; // Permet de charger les variables d'environnement (.env)
import { Pool } from "pg"; // Permet de se connecter à une base PostgreSQL

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Création d'un "pool" de connexions à PostgreSQL grâce à l'URL donnée par Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // l'URL de connexion est stockée dans le fichier .env
  ssl: { rejectUnauthorized: false }, // obligé pour Neon : sécurise la connexion
});

const app = express(); // Création d'une application Express
const PORT = process.env.PORT || 3001; // Choix du port (priorité à la variable d'environnement)

// Active CORS → permet au front (par ex. sur un autre port) d'appeler ton back
app.use(cors());

// Active le parsing JSON → permet de recevoir des données en JSON dans les requêtes
app.use(express.json());

//🚵 Elle récupère toutes les recettes (description + catégorie associée)
app.get("/dishes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT dishes.description, dish_categories.name, dishes.prep_time, dishes.id from dishes\
            join dish_categories on dish_categories.id = dishes.dish_category_id"
    );
    // Envoie la réponse sous forme de tableau JSON
    res.json(result.rows);
  } catch (error) {
    // Si erreur, log dans la console et envoi d'une erreur 500
    console.error("Erreur lors de la récupération des recettes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
//🚵 route get avec search bar
app.get("/dishes/search/:searchTerm/", async (req, res) => {
  try {
    const input = req.params["searchTerm"];
    const resultat = await pool.query(`
            SELECT dishes.description, dish_categories.name, dishes.prep_time
            from dishes 
            join dish_categories on dish_categories.id = dishes.dish_category_id 
            WHERE LOWER(description) like '%${input}%'`);
    res.json(resultat.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
//🚵 route pour affichier la recette de chaque plat avec ID
app.get("/dishes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await pool.query(
      `SELECT 
  dishes.description AS dishes, 
  dish_categories.name AS category, 
  dishes.prep_time AS preparation,
  dishes.instructions AS instructions,
  json_agg(
    json_build_object(
      'ingredients_name', ingredients.name,
      'quantity', dish_ingredients.quantity,
      'ingredients_unit', ingredients.unit
    )
  ) AS ingredients_json
FROM dishes
JOIN dish_categories ON dish_categories.id = dishes.dish_category_id
JOIN dish_ingredients ON dish_ingredients.dish_id = dishes.id
JOIN ingredients ON dish_ingredients.ingredient_id = ingredients.id
WHERE dishes.id =${id}
GROUP BY dishes.description, dish_categories.name, dishes.prep_time, dishes.instructions;
 `);
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération de la recette:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
// Lancer le serveur et écouter sur le port défini
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

