import { Request, Response } from "express";
import { PlantsService } from "../services/PlantsService";

export class PlantsController {

    private plantsService = new PlantsService()

    async getAllPlants(req: Request, res: Response) {
        const allPlants = await this.plantsService.getAll();
        res.send({status: "OK", data: allPlants});
    }

    async getPlantById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const plant = await this.plantsService.getPlantById(id);
        if (!plant) {
            res.status(404).send({status: "FAILED", message: `La plante avec l'id : ${id} n'a pas été trouvé`})
            return;
        };
        res.send({status: "OK", data: plant})
    }
}