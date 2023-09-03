import PlantsRouter from './routers/PlantsRouter'
import express  from "express";

import "reflect-metadata"
import AppDataSource from "./data-source";
import userRouter from './routers/UsersRouter';
import favorisRouter from './routers/FavorisRouter';
import plantRouter from './routers/PlantsRouter';


AppDataSource.initialize() // Connexion à la base de données
  .then(async () => { // Si la connexion est réussie
  
    const app = express(); // Création de l'application express
    const cors = require('cors'); // Importation de cors
    
    
    const port = 3000; // Port d'écoute du serveur

      app.use(cors()); // Utilisation de cors
      app.use(express.json()); // Utilisation de express.json()
      app.use('/api/plants', plantRouter); // Utilisation du routeur pour les plantes
      app.use('/api/users', userRouter) // Utilisation du routeur pour les utilisateurs
      app.use('/api/favoris', favorisRouter) // Utilisation du routeur pour les favoris
      

      app.listen(port, () => { // Démarrage du serveur
        console.log(
          `Express server has started on port ${port}. Open http://localhost:${port} to see results`
        );
      });
    })
  .catch((error) => console.log(error)); // Si la connexion échoue