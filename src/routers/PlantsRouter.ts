import { Router, Request, Response } from "express";
import { PlantsController } from "../controllers/PlantsControllers";


const plantRouter = Router();
const plantController = new PlantsController();

plantRouter.get('/', (req: Request, res: Response) => {
    plantController.getAllPlants(req, res);
});

plantRouter.get('/:id', (req: Request, res: Response) => {
    plantController.getPlantById(req, res);
});

plantRouter.post('/', (req: Request, res: Response) => {
    plantController.create(req, res)
});

plantRouter.put('/:id', (req: Request, res: Response) => {
    plantController.update(req, res);
})

plantRouter.delete('/:id', (req, res) => {
    plantController.delete(req, res);
})



export default plantRouter
