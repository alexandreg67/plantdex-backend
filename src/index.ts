import PlantsRouter from './routers/PlantsRouter'
import express  from "express";

import "reflect-metadata"
import AppDataSource from "./data-source";
import { UserController } from './controllers/UsersControllers';
import userRouter from './routers/UsersRouter';


AppDataSource.initialize()
  .then(async () => {
  
    const app = express();
    const port = 3000;
    
      app.use(express.json());
      app.use('/plants', PlantsRouter);
      app.use('/users', userRouter)

      app.listen(port, () => {
        console.log(
          `Express server has started on port ${port}. Open http://localhost:${port} to see results`
        );
      });
    })
  .catch((error) => console.log(error));