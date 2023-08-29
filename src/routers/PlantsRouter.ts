import { Router, Request, Response } from "express";
import { PlantsController } from "../controllers/PlantsControllers";


const plantRouter = Router();
const plantController = new PlantsController();

plantRouter.get('/', (req: Request, res: Response) => {
    plantController.getAllPlants(req, res);
});

export default plantRouter