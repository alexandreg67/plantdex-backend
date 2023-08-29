import { Router, Request, Response } from "express";
import { PlantsController } from "../controllers/PlantsControllers";


const plantRouter = Router();
const plantController = new PlantsController();

plantRouter.get('/', (req: Request, res: Response) => {
    plantController.getAllPlants(req, res);
});

plantRouter.get('/:id', (req, res) => {
    plantController.getPlantById(req, res);
});

plantRouter.post('/', (req: Request, res: Response) => {
    plantController.create(req, res)
})



export default plantRouter
