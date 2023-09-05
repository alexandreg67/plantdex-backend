import { Router, Request, Response } from "express";
import { PlantsController } from "../controllers/PlantsControllers";
import checkToken from "../middlewares/CkeckToken";


const plantRouter = Router();
const plantController = new PlantsController();

plantRouter.get('/', (req: Request, res: Response) => {
    plantController.getAllPlants(req, res);
});

plantRouter.get('/:id', (req: Request, res: Response) => {
    plantController.getPlantById(req, res);
});

plantRouter.post('/',checkToken, (req: Request, res: Response) => {
    plantController.create(req, res)
});

plantRouter.put('/:id',checkToken, (req: Request, res: Response) => {
    plantController.update(req, res);
})

plantRouter.delete('/:id',checkToken, (req, res) => {
    plantController.delete(req, res);
})



export default plantRouter
