import AppDataSource from "../data-source";
import { Plants } from "../entities/Plants";

export class PlantsService {
    private plantsRepository = AppDataSource.getRepository(Plants);

    getAll() {
        return this.plantsRepository.find();
    };
}