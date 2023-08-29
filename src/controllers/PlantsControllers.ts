import { Request, Response } from "express";
import { PlantsService } from "../services/PlantsService";

export class PlantsController {

    private plantsService = new PlantsService()

    async getAllPlants(req: Request, res: Response) {
        const allPlants = await this.plantsService.getAll();
        res.send({status: "OK", data: allPlants});
    }
}