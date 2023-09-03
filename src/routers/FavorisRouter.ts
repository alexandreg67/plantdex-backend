import { Router, Request, Response } from "express";
import { FavorisController } from "../controllers/FavorisControllers";


const favorisRouter = Router();
const favorisController = new FavorisController();

favorisRouter.post('/', (req: Request, res: Response) => {
    favorisController.addFavoris(req, res)
});

favorisRouter.get('/:userId', (req: Request, res: Response) => {
    favorisController.getFavoritesForUser(req, res);
});

favorisRouter.delete('/:userId/:plantId', (req: Request, res: Response) => {
    favorisController.deleteFavoris(req, res);
});

export default favorisRouter;