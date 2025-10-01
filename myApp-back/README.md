# Adaptable

Ce repo est un modèle simple et documenté en français pouvant servir de base à la création d'une API.

Il utilise :

-   PostgreSQL pour la base de données (hebergée sur [Neon](https://neon.tech) par exemple)
-   ExpressJS pour le framework backend

## Installation

Pour installer le projet, il suffit de suivre ces quelques étapes :

1. Cloner le repository dans ton terminal :

```
git clone git@github.com:jeremt/adaptable-back.git
```

2. Aller dans le dossier du projet :

```
cd adaptable-back
```

3. Installer les packages npm grâce au `package.json` :

```
npm install # installe automatiquement les packages déjà présents dans package.json
```

4. Copier le .env.example en .env et remplir la variable `DATABASE_URL` à partir de la connectionString (depuis neon par exemple)

![main_large](https://github.com/user-attachments/assets/0151d894-1f9a-485f-a2b5-789680b5a97e)

## Test

Pour tester que le projet fonctionne il faut démarrer le projet avec la commande `node index.js`. Attention si tu veux que le serveur soit mis à jour à chaque changement de ton code, tu peux ajouter l'option `--watch` :

```
node --watch index.js
```

Lorsque le serveur tourne, on peut lancer un autre terminal et utiliser la commande `curl` pour vérifier que les routes de notre serveur fonctionnent.

Pour la route `GET /todos` :

```
curl http://localhost:3000/todos
```

Pour la route `PATCH /todos/:id` (avec l'id 1 et completed = true) :

```
curl -X PATCH http://localhost:3000/todos/1 -H "Content-Type: application/json" -d '{"completed": true}'
```

![GIF Recording 2025-08-22 at 1 32 35 PM](https://github.com/user-attachments/assets/2864fd9c-20ce-42c4-8d4b-abc1a9fb6153)

## Adaptation

Maintenant que tu as une API qui fonctionne et que tu sais comment la tester, c'est à toi de jouer !

-   Ajoute de nouvelles routes API en t'inspirant de `GET /todos` et `PATCH /todos/:id`
-   Ajoute de nouvelles tables et colonnes dans ta base de données et utilise-les dans tes routes
-   Connecte un frond à ton API pour créer un site vrai web
