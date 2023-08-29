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

    async create(req: Request, res: Response) {
        const body = req.body;
        const createdPlant = await this.plantsService.create(body.nom, body.soleil, body.arrosage, body.categorie, body.image);
        res.send({status: "OK", data: createdPlant});
    }

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const body = req.body;
        const updatePlant = await this.plantsService.update(id, body);
        if (!updatePlant) {
            res.status(404).send({status: "FAILED", message: `La plante avec l'id : ${id} n'a pas été trouvé`})
            return;
        };
        res.send({status: "OK", data: updatePlant});
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        const deletedPlant = await this.plantsService.remove(id);
        if (!deletedPlant) {
            res.status(404).send({status: "FAILED", message: `Le livre avec l'id : ${id} n'a pas été trouvé`})
            return;
        };
        res.send({status: "OK", data: deletedPlant});
    }
}