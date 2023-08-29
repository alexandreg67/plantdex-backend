import PlantsRouter from './routers/PlantsRouter'
import express  from "express";

import "reflect-metadata"
import AppDataSource from "./data-source";


AppDataSource.initialize()
  .then(async () => {
  
    const app = express();
    const port = 3000;
    
      app.use(express.json());
      app.use('/api/', PlantsRouter);

      app.listen(port, () => {
        console.log(
          `Express server has started on port ${port}. Open http://localhost:${port} to see results`
        );
      });
    })
  .catch((error) => console.log(error));